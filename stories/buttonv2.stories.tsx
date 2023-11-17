import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  Button,
  Props,
} from '../src/lib/components/buttonv2/Buttonv2.component';
import { Wrapper } from './common';
import { CopyButton } from '../src/lib/next';
import { Icon } from '../src/lib';
import { tooltipArgTypes, iconArgType } from './controls';

export default {
  title: 'Components/v2/Button',
  component: Button,
  decorators: [
    (story) => <Wrapper className="storybook-button">{story()}</Wrapper>,
  ],
  args: {
    onClick: action('Button clicked'),
  },
  argTypes: {
    ...tooltipArgTypes,
    icon: iconArgType,
  },
  render: ({
    // defines new args to have control over tooltip properties
    tooltipOverlay,
    tooltipPlacement,
    tooltipOverlayStyle,
    icon,
    ...args
  }) => {
    const props: Props = { ...args };
    // define tootltip with the new args
    props.tooltip = {
      overlay: tooltipOverlay,
      placement: tooltipPlacement,
      overlayStyle: tooltipOverlayStyle,
    };

    return (
      <Button icon={icon && <Icon name={icon}></Icon>} {...props}></Button>
    );
  },
};

export const Playground = {
  args: {
    label: 'Playground',
  },
};

export const DefaultButtons = {
  render: ({ icon, ...args }) => {
    return (
      <>
        <Button
          variant="primary"
          label="primary"
          icon={icon && <Icon name={icon}></Icon>}
          {...args}
        />
        <Button
          variant="secondary"
          label="secondary"
          icon={icon && <Icon name={icon}></Icon>}
          {...args}
        />
        <Button
          variant="danger"
          label="danger"
          icon={icon && <Icon name={icon}></Icon>}
          {...args}
        />
        <Button
          variant="outline"
          label="outline"
          icon={icon && <Icon name={icon}></Icon>}
          {...args}
        />
      </>
    );
  },
};

export const ButtonsWithIcon = {
  ...DefaultButtons,
  args: {
    icon: <i className="fas fa-arrow-right"></i>,
  },
};

export const ButtonDisabled = {
  ...ButtonsWithIcon,
  args: {
    disabled: true,
    tooltip: {
      overlayStyle: {
        width: '80px',
      },
      overlay: 'The button is disabled because of blabla...',
      placement: 'top',
    },
  },
};

export const IconButtonWithTooltip = {
  render: ({ icon, ...args }) => {
    return (
      <>
        <Button icon={icon && <Icon name={icon}></Icon>} {...args} />
        <Button
          variant="secondary"
          icon={<i className="fas fa-link" />}
          tooltip={{
            overlayStyle: {
              width: '80px',
            },
            overlay: 'Bound status',
            placement: 'top',
          }}
        />
        <Button
          icon={icon && <Icon name={icon}></Icon>}
          {...args}
          variant="danger"
        />
        <Button
          icon={icon && <Icon name={icon}></Icon>}
          {...args}
          variant="outline"
        />
      </>
    );
  },
  args: {
    variant: 'primary',
    icon: 'Delete',
    tooltip: {
      overlayStyle: {
        width: '80px',
      },
      overlay: 'Entity deletion',
      placement: 'top',
    },
  },
};

export const GhostButtons = {
  render: () => {
    return (
      <>
        <Button
          icon={<i className="fas fa-sync" />}
          tooltip={{
            overlayStyle: {
              width: '80px',
            },
            overlay: 'Refresh the metrics',
            placement: 'top',
          }}
        />
        <Button
          icon={<i className="fas fa-file-export" />}
          tooltip={{
            overlayStyle: {
              width: '120px',
            },
            overlay: 'Export the data in predefined format',
            placement: 'top',
          }}
        />
        <Button
          icon={<i className="fas fa-calendar-week" />}
          tooltip={{
            overlayStyle: {
              width: '120px',
            },
            overlay: 'Metric over a period',
            placement: 'top',
          }}
        />
      </>
    );
  },
};
export const CopyButtons = {
  render: ({ ...args }) => <CopyButton {...args}></CopyButton>,
  args: {
    textToCopy: 'test',
  },
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
    tooltipPlacement: {
      table: {
        disable: true,
      },
    },
    tooltip: {
      table: {
        disable: true,
      },
    },
    tooltipOverlay: {
      table: {
        disable: true,
      },
    },
    tooltipOverlayStyle: {
      table: {
        disable: true,
      },
    },
  },
};
export const CopyButtonsWithLabel = {
  ...CopyButtons,
  args: {
    ...CopyButtons.args,
    label: 'Test',
  },
};

export const OutlinedCopyButton = {
  ...CopyButtons,
  args: {
    ...CopyButtons.args,
    variant: 'outline',
  },
};

export const OutlinedCopyButtonWithLabel = {
  ...OutlinedCopyButton,
  args: {
    ...OutlinedCopyButton.args,
    label: 'Test',
  },
};

export const OutlinedCopyButtonWithBigLabel = {
  ...OutlinedCopyButton,
  args: {
    ...OutlinedCopyButton.args,
    label: 'Certificate',
    textToCopy: 'Certificate',
  },
};
