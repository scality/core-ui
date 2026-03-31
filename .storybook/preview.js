import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CoreUiThemeProvider } from '../src/lib/next';
import { coreUIAvailableThemes } from '../src/lib/style/theme';
import { Wrapper } from '../stories/common';
import { ToastProvider } from '../src/lib';
import { DocsContainer } from '@storybook/blocks';
import { addons } from '@storybook/preview-api';
import { create } from '@storybook/theming';

const darkStorybookTheme = create({
  base: 'dark',
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',
  brandTitle: 'Core UI',
  brandUrl: './',
  brandImage: './logo-core-ui.png',
  brandTarget: '_self',
});

const lightStorybookTheme = create({
  base: 'light',
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',
  brandTitle: 'Core UI',
  brandUrl: './',
  brandImage: './logo-core-ui.png',
  brandTarget: '_self',
});

const LIGHT_THEMES = new Set(['artescaLight']);

let _currentThemeName = 'darkRebrand';

const ThemedDocsContainer = ({ context, children }) => {
  const [themeName, setThemeName] = React.useState(() => _currentThemeName);

  React.useEffect(() => {
    const channel = addons.getChannel();
    const handler = ({ globals }) => {
      if (globals.theme) setThemeName(globals.theme);
    };
    channel.on('GLOBALS_UPDATED', handler);
    return () => channel.off('GLOBALS_UPDATED', handler);
  }, []);

  const sbTheme = LIGHT_THEMES.has(themeName) ? lightStorybookTheme : darkStorybookTheme;
  return (
    <DocsContainer context={context} theme={sbTheme}>
      {children}
    </DocsContainer>
  );
};

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
        { value: 'G-Dark', title: 'G-Dark', icon: 'moon' },
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
  _currentThemeName = context.globals.theme ?? 'darkRebrand';
  const theme = coreUIAvailableThemes[context.globals.theme];
  const { background } = context.globals;
  const { viewMode } = context;
  return (
    <QueryClientProvider client={new QueryClient()}>
      <CoreUiThemeProvider theme={theme}>
        {/* Wrapper to make the stories take the full screen but not in docs */}
        <div style={viewMode === 'story' ? { height: 100 + 'vh' } : null}>
          <ToastProvider>
            <Wrapper style={{ backgroundColor: background, ...(context.parameters.fullPage ? { padding: 0 } : {}) }}>
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
    container: ThemedDocsContainer,
  },
  controls: {
    //All props with color in name will automatically have a control 'color'
    //with colors presets to theme colors, possible to have the color name from theme in control
    presetColors: Object.entries(coreUIAvailableThemes.darkRebrand).map(
      (color) => {
        return { color: color[1], title: color[0] };
      },
    ),
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
        [
          'Maestro Deployments', ['Guideline', 'Default', 'Stories', '*'],
        ],
        'Components',
        [
          'Navigation',
          'Data Display',
          'Inputs',
          [
            ['Checkbox', ['Guideline', '*']],
            ['Toggle', ['Guideline', '*']],
            ['Radio', ['Guideline', '*']],
            ['Select', ['Guideline', '*']],
          ],
          ['Feedback', [['Modal', ['Guideline', '*']]]],
          'Progress & loading',
          'Styling',
          'Deprecated',
        ],
      ],
    },
  },
};
export const tags = ['autodocs'];
