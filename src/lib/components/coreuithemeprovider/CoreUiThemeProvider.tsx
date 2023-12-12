import React from 'react';
import { ThemeProvider } from 'styled-components';
import { space, fontSize, CoreUITheme } from '../../style/theme';

type Props = {
  theme: CoreUITheme;
  children: React.ReactNode;
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
