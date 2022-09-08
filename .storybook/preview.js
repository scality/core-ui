import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CoreUiThemeProvider } from '../src/lib/next';

import { defaultTheme } from '../src/lib/style/theme';

const themes = {
  dark: defaultTheme.dark,
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['dark'],
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
  options: {
    storySort: {
      order: [
        'Style',
        ['Color', 'Icons'],
        'Components',
        [
          'Navigation',
          'Button',
          'Chips',
          'Checkbox',
          'Toggle',
          'Dropdown',
          'Input',
          'Selector',
          'Chart',
          'Progress & loading',
          'Table',
          'Notification',
        ],
        'Guideline',
      ],
    },
  },
};
