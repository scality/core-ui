import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CoreUiThemeProvider } from '../src/lib/next';
import { brand, coreUIAvailableThemes } from '../src/lib/style/theme';
import { Wrapper } from '../stories/common';
import { ToastProvider } from '../src/lib';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'darkRebrand',
    toolbar: {
      title: 'Preview Theme',
      dynamicTitle: true,
      // array of plain string values or MenuItem shape (see below)
      items: [
        { value: 'darkRebrand', title: ' A-Dark', icon: 'moon' },
        { value: 'artescaLight', title: 'A-Light', icon: 'sun' },
        { value: 'ring9dark', title: 'R-Dark', icon: 'moon' },
      ],
    },
  },
  background: {
    name: 'Background Level',
    description: 'Background for the wrapper',
    toolbar: {
      title: 'Background Level',
      items: [
        { value: 'backgroundLevel1', title: 'backgroundLevel 1' },
        { value: 'backgroundLevel2', title: 'backgroundLevel 2' },
        { value: 'backgroundLevel3', title: 'backgroundLevel 3' },
        { value: 'backgroundLevel4', title: 'backgroundLevel 4' },
      ],
      dynamicTitle: true,
    },
  },
};
const withThemeProvider = (Story, context) => {
  const theme = coreUIAvailableThemes[context.globals.theme];
  const { background } = context.globals;
  const { viewMode } = context;
  return (
    <QueryClientProvider client={new QueryClient()}>
      <CoreUiThemeProvider theme={theme}>
        {/* Wrapper to make the stories take the full screen but not in docs */}
        <div
          style={
            viewMode === 'story'
              ? { height: 100 + 'vh', overflow: 'scroll' }
              : null
          }
        >
          <ToastProvider>
            <Wrapper style={{ backgroundColor: background }}>
              <Story {...context} />
            </Wrapper>
          </ToastProvider>
        </div>
      </CoreUiThemeProvider>
    </QueryClientProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  layout: 'fullscreen',
  docs: {
    toc: { headingSelector: 'h2,h3', title: 'Table of Contents' },
  },
  controls: {
    //All props with color in name will automatically have a control 'color'
    //with colors presets to theme colors, possible to have the color name from theme in control
    presetColors: Object.entries(brand).map((color) => {
      return { color: color[1], title: color[0] };
    }),
    matchers: {
      color: /color/i,
    },
    exclude: ['data-cy'],
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        'Style',
        'Guidelines',
        'Templates',
        'Components',
        [
          'Navigation',
          'Data Display',
          'Inputs',
          'Feedback',
          'Progress & loading',
          'Styling',
          'Deprecated',
        ],
      ],
    },
  },
};
