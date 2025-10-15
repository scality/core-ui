import {
  TIME_CONSTANTS,
  calculateSevenDayTicks,
  calculateDayTicks,
  calculateHourTicks,
  getTicks,
  getEdgeMargin,
  calculateLabelVisibility,
  calculateAlertPosition,
  getNavigationAction,
  calculateNavigationIndex,
  getNavigationStateUpdate,
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

  describe('Keyboard Navigation Utils', () => {
    describe('getNavigationAction', () => {
      it('should map arrow keys to navigation actions', () => {
        expect(getNavigationAction('ArrowLeft')).toBe('previous');
        expect(getNavigationAction('ArrowUp')).toBe('previous');
        expect(getNavigationAction('ArrowRight')).toBe('next');
        expect(getNavigationAction('ArrowDown')).toBe('next');
      });

      it('should map Home and End keys', () => {
        expect(getNavigationAction('Home')).toBe('first');
        expect(getNavigationAction('End')).toBe('last');
      });

      it('should map Escape key', () => {
        expect(getNavigationAction('Escape')).toBe('escape');
      });

      it('should return null for unmapped keys', () => {
        expect(getNavigationAction('Enter')).toBe(null);
        expect(getNavigationAction('Space')).toBe(null);
        expect(getNavigationAction('Tab')).toBe(null);
      });
    });

    describe('calculateNavigationIndex', () => {
      const arrayLength = 5;

      it('should handle previous navigation', () => {
        expect(calculateNavigationIndex('previous', 2, arrayLength)).toBe(1);
        expect(calculateNavigationIndex('previous', 0, arrayLength)).toBe(4); // wraps to end
      });

      it('should handle next navigation', () => {
        expect(calculateNavigationIndex('next', 2, arrayLength)).toBe(3);
        expect(calculateNavigationIndex('next', 4, arrayLength)).toBe(0); // wraps to start
      });

      it('should handle first navigation', () => {
        expect(calculateNavigationIndex('first', 3, arrayLength)).toBe(0);
      });

      it('should handle last navigation', () => {
        expect(calculateNavigationIndex('last', 1, arrayLength)).toBe(4);
      });

      it('should handle escape navigation', () => {
        expect(calculateNavigationIndex('escape', 2, arrayLength)).toBe(-1);
      });

      it('should return -1 for empty array', () => {
        expect(calculateNavigationIndex('next', 0, 0)).toBe(-1);
        expect(calculateNavigationIndex('previous', 0, 0)).toBe(-1);
      });

      it('should handle single item array', () => {
        expect(calculateNavigationIndex('next', 0, 1)).toBe(0);
        expect(calculateNavigationIndex('previous', 0, 1)).toBe(0);
        expect(calculateNavigationIndex('first', 0, 1)).toBe(0);
        expect(calculateNavigationIndex('last', 0, 1)).toBe(0);
      });
    });

    describe('getNavigationStateUpdate', () => {
      const mockAlerts = [
        { id: 1, name: 'Alert 1' },
        { id: 2, name: 'Alert 2' },
        { id: 3, name: 'Alert 3' },
      ];

      it('should return correct state for next navigation', () => {
        const result = getNavigationStateUpdate('next', 0, mockAlerts);

        expect(result.newIndex).toBe(1);
        expect(result.selectedAlert).toEqual(mockAlerts[1]);
        expect(result.shouldActivateKeyboard).toBe(true);
      });

      it('should return correct state for previous navigation', () => {
        const result = getNavigationStateUpdate('previous', 2, mockAlerts);

        expect(result.newIndex).toBe(1);
        expect(result.selectedAlert).toEqual(mockAlerts[1]);
        expect(result.shouldActivateKeyboard).toBe(true);
      });

      it('should return correct state for first navigation', () => {
        const result = getNavigationStateUpdate('first', 2, mockAlerts);

        expect(result.newIndex).toBe(0);
        expect(result.selectedAlert).toEqual(mockAlerts[0]);
        expect(result.shouldActivateKeyboard).toBe(true);
      });

      it('should return correct state for last navigation', () => {
        const result = getNavigationStateUpdate('last', 0, mockAlerts);

        expect(result.newIndex).toBe(2);
        expect(result.selectedAlert).toEqual(mockAlerts[2]);
        expect(result.shouldActivateKeyboard).toBe(true);
      });

      it('should return correct state for escape navigation', () => {
        const result = getNavigationStateUpdate('escape', 1, mockAlerts);

        expect(result.newIndex).toBe(-1);
        expect(result.selectedAlert).toBe(null);
        expect(result.shouldActivateKeyboard).toBe(false);
      });

      it('should handle empty array', () => {
        const result = getNavigationStateUpdate('next', 0, []);

        expect(result.newIndex).toBe(-1);
        expect(result.selectedAlert).toBe(null);
        expect(result.shouldActivateKeyboard).toBe(true);
      });

      it('should handle wrapping navigation', () => {
        // Next from last index should wrap to first
        const nextResult = getNavigationStateUpdate('next', 2, mockAlerts);
        expect(nextResult.newIndex).toBe(0);
        expect(nextResult.selectedAlert).toEqual(mockAlerts[0]);

        // Previous from first index should wrap to last
        const prevResult = getNavigationStateUpdate('previous', 0, mockAlerts);
        expect(prevResult.newIndex).toBe(2);
        expect(prevResult.selectedAlert).toEqual(mockAlerts[2]);
      });
    });
  });
});
