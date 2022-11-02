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
export const defaultTheme = {
  darkRebrand: {
    statusHealthy: '#0AADA6',
    statusWarning: '#F8F32B',
    statusCritical: '#E84855',
    selectedActive: '#037AFF',
    highlight: '#1A3C75',
    border: '#313131',
    buttonPrimary: '#2F4185',
    buttonSecondary: '#595A78',
    buttonDelete: '#3D0808',
    infoPrimary: '#8E8EAC',
    infoSecondary: '#333366',
    backgroundLevel1: '#121219',
    backgroundLevel2: '#323245',
    backgroundLevel3: '#232331',
    backgroundLevel4: '#171721',
    textPrimary: '#EAEAEA',
    textSecondary: '#B5B5B5',
    textTertiary: '#DFDFDF',
    textReverse: '#000000',
    textLink: '#71AEFF',
  },
};

export const brand = defaultTheme.darkRebrand;
export type ThemeColors = keyof typeof brand;
// LineChart colors
export const lineColor1 = '#A14FBF';
export const lineColor2 = '#BE9A40';
export const lineColor3 = '#4BE4E2';
export const lineColor4 = '#245A83';
export const lineColor5 = '#E3FF73';
export const lineColor6 = '#BE2543';
export const lineColor7 = '#FD8144';
export const lineColor8 = '#F6B187';
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
 */
export const padding = {
  smaller: '4px',
  small: '8px',
  base: '16px',
  large: '20px',
  larger: '24px',
};
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
