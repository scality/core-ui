import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { coreUIAvailableThemes } from '../../style/theme';
import { CoreUiThemeProvider } from '../coreuithemeprovider/CoreUiThemeProvider';
import { useComputeBackgroundColor } from './InfoMessageUtils';
import { InfoMessage } from './InfoMessage.component';
import { getWrapper } from '../../testUtils';

describe('InfoMessage', () => {
  const selectors = {
    title: () => screen.getByText('Title'),
    content: () => screen.getByText('Content'),
    defaultLinkText: () => screen.getByText('More info'),
    link: () => screen.getByRole('link'),
    linkText: () => screen.getByText('Link text'),
  };
  it('should render', () => {
    const { Wrapper } = getWrapper();
    render(<InfoMessage title="Title" content="Content" />, {
      wrapper: Wrapper,
    });
    expect(selectors.title()).toBeInTheDocument();
    expect(selectors.content()).toBeInTheDocument();
  });
  it('should render with link and default link text', () => {
    const { Wrapper } = getWrapper();
    render(
      <InfoMessage
        title="Title"
        content="Content"
        link="https://www.google.com"
      />,
      {
        wrapper: Wrapper,
      },
    );
    expect(selectors.title()).toBeInTheDocument();
    expect(selectors.content()).toBeInTheDocument();
    expect(selectors.link()).toBeInTheDocument();
    expect(selectors.defaultLinkText()).toBeInTheDocument();
    expect(selectors.link()).toHaveAttribute('href', 'https://www.google.com');
  });
  it('should render with correct link text', () => {
    const { Wrapper } = getWrapper();
    render(
      <InfoMessage
        title="Title"
        content="Content"
        link="https://www.google.com"
        linkText="Link text"
      />,
      {
        wrapper: Wrapper,
      },
    );
    expect(selectors.title()).toBeInTheDocument();
    expect(selectors.content()).toBeInTheDocument();
    expect(selectors.link()).toBeInTheDocument();
    expect(selectors.linkText()).toBeInTheDocument();
    expect(selectors.link()).toHaveAttribute('href', 'https://www.google.com');
  });
});

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
