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

// Export the default light & dark theme
export const defaultTheme = {
  light: {
    alert: '#A39300',
    base: '#607080',
    primary: '#FAF9FB',
    primaryDark1: '#F7F6F9',
    primaryDark2: '#EDEAF0',
    secondary: '#0F7FFF',
    secondaryDark1: '#1C3D59',
    secondaryDark2: '#1C2E3F',
    success: '#006F62',
    healthy: '#24871D',
    healthyLight: '#33A919',
    warning: '#946F00',
    danger: '#AA1D05',
    critical: '#BE321F',
    background: '#ffffff',
    backgroundBluer: '#ECF4FF',
    textPrimary: '#313B44',
    textSecondary: '#8593A0',
    textTertiary: '#A7B6C3',
    borderLight: '#EBEBEB',
    border: '#A5A5A5',
    info: '#8C8C8C',
  },
  dark: {
    alert: '#FFE508',
    base: '#7B7B7B',
    primary: '#1D1D1D',
    primaryDark1: '#171717',
    primaryDark2: '#0A0A0A',
    secondary: '#0F7FFF',
    secondaryDark1: '#1C3D59',
    secondaryDark2: '#1C2E3F',
    success: '#006F62',
    healthy: '#30AC26',
    healthyLight: '#69E44C',
    warning: '#FFC10A',
    danger: '#AA1D05',
    critical: '#BE321F',
    background: '#121212',
    backgroundBluer: '#192A41',
    textPrimary: '#FFFFFF',
    textSecondary: '#B5B5B5',
    textTertiary: '#DFDFDF',
    borderLight: '#A5A5A5',
    border: '#313131',
    info: '#434343',
  },
  // TODO: temporary merge `darkRebrand` and `dark` to avoid the UIs break.
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
    textTertiary: '#B5B5B5', // deprecated color
    textReverse: '#000000',
    textLink: '#71AEFF',
    // deprecated colors
    alert: '#FFE508',
    base: '#7B7B7B',
    primary: '#1D1D1D',
    primaryDark1: '#171717',
    primaryDark2: '#0A0A0A',
    secondary: '#0F7FFF',
    secondaryDark1: '#1C3D59',
    secondaryDark2: '#1C2E3F',
    success: '#006F62',
    healthy: '#30AC26',
    healthyLight: '#69E44C',
    warning: '#FFC10A',
    danger: '#AA1D05',
    critical: '#BE321F',
    background: '#121212',
    backgroundBluer: '#192A41',
    borderLight: '#A5A5A5',
    info: '#434343',
  },
};
export const brand = defaultTheme.darkRebrand;

// LineChart colors
export const lineColor1 = '#A14FBF';
export const lineColor2 = '#BE9A40';
export const lineColor3 = '#4BE4E2';
export const lineColor4 = '#DC90F1';
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
  huge: '1.57rem', // no use case for the moment
  massive: '1.71rem', // no use case for the moment
};

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
  sp0: '0',
  sp1: '0.071rem',
  sp2: '0.143rem',
  sp4: '0.286rem',
  sp8: '0.571rem',
  sp10: '0.71rem',
  sp12: '0.857rem',
  sp14: '1rem',
  sp16: '1.143rem',
  sp20: '1.429rem',
  sp24: '1.714rem',
  sp28: '2rem',
  sp32: '2.286rem',
  sp40: '2.857rem',
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
export const navbarHeight = spacing.sp28;
export const navbarItemWidth = spacing.sp60;

//sidebar
export const sidebarItemHeight = spacing.sp40;
export const sidebarWidth = spacing.sp40;
