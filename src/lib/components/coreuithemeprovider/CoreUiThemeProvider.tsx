import React from 'react';
import { ThemeProvider } from 'styled-components';
import { space, fontSize } from '../../style/theme';

/**
 * We only define the latest version of theme
 */
type Theme = {
  statusHealthy: string;
  statusHealthyRGB: string;
  statusWarning: string;
  statusWarningRGB: string;
  statusCritical: string;
  statusCriticalRGB: string;
  selectedActive: string;
  highlight: string;
  border: string;
  buttonPrimary: string;
  buttonSecondary: string;
  buttonDelete: string;
  infoPrimary: string;
  infoSecondary: string;
  backgroundLevel1: string;
  backgroundLevel2: string;
  backgroundLevel3: string;
  backgroundLevel4: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textReverse: string;
  textLink: string;
};
type Props = {
  theme: Theme;
  children: JSX.Element;
};

const CoreUiThemeProvider = ({ theme, children }: Props) => {
  const newTheme = {
    ...theme,
    space,
    fontSizes: fontSize,
    colors: { ...theme },
  };
  return <ThemeProvider theme={newTheme}>{children}</ThemeProvider>;
};

export { CoreUiThemeProvider };
