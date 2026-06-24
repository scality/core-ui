import { computeVisibleCount } from './navbarResponsivePrototypes';

describe('computeVisibleCount (priority+ overflow fit)', () => {
  const widths = [100, 100, 100, 100]; // 4 tabs, 100px each
  const more = 60;

  it('shows every tab when they all fit without needing the More menu', () => {
    expect(computeVisibleCount(widths, more, 400)).toBe(4);
    expect(computeVisibleCount(widths, more, 1000)).toBe(4);
  });

  it('reserves room for the More trigger once anything overflows', () => {
    // 390 fits all 4 raw (400) but not with More; with overflow the budget is
    // 390 - 60 = 330 → only 3 tabs fit.
    expect(computeVisibleCount(widths, more, 390)).toBe(3);
  });

  it('drops more tabs as the available width shrinks', () => {
    // 3 tabs (300) + More (60) = 360 > 330, so only 2 fit.
    expect(computeVisibleCount(widths, more, 330)).toBe(2);
    // 2 tabs (200) + More (60) = 260 > 250, so only 1 fits.
    expect(computeVisibleCount(widths, more, 250)).toBe(1);
  });

  it('shows no tabs when not even one fits alongside the More menu', () => {
    expect(computeVisibleCount(widths, more, 120)).toBe(0);
  });

  it('returns zero for an empty tab set', () => {
    expect(computeVisibleCount([], more, 500)).toBe(0);
  });

  it('keeps a single tab inline when it fits on its own (no overflow reserve)', () => {
    expect(computeVisibleCount([100], more, 100)).toBe(1);
  });
});
