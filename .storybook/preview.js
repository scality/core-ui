import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CoreUiThemeProvider } from '../src/lib/next';

import { defaultTheme } from '../src/lib/style/theme';

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
