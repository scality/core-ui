import { lighten, darken } from 'polished';
//== Colors
export const hotPink = '#E40046';
export const pink = '#EB4962';
export const lightPink = '#F5B5BA';
export const plum = '#8A1B61';
export const jade = '#006F62';
export const lightBeige = '#FAF7F5';
export const warmRed = '#EF3340';
export const turquoise = '#00B2A9';
export const yellowOrange = '#F1B434';
export const mediumOrange = '#FF8F1C';
export const yellow = '#EFC93D';
export const green = '#228F67';
export const white = '#ffffff';
export const black = '#000000';
export const blackLight = '#313B44';
export const blueDarkest = '#0F3554';
export const blueDarker = '#144A75';
export const blueDark = '#1F73B7';
export const blue = '#337FBD';
export const blueLight = '#5293C7';
export const blueLighter = '#ADCCE4';
export const blueLightest = '#CEE2F2';
export const grayDarkest = '#2F3941';
export const grayDarker = '#49545C';
export const grayDark = '#68737D';
export const gray = '#87929D';
export const grayLight = '#C2C8CC';
export const grayLighter = '#D8DCDE';
export const grayLightest = '#E9EBED';

export type CoreUITheme = {
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
  navbarBackground: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textReverse: string;
  textLink: string;
};

export const coreUIAvailableThemesNames = [
  'darkRebrand',
  'artescaLight',
  'ring9dark',
  'G-Dark',
] as const;
export type CoreUIThemeName = (typeof coreUIAvailableThemesNames)[number];

export const coreUIAvailableThemes: Record<CoreUIThemeName, CoreUITheme> = {
  darkRebrand: {
    statusHealthy: '#0AADA6',
    statusHealthyRGB: '10,173,166',
    statusWarning: '#F8F32B',
    statusWarningRGB: '248,243,43',
    statusCritical: '#E84855',
    statusCriticalRGB: '232,72,85',
    selectedActive: '#037AFF',
    highlight: '#1A3C75',
    border: '#4A4A4A',
    buttonPrimary: '#2F4185',
    buttonSecondary: '#595A78',
    buttonDelete: '#3D0808',
    infoPrimary: '#8E8EAC',
    infoSecondary: '#333366',
    backgroundLevel1: '#121219',
    backgroundLevel2: '#323245',
    backgroundLevel3: '#232331',
    backgroundLevel4: '#1B1B27',
    navbarBackground: '#121219',
    textPrimary: '#EAEAEA',
    textSecondary: '#B5B5B5',
    textTertiary: '#DFDFDF',
    textReverse: '#000000',
    textLink: '#71AEFF',
  },
  artescaLight: {
    statusHealthy: '#009E93',
    statusHealthyRGB: '0, 158, 147',
    statusWarning: '#E77B00',
    statusWarningRGB: '231, 123, 0',
    statusCritical: '#C10004',
    statusCriticalRGB: '193, 0, 4',
    selectedActive: '#63A9D4',
    highlight: '#E3F2FD',
    border: '#A9A9A9',
    buttonPrimary: '#ABB4F5',
    buttonSecondary: '#B8BCCD',
    buttonDelete: '#FFCDD2',
    infoPrimary: '#5C486D',
    infoSecondary: '#E2D0E2',
    backgroundLevel1: '#FCFCFC',
    backgroundLevel2: '#F0F0F4',
    backgroundLevel3: '#E4E6EC',
    backgroundLevel4: '#FAFAF6',
    navbarBackground: '#FCFCFC',
    textPrimary: '#0D0D0D',
    textSecondary: '#4F506D',
    textTertiary: '#DFDFDF', // TO CHECK
    textReverse: '#EAEAEA',
    textLink: '#1349C5',
  },
  ring9dark: {
    statusHealthy: '#2BAB51',
    statusHealthyRGB: '43,171,81',
    statusWarning: '#FC8A32',
    statusWarningRGB: '252,138,50',
    statusCritical: '#E84855',
    statusCriticalRGB: '232,72,85',
    selectedActive: '#2196F3',
    highlight: '#1A3C75',
    border: '#313131',
    buttonPrimary: '#2E67AB',
    buttonSecondary: '#434343',
    buttonDelete: '#3D0808',
    infoPrimary: '#76828F',
    infoSecondary: '#2C3238',
    backgroundLevel1: '#120F0F',
    backgroundLevel2: '#272020',
    backgroundLevel3: '#201B1A',
    backgroundLevel4: '#191515',
    navbarBackground: '#120F0F',
    textPrimary: '#EAEAEA',
    textSecondary: '#A4ACB4',
    textTertiary: '#DFDFDF',
    textReverse: '#000000',
    textLink: '#71AEFF',
  },
  'G-Dark': {
    statusHealthy: '#0AADA6',
    statusHealthyRGB: '10,173,166',
    statusWarning: '#F8F32B',
    statusWarningRGB: '248,243,43',
    statusCritical: '#E84855',
    statusCriticalRGB: '232,72,85',
    selectedActive: '#037AFF',
    highlight: '#1A3C75',
    border: '#4A4A4A',
    buttonPrimary: 'linear-gradient(130deg, #9355E7 0%, #2E4AA3 60%)',
    buttonSecondary: 'linear-gradient(130deg, #595A78 0%, #44455F 100%)',
    buttonDelete: '#3D0808',
    infoPrimary: '#8E8EAC',
    infoSecondary: '#333366',
    backgroundLevel1: '#121219',
    backgroundLevel2: '#323245',
    backgroundLevel3: '#232331',
    backgroundLevel4: '#1B1B27',
    navbarBackground: '#121219',
    textPrimary: '#EAEAEA',
    textSecondary: '#B5B5B5',
    textTertiary: '#DFDFDF',
    textReverse: '#000000',
    textLink: '#71AEFF',
  },
};

