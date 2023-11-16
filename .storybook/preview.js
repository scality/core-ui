import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CoreUiThemeProvider } from '../src/lib/next';
import { defaultTheme,brand } from '../src/lib/style/theme';

const themes = {
  darkRebrand: defaultTheme.darkRebrand,
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'darkRebrand',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['darkRebrand'],
    },
  },
};

const withThemeProvider = (Story, context) => {
  const theme = themes[context.globals.theme];
  return (
    <QueryClientProvider client={new QueryClient()}>
      <CoreUiThemeProvider theme={theme}>
        <Story {...context} />
      </CoreUiThemeProvider>
    </QueryClientProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  controls:{
    //All props with color in name will automatically have a control 'color'
    //with colors presets to theme colors, possible to have the color name from theme in control
    presetColors: Object.entries(brand).map(color => {return {color: color[1],title:color[0] }}),
    matchers:{
      color: /color/i
    }
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        'Style',
        'Guidelines',
        'Templates',
        'Components',
        
      ],
    },
  },
};
