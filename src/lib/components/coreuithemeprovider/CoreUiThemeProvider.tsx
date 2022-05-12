import React from 'react';
import { ThemeProvider } from 'styled-components';
import { space, fontSize } from '../../style/theme';

/**
 * We only define the latest version of theme
 */
type Theme = {
  statusHealthy: string;
  statusWarning: string;
  statusCritical: string;
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
  // deprecated colors
  alert: string;
  base: string;
  primary: string;
  primaryDark1: string;
  primaryDark2: string;
  secondary: string;
  secondaryDark1: string;
  secondaryDark2: string;
  success: string;
  healthy: string;
  healthyLight: string;
  warning: string;
  danger: string;
  critical: string;
  background: string;
  backgroundBluer: string;
  borderLight: string;
  info: string;
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
