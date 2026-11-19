import { ThemeProvider } from 'styled-components';
import { space, fontSize, CoreUITheme } from '../../style/theme';

type Props = {
  theme: CoreUITheme;
  children: React.ReactNode;
};

/**
 * Puts a core-ui theme in reach of everything below it. It wraps
 * styled-components' own provider and adds the styled-system scales — `space`,
 * `fontSizes` and `colors` — that `Box` and the spacing props resolve against,
 * so the bare `ThemeProvider` is not a substitute.
 */
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
