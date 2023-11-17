import { iconTable } from "../src/lib/components/icon/Icon.component";

export const iconOptions = Object.keys(iconTable);

export const iconArgType = {
  control: { type: 'select' },
  options: iconOptions,
  description: 'Icon to display in the button',
};

export const variantsOptions = [
  'buttonPrimary',
  'buttonSecondary',
  'buttonDelete',
  'backgroundLevel1',
];
export const sizesOptions = ['smaller', 'small', 'base', 'large', 'larger'];

export const placementOptions = [
    'top',
    'bottom',
    'left',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom-end',
    'bottom-start',
    'left-start',
    'left-end',
  ];

export const tooltipArgTypes =  {
    tooltip: {
    description:
      "Object with 'overlay','placement' and 'overlayStyle' properties",
    control: false,
  },
  tooltipOverlay: { control: 'text' },
  tooltipPlacement: {
    control: { type: 'select' },
    options: placementOptions,
  },
  tooltipOverlayStyle: {
    control:'object',
    description: 'Object of CSS properties',
  }}

