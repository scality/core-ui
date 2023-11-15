import { defaultTheme } from '../../style/theme';
import React from 'react';
import { useComputeBackgroundColor } from './InfoMessageUtils';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CoreUiThemeProvider } from '../coreuithemeprovider/CoreUiThemeProvider';

describe('useComputeBackgroundColor', () => {
  it('should return backgroundlevel2 by default', () => {
    //S
    const SUT = jest.fn();
    const Component = () => {
      const { containerRef, backgroundColor } = useComputeBackgroundColor();
      SUT(backgroundColor);
      return <div ref={containerRef}></div>;
    };
    render(
      <CoreUiThemeProvider theme={defaultTheme.darkRebrand}>
        <Component />
      </CoreUiThemeProvider>,
    );
    //V
    expect(SUT).toHaveBeenCalledWith(defaultTheme.darkRebrand.backgroundLevel2);
  });

  it('should return backgroundlevel3 if parent element backgroundColor is level 2', () => {
    //S
    const SUT = jest.fn();
    const Component = () => {
      const { containerRef, backgroundColor } = useComputeBackgroundColor();
      SUT(backgroundColor);
      return (
        <div
          style={{ backgroundColor: defaultTheme.darkRebrand.backgroundLevel2 }}
        >
          <div ref={containerRef}></div>
        </div>
      );
    };
    render(
      <CoreUiThemeProvider theme={defaultTheme.darkRebrand}>
        <Component />
      </CoreUiThemeProvider>,
    );
    //V
    expect(SUT).toHaveBeenCalledWith(defaultTheme.darkRebrand.backgroundLevel3);
  });
  it('should return backgroundlevel3 if parent of parent element backgroundColor is level 2', () => {
    //S
    const SUT = jest.fn();
    const Component = () => {
      const { containerRef, backgroundColor } = useComputeBackgroundColor();
      SUT(backgroundColor);
      return (
        <div
          style={{ backgroundColor: defaultTheme.darkRebrand.backgroundLevel2 }}
        >
          <div>
            <div ref={containerRef}></div>
          </div>
        </div>
      );
    };
    render(
      <CoreUiThemeProvider theme={defaultTheme.darkRebrand}>
        <Component />
      </CoreUiThemeProvider>,
    );
    //V
    expect(SUT).toHaveBeenCalledWith(defaultTheme.darkRebrand.backgroundLevel3);
  });
  it('should return backgroundlevel2 if parent of parent element backgroundColor is level 3', () => {
    //S
    const SUT = jest.fn();
    const Component = () => {
      const { containerRef, backgroundColor } = useComputeBackgroundColor();
      SUT(backgroundColor);
      return (
        <div
          style={{ backgroundColor: defaultTheme.darkRebrand.backgroundLevel3 }}
        >
          <div>
            <div ref={containerRef}></div>
          </div>
        </div>
      );
    };
    render(
      <CoreUiThemeProvider theme={defaultTheme.darkRebrand}>
        <Component />
      </CoreUiThemeProvider>,
    );
    //V
    expect(SUT).toHaveBeenCalledWith(defaultTheme.darkRebrand.backgroundLevel2);
  });
});
