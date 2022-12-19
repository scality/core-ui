import 'styled-components';
import { defaultTheme } from '../src/lib/style/theme';

type Theme = typeof defaultTheme.darkRebrand;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
