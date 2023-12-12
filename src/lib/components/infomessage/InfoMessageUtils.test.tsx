import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { coreUIAvailableThemes } from '../../style/theme';
import { CoreUiThemeProvider } from '../coreuithemeprovider/CoreUiThemeProvider';
import { useComputeBackgroundColor } from './InfoMessageUtils';

describe('useComputeBackgroundColor', () => {
  const SUT = jest.fn();
  afterEach(() => {
    SUT.mockClear();
  });
  it('should return backgroundlevel2 by default', () => {
    //S
    const Component = () => {
      const { containerRef, backgroundColor } = useComputeBackgroundColor();
      SUT(backgroundColor);
      return <div ref={containerRef}></div>;
    };
    render(
      <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
        <Component />
      </CoreUiThemeProvider>,
    );
    //V
    expect(SUT).toHaveBeenCalledWith(
      coreUIAvailableThemes.darkRebrand.backgroundLevel2,
    );
  });

  it('should return backgroundlevel3 if parent element backgroundColor is level 2', () => {
    //S
    const Component = () => {
      const { containerRef, backgroundColor } = useComputeBackgroundColor();
      SUT(backgroundColor);
      return (
        <div
          style={{
            backgroundColor: coreUIAvailableThemes.darkRebrand.backgroundLevel2,
          }}
        >
          <div ref={containerRef}></div>
        </div>
      );
    };
    render(
      <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
        <Component />
      </CoreUiThemeProvider>,
    );
    //V
    expect(SUT).toHaveBeenCalledWith(
      coreUIAvailableThemes.darkRebrand.backgroundLevel3,
    );
  });
  it('should return backgroundlevel3 if parent of parent element backgroundColor is level 2', () => {
    //S
    const Component = () => {
      const { containerRef, backgroundColor } = useComputeBackgroundColor();
      SUT(backgroundColor);
      return (
        <div
          style={{
            backgroundColor: coreUIAvailableThemes.darkRebrand.backgroundLevel2,
          }}
        >
          <div>
            <div ref={containerRef}></div>
          </div>
        </div>
      );
    };
    render(
      <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
        <Component />
      </CoreUiThemeProvider>,
    );
    //V
    expect(SUT).toHaveBeenCalledWith(
      coreUIAvailableThemes.darkRebrand.backgroundLevel3,
    );
  });
  it('should return backgroundlevel2 if parent of parent element backgroundColor is level 3', () => {
    //S
    const Component = () => {
      const { containerRef, backgroundColor } = useComputeBackgroundColor();
      SUT(backgroundColor);
      return (
        <div
          style={{
            backgroundColor: coreUIAvailableThemes.darkRebrand.backgroundLevel3,
          }}
        >
          <div>
            <div ref={containerRef}></div>
          </div>
        </div>
      );
    };
    render(
      <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
        <Component />
      </CoreUiThemeProvider>,
    );
    //V
    expect(SUT).toHaveBeenCalledWith(
      coreUIAvailableThemes.darkRebrand.backgroundLevel2,
    );
  });
});
