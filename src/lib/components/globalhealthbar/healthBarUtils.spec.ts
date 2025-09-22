import {
  TIME_CONSTANTS,
  calculateSevenDayTicks,
  calculateDayTicks,
  calculateHourTicks,
  getTicks,
  getEdgeMargin,
  calculateLabelVisibility,
  calculateAlertPosition,
} from './healthBarUtils';

describe('Health Bar Utils', () => {
  describe('Tick Calculations', () => {
    describe('calculateSevenDayTicks', () => {
      it('should calculate 7 ticks for a week span with proper spacing', () => {
        const endTimestamp = new Date('2023-12-07T12:00:00Z').getTime();
        const ticks = calculateSevenDayTicks(endTimestamp);

        expect(ticks).toHaveLength(7);

        // Check that ticks are spaced by one day
        for (let i = 1; i < ticks.length; i++) {
          expect(ticks[i - 1] - ticks[i]).toBe(TIME_CONSTANTS.ONE_DAY);
        }
      });

      it('should apply margin hours offset', () => {
        const endTimestamp = new Date('2023-12-07T12:00:00Z').getTime();
        const ticks = calculateSevenDayTicks(endTimestamp);

        // First tick should be less than endTimestamp due to margin
        expect(ticks[0]).toBeLessThan(endTimestamp);

        // The difference should account for margin hours
        const expectedMargin =
          TIME_CONSTANTS.MARGIN_HOURS * TIME_CONSTANTS.ONE_HOUR;
        expect(endTimestamp - ticks[0]).toBeGreaterThan(expectedMargin);
      });

      it('should round to nearest half day', () => {
        const endTimestamp = new Date('2023-12-07T15:30:45Z').getTime();
        const ticks = calculateSevenDayTicks(endTimestamp);

        const firstTickDate = new Date(ticks[0]);
        // Should be rounded to either 00:00 or 12:00
        expect([0, 12]).toContain(firstTickDate.getUTCHours());
        expect(firstTickDate.getUTCMinutes()).toBe(0);
        expect(firstTickDate.getUTCSeconds()).toBe(0);
      });
    });

    describe('calculateDayTicks', () => {
      it('should calculate 5 ticks when end timestamp aligns with 6-hour boundary', () => {
        const endTimestamp = new Date('2023-12-07T12:00:00Z').getTime();
        const ticks = calculateDayTicks(endTimestamp);

        expect(ticks).toHaveLength(5);
      });

      it('should calculate 4 ticks when end timestamp does not align with 6-hour boundary', () => {
        const endTimestamp = new Date('2023-12-07T13:30:00Z').getTime();
        const ticks = calculateDayTicks(endTimestamp);

        expect(ticks).toHaveLength(4);
      });

      it('should space ticks by 6 hours', () => {
        const endTimestamp = new Date('2023-12-07T12:00:00Z').getTime();
        const ticks = calculateDayTicks(endTimestamp);

        for (let i = 1; i < ticks.length; i++) {
          expect(ticks[i - 1] - ticks[i]).toBe(TIME_CONSTANTS.SIX_HOURS);
        }
      });

      it('should start from closest 6-hour boundary', () => {
        const endTimestamp = new Date('2023-12-07T14:30:00Z').getTime();
        const ticks = calculateDayTicks(endTimestamp);

        const firstTickDate = new Date(ticks[0]);
        expect(firstTickDate.getUTCHours() % 6).toBe(0);
        expect(firstTickDate.getUTCMinutes()).toBe(0);
        expect(firstTickDate.getUTCSeconds()).toBe(0);
      });
    });

    describe('calculateHourTicks', () => {
      it('should calculate 5 ticks when end timestamp aligns with 15-minute boundary', () => {
        const endTimestamp = new Date('2023-12-07T12:15:00Z').getTime();
        const ticks = calculateHourTicks(endTimestamp);

        expect(ticks).toHaveLength(5);
      });

      it('should calculate 4 ticks when end timestamp does not align with 15-minute boundary', () => {
        const endTimestamp = new Date('2023-12-07T12:17:00Z').getTime();
        const ticks = calculateHourTicks(endTimestamp);

        expect(ticks).toHaveLength(4);
      });

      it('should space ticks by 15 minutes', () => {
        const endTimestamp = new Date('2023-12-07T12:15:00Z').getTime();
        const ticks = calculateHourTicks(endTimestamp);

        for (let i = 1; i < ticks.length; i++) {
          expect(ticks[i - 1] - ticks[i]).toBe(TIME_CONSTANTS.FIFTEEN_MINUTES);
        }
      });

      it('should start from closest 15-minute boundary', () => {
        const endTimestamp = new Date('2023-12-07T12:17:30Z').getTime();
        const ticks = calculateHourTicks(endTimestamp);

        const firstTickDate = new Date(ticks[0]);
        // Test time is 12:17 so the first tick should be 12:15
        expect(firstTickDate.getUTCHours()).toBe(12);
        expect(firstTickDate.getUTCMinutes()).toBe(15);
        expect(firstTickDate.getUTCSeconds()).toBe(0);
      });
    });

    describe('getTicks', () => {
      it('should return seven day ticks for week span', () => {
        const startTimestamp = new Date('2023-12-01T00:00:00Z').getTime();
        const endTimestamp = startTimestamp + 7 * TIME_CONSTANTS.ONE_DAY;

        const ticks = getTicks(startTimestamp, endTimestamp);
        expect(ticks).toHaveLength(7);
      });

      it('should return day ticks for 24-hour span', () => {
        const startTimestamp = new Date('2023-12-07T00:00:00Z').getTime();
        const endTimestamp = startTimestamp + 24 * TIME_CONSTANTS.ONE_HOUR;

        const ticks = getTicks(startTimestamp, endTimestamp);
        expect(ticks.length).toBe(5);
      });

      it('should return hour ticks for 1-hour span', () => {
        const startTimestamp = new Date('2023-12-07T12:00:00Z').getTime();
        const endTimestamp = startTimestamp + TIME_CONSTANTS.ONE_HOUR;

        const ticks = getTicks(startTimestamp, endTimestamp);
        expect(ticks.length).toBe(5);
      });

      it('should return empty array for unsupported time spans', () => {
        const startTimestamp = new Date('2023-12-07T12:00:00Z').getTime();
        const endTimestamp = startTimestamp + 2 * TIME_CONSTANTS.ONE_HOUR;

        const ticks = getTicks(startTimestamp, endTimestamp);
        expect(ticks).toEqual([]);
      });
    });
  });

  describe('Edge Margin Calculations', () => {
    describe('getEdgeMargin', () => {
      it('should return -8 for first tick in day span with 5 total ticks', () => {
        const margin = getEdgeMargin(0, 5, true);
        expect(margin).toBe(-8);
      });

      it('should return 8 for last tick in day span with 5 total ticks', () => {
        const margin = getEdgeMargin(4, 5, true);
        expect(margin).toBe(8);
      });

      it('should return 0 for middle ticks in day span with 5 total ticks', () => {
        const margin = getEdgeMargin(2, 5, true);
        expect(margin).toBe(0);
      });

      it('should return 0 for non-day spans', () => {
        const margin = getEdgeMargin(0, 5, false);
        expect(margin).toBe(0);
      });

      it('should return 0 for day span with non-5 total ticks', () => {
        const margin = getEdgeMargin(0, 4, true);
        expect(margin).toBe(0);
      });
    });
  });

  describe('Label Visibility', () => {
    describe('calculateLabelVisibility', () => {
      it('should return true when chart has enough space per tick', () => {
        const chartWidth = 500;
        const totalTicks = 5;
        const span = TIME_CONSTANTS.ONE_DAY;
        const index = 0;
        const endTimestamp = Date.now();

        const visible = calculateLabelVisibility(
          chartWidth,
          totalTicks,
          span,
          index,
          endTimestamp,
        );

        expect(visible).toBe(true);
      });

      it('should apply week span rules when space is limited', () => {
        const chartWidth = 200;
        const totalTicks = 7;
        const span = TIME_CONSTANTS.ONE_WEEK;
        const endTimestamp = Date.now();

        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            0,
            endTimestamp,
          ),
        ).toBe(true);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            1,
            endTimestamp,
          ),
        ).toBe(false);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            2,
            endTimestamp,
          ),
        ).toBe(true);
      });

      it('should apply day span rules when space is limited', () => {
        const chartWidth = 200;
        const totalTicks = 4;
        const span = TIME_CONSTANTS.ONE_DAY;
        const endTimestamp = new Date('2023-12-07T12:10:00Z').getTime();

        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            0,
            endTimestamp,
          ),
        ).toBe(true);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            1,
            endTimestamp,
          ),
        ).toBe(false);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            2,
            endTimestamp,
          ),
        ).toBe(false);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            3,
            endTimestamp,
          ),
        ).toBe(true);
      });

      it('should handle special cases for day span with hour-aligned end timestamp', () => {
        const chartWidth = 200;
        const totalTicks = 5;
        const span = TIME_CONSTANTS.ONE_DAY;
        const endTimestamp = new Date('2023-12-07T12:00:00Z').getTime();

        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            0,
            endTimestamp,
          ),
        ).toBe(true);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            2,
            endTimestamp,
          ),
        ).toBe(true);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            4,
            endTimestamp,
          ),
        ).toBe(true);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            3,
            endTimestamp,
          ),
        ).toBe(false);
      });
      it('should apply day span rules when space is limited for non-round hour', () => {
        const chartWidth = 200;
        const totalTicks = 4;
        const span = TIME_CONSTANTS.ONE_DAY;
        const endTimestamp = new Date('2023-12-07T12:10:00Z').getTime();

        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            0,
            endTimestamp,
          ),
        ).toBe(true);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            1,
            endTimestamp,
          ),
        ).toBe(false);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            2,
            endTimestamp,
          ),
        ).toBe(false);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            3,
            endTimestamp,
          ),
        ).toBe(true);
      });

      it('should handle special cases for hour span with 15-minute aligned end timestamp', () => {
        const chartWidth = 200;
        const totalTicks = 5;
        const span = TIME_CONSTANTS.ONE_HOUR;
        const endTimestamp = new Date('2023-12-07T12:15:00Z').getTime();

        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            0,
            endTimestamp,
          ),
        ).toBe(true);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            2,
            endTimestamp,
          ),
        ).toBe(true);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            4,
            endTimestamp,
          ),
        ).toBe(true);
        expect(
          calculateLabelVisibility(
            chartWidth,
            totalTicks,
            span,
            3,
            endTimestamp,
          ),
        ).toBe(false);
      });

      it('should return false for unsupported time spans when space is limited', () => {
        const chartWidth = 200;
        const totalTicks = 5;
        const span = 123456;
        const index = 0;
        const endTimestamp = Date.now();

        const visible = calculateLabelVisibility(
          chartWidth,
          totalTicks,
          span,
          index,
          endTimestamp,
        );

        expect(visible).toBe(false);
      });
    });
  });

  describe('Alert Position Calculations', () => {
    describe('calculateAlertPosition', () => {
      it('should calculate position for alert within time range', () => {
        const alertStartTimestamp = 2000;
        const alertEndTimestamp = 3000;
        const chartStartTimestamp = 1000;
        const chartEndTimestamp = 5000;
        const availableWidth = 200;
        const baseX = 50;

        const result = calculateAlertPosition(
          alertStartTimestamp,
          alertEndTimestamp,
          chartStartTimestamp,
          chartEndTimestamp,
          availableWidth,
          baseX,
        );

        const expectedRelativeSize = (3000 - 2000) / (5000 - 1000);
        const expectedWidth = expectedRelativeSize * 200;
        const expectedStartX = 50 + ((2000 - 1000) / (5000 - 1000)) * 200;

        expect(result.width).toBe(expectedWidth);
        expect(result.startX).toBe(expectedStartX);
        expect(result.relativeSize).toBe(expectedRelativeSize);
      });

      it('should handle alert starting before time range', () => {
        const alertStartTimestamp = 1000;
        const alertEndTimestamp = 3000;
        const chartStartTimestamp = 2000;
        const chartEndTimestamp = 5000;
        const availableWidth = 200;
        const baseX = 50;

        const result = calculateAlertPosition(
          alertStartTimestamp,
          alertEndTimestamp,
          chartStartTimestamp,
          chartEndTimestamp,
          availableWidth,
          baseX,
        );

        const expectedRelativeSize = (3000 - 2000) / (5000 - 2000);
        const expectedWidth = expectedRelativeSize * 200;
        const expectedStartX = 50; // baseX since alert starts before chart range

        expect(result.width).toBe(expectedWidth);
        expect(result.startX).toBe(expectedStartX);
        expect(result.relativeSize).toBe(expectedRelativeSize);
      });

      it('should handle alert ending after time range', () => {
        const alertStartTimestamp = 2500;
        const alertEndTimestamp = 6000;
        const chartStartTimestamp = 1000;
        const chartEndTimestamp = 4000;
        const availableWidth = 200;
        const baseX = 50;

        const result = calculateAlertPosition(
          alertStartTimestamp,
          alertEndTimestamp,
          chartStartTimestamp,
          chartEndTimestamp,
          availableWidth,
          baseX,
        );

        const expectedRelativeSize = (4000 - 2500) / (4000 - 1000);
        const expectedWidth = expectedRelativeSize * 200;
        const expectedStartX = 50 + ((2500 - 1000) / (4000 - 1000)) * 200;

        expect(result.width).toBe(expectedWidth);
        expect(result.startX).toBe(expectedStartX);
        expect(result.relativeSize).toBe(expectedRelativeSize);
      });

      it('should handle alert spanning entire time range', () => {
        const alertStartTimestamp = 1000;
        const alertEndTimestamp = 5000;
        const chartStartTimestamp = 2000;
        const chartEndTimestamp = 4000;
        const availableWidth = 200;
        const baseX = 50;

        const result = calculateAlertPosition(
          alertStartTimestamp,
          alertEndTimestamp,
          chartStartTimestamp,
          chartEndTimestamp,
          availableWidth,
          baseX,
        );

        const expectedStartX = 50; // baseX since alert starts before chart range

        expect(result.width).toBe(200);
        expect(result.startX).toBe(expectedStartX);
        expect(result.relativeSize).toBe(1);
      });

      it('should work with default baseX of 0', () => {
        const alertStartTimestamp = 2000;
        const alertEndTimestamp = 3000;
        const chartStartTimestamp = 1000;
        const chartEndTimestamp = 5000;
        const availableWidth = 200;

        const result = calculateAlertPosition(
          alertStartTimestamp,
          alertEndTimestamp,
          chartStartTimestamp,
          chartEndTimestamp,
          availableWidth,
        );

        const expectedRelativeSize = (3000 - 2000) / (5000 - 1000);
        const expectedWidth = expectedRelativeSize * 200;
        const expectedStartX = 0 + ((2000 - 1000) / (5000 - 1000)) * 200;

        expect(result.width).toBe(expectedWidth);
        expect(result.startX).toBe(expectedStartX);
        expect(result.relativeSize).toBe(expectedRelativeSize);
      });
    });
  });
});
