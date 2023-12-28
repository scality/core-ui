import { create } from '@storybook/theming';
import { coreUIAvailableThemes } from '../src/lib/style/theme';
const theme = coreUIAvailableThemes.darkRebrand;

export default create({
  base: 'light',
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Core UI',
  brandUrl: 'https://github.com/scality/core-ui',
  brandImage: '/scality-logo-without-text.png',
  brandTarget: '_blank',

  //   //
  //   colorPrimary: theme.backgroundLevel2, // folder color
  //   colorSecondary: theme.selectedActive, // secondary text color in docs, selected item and component icon color in sidebar / building progress bar

  //   // UI
  //   appBg: theme.backgroundLevel1, //sidebar bg color
  //   appContentBg: theme.backgroundLevel2, // docs bg color; story bg color can be changed in preview-head.html body tag
  //   appBorderColor: theme.border,
  //   appPreviewBg: theme.backgroundLevel2,
  //   appBorderRadius: 0,

  //   // Text colors
  //   textColor: theme.textPrimary,
  //   textInverseColor: theme.textReverse,

  //   // Toolbar default and active colors
  //   barTextColor: theme.textSecondary,
  //   barSelectedColor: theme.selectedActive,
  //   barBg: theme.backgroundLevel1,

  //   // Form colors
  //   inputBg: theme.backgroundLevel3,
  //   inputBorder: theme.border,
  //   inputTextColor: theme.textPrimary,
  //   inputBorderRadius: 4,
});
