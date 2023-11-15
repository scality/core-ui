import { defaultTheme } from '../../style/theme';
import React from 'react';
import {
  getBackgroundColor,
  useComputeBackgroundColor,
} from './InfoMessageUtils';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { hex2RGB } from '../../utils';
import { ThemeProvider, useTheme } from 'styled-components';
import { CoreUiThemeProvider } from '../coreuithemeprovider/CoreUiThemeProvider';

describe('useComputeBackgroundColor', () => {
  it('should return backgroundlevel2 by default', () => {
    //S
    const SUT = jest.fn();
    const Component = () => {
      const { containerRef, backgroundColor } = useComputeBackgroundColor();
      SUT(backgroundColor);
      return <div ref={containerRef}>{backgroundColor}</div>;
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
          <div ref={containerRef}>{backgroundColor}</div>
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
            <div ref={containerRef}>{backgroundColor}</div>
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
            <div ref={containerRef}>{backgroundColor}</div>
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

test('when no background in parent element, return backgroundlevel2', () => {
  //S
  const divElement = document.createElement('div');
  //E
  const computedBackgroundColor = getBackgroundColor(
    divElement,
    defaultTheme.darkRebrand,
  );
  //V
  expect(computedBackgroundColor).toBe(
    defaultTheme.darkRebrand.backgroundLevel2,
  );
});

test('when background in parent element is backgroundLevel2 return backgroundlevel3', () => {
  //S
  const containerElement = document.createElement('body');
  const divElement = document.createElement('div');
  containerElement.appendChild(divElement);
  window.getComputedStyle = jest.fn().mockImplementation(() => ({
    ['background-color']: 'rgb(50, 50, 69)',
  }));
  //E
  const computedBackgroundColor = getBackgroundColor(
    divElement,
    defaultTheme.darkRebrand,
  );
  //V
  expect(computedBackgroundColor).toBe(
    defaultTheme.darkRebrand.backgroundLevel3,
  );
});

test('when background in grand-parent element is backgroundLevel2 return backgroundlevel3', () => {
  //S
  const containerElement = document.createElement('body');
  const intermediateElement = document.createElement('div');
  containerElement.appendChild(intermediateElement);
  const divElement = document.createElement('div');
  intermediateElement.appendChild(divElement);
  window.getComputedStyle = jest
    .fn()
    .mockImplementation((element: HTMLElement) => {
      if (element.tagName === 'BODY')
        return {
          ['background-color']: 'rgb(50, 50, 69)',
        };
      return {};
    });
  //E
  const computedBackgroundColor = getBackgroundColor(
    divElement,
    defaultTheme.darkRebrand,
  );
  //V
  expect(computedBackgroundColor).toBe(
    defaultTheme.darkRebrand.backgroundLevel3,
  );
});

test('when background in grand-parent element is backgroundLevel3 return backgroundlevel2', () => {
  //S
  const containerElement = document.createElement('body');
  const intermediateElement = document.createElement('div');
  containerElement.appendChild(intermediateElement);
  const divElement = document.createElement('div');
  intermediateElement.appendChild(divElement);
  window.getComputedStyle = jest
    .fn()
    .mockImplementation((element: HTMLElement) => {
      if (element.tagName === 'BODY')
        return {
          ['background-color']: 'rgb(35, 35, 49)',
        };
      return {};
    });
  //E
  const computedBackgroundColor = getBackgroundColor(
    divElement,
    defaultTheme.darkRebrand,
  );
  //V
  expect(computedBackgroundColor).toBe(
    defaultTheme.darkRebrand.backgroundLevel2,
  );
});

/**
 * Test to do :
 * Return the correct background if a parent element as a background
 * Return default background if no parent element as a backgorund
 */