/**
 * @deprecated
 *
 * Please use coreUIAvailableThemes instead, the label is more explicit.
 *
 * import { coreUIAvailableThemes } from '@scality/core-ui/dist/style/theme';
 */
export const defaultTheme = coreUIAvailableThemes;

/**
 * @deprecated
 * Instead should use useTheme()
 * import { useTheme } from 'styled-components';
 * const theme = useTheme();
 * e.g: color={theme.statusHealthy}
 *
 */

export const brand = coreUIAvailableThemes.darkRebrand;

export type ThemeColors = keyof CoreUITheme;

// LineChart colors
export const lineColor1 = '#A14FBF';
export const lineColor2 = '#BE9A40';
export const lineColor3 = '#4BE4E2';
export const lineColor4 = '#245A83';
export const lineColor5 = '#E3FF73';
export const lineColor6 = '#BE2543';
export const lineColor7 = '#FD8144';
export const lineColor8 = '#F6B187';

export type ChartColors = keyof typeof chartColors;

export const chartColors = {
  lineColor1,
  lineColor2,
  lineColor3,
  lineColor4,
  lineColor5,
  lineColor6,
  lineColor7,
  lineColor8,
};

export const fontSize = {
  smaller: '0.71rem',
  small: '0.85rem',
  base: '1rem',
  large: '1.14rem',
  larger: '1.43rem',
  huge: '1.57rem',
  // no use case for the moment
  massive: '1.71rem', // no use case for the moment
};

/**
 * @deprecated
 *
 * use import { spacing } from '@scality/core-ui/dist/spacing';
 */
export const space = [
  '0',
  '0.071rem',
  '0.143rem',
  '0.286rem',
  '0.571rem',
  '0.71rem',
  '0.857rem',
  '1rem',
  '1.143rem',
  '1.429rem',
  '1.714rem',
  '2rem',
  '2.286rem',
  '2.857rem',
];
export const fontWeight = {
  light: '400',
  base: '400',
  semibold: '600',
  bold: '700',
};

/**
 * @deprecated
 *
 * Use spacing instead \
 * smaller : sp4 \
 * small : sp8 \
 * base : sp16 \
 * large : sp20 \
 * larger : sp24 \
 *
 */
export const padding = {
  smaller: '4px',
  small: '8px',
  base: '16px',
  large: '20px',
  larger: '24px',
};

/**
 * @deprecated
 * use import { spacing } from '@scality/core-ui/dist/spacing';
 *
 */
export const spacing = {
  sp0: space[0],
  sp1: space[1],
  sp2: space[2],
  sp4: space[3],
  sp8: space[4],
  sp10: space[5],
  sp12: space[6],
  sp14: space[7],
  sp16: space[8],
  sp20: space[9],
  sp24: space[10],
  sp28: space[11],
  sp32: space[12],
  sp40: space[13],
};
// Svg size
export const svgSize = {
  smaller: '11px',
  small: '14px',
  base: '16px',
  large: '18px',
  larger: '22px',
  huge: '30px',
  massive: '40px',
};
export const zIndex = {
  tooltip: 9990,
  notification: 9000,
  modal: 8500,
  overlay: 8000,
  dropdown: 7000,
  nav: 500,
  sidebar: 100,
  scrollbarButton: 2,
  base: 1,
};
//navbar
export const navbarHeight = '3rem';
export const navbarItemWidth = '4.286rem';
//sidebar
export const sidebarItemHeight = spacing.sp40;
export const sidebarWidth = spacing.sp40;

// We use 8 main color from the palette and decline them (lighter/ darker) when we have more than 8 datasets
export const lineTimeSeriesColorRange = [
  lineColor1,
  lineColor2,
  lineColor3,
  lineColor4,
  lineColor5,
  lineColor6,
  lineColor7,
  lineColor8,
  lighten(0.3, lineColor1),
  lighten(0.3, lineColor2),
  lighten(0.3, lineColor3),
  lighten(0.3, lineColor4),
  lighten(0.3, lineColor5),
  lighten(0.3, lineColor6),
  lighten(0.3, lineColor7),
  lighten(0.3, lineColor8),
  darken(0.2, lineColor1),
  darken(0.2, lineColor2),
  darken(0.2, lineColor3),
  darken(0.2, lineColor4),
  darken(0.3, lineColor5),
  darken(0.3, lineColor6),
  darken(0.3, lineColor7),
  darken(0.3, lineColor8),
];
