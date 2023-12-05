import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CoreUiThemeProvider } from '../src/lib/next';
import { brand, coreUIAvailableThemes} from '../src/lib/style/theme';


export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'darkRebrand',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: Object.keys(coreUIAvailableThemes),
    },
  },
};

const withThemeProvider = (Story, context) => {
  const theme = coreUIAvailableThemes[context.globals.theme];
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
  docs:{
      toc : {headingSelector: 'h2,h3',
      title: "Table of Contents"},
  },
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
