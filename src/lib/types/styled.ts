import 'styled-components';
import { CoreUITheme } from '../style/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends CoreUITheme {}
}
