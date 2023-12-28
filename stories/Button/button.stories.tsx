import { action } from '@storybook/addon-actions';
import React from 'react';
import { Form, FormGroup, FormSection, Icon, Stack } from '../../src/lib';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import { Input } from '../../src/lib/next';
import { brand } from '../../src/lib/style/theme';
import { iconArgType } from '../controls';
import { Wrapper } from '../common';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (story) => <Wrapper className="storybook-button">{story()}</Wrapper>,
  ],
  args: {
    onClick: action('Button clicked'),
  },
  render: ({ icon, ...args }) => {
    return <Button {...args} icon={icon && <Icon name={icon} />} />;
  },
  argTypes: {
    onClick: {
      description: 'Function called on click',
    },
    variant: {
      description: 'Button variant',
    },
    icon: iconArgType,
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
          icon={icon && <Icon name={icon} />}
          {...args}
        />
        <Button
          variant="secondary"
          label="secondary"
          icon={icon && <Icon name={icon} />}
          {...args}
        />
        <Button
          variant="danger"
          label="danger"
          icon={icon && <Icon name={icon} />}
          {...args}
        />
        <Button
          variant="outline"
          label="outline"
          icon={icon && <Icon name={icon} />}
          {...args}
        />
      </>
    );
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    label: 'Primary',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    label: 'Secondary',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    label: 'Outline',
  },
};

export const Danger = {
  args: {
    variant: 'danger',
    label: 'Danger',
  },
};

export const SimpleForm = {
  render: ({ args }) => {
    return (
      <Form
        layout={{ kind: 'page', title: 'Simple Form', icon: 'Search' }}
        rightActions={
          <Stack gap={'r16'}>
            <Button variant="outline" label="Cancel" />
            <Button
              variant="primary"
              label="Save"
              icon={<Icon name="Save" />}
            />
          </Stack>
        }
      >
        <FormSection
          title={{
            name: 'First part entity data',
            helpTooltip: 'Tooltip of the first entity',
            icon: 'Search',
          }}
        >
          <FormGroup
            direction="vertical"
            label="Name"
            id="name"
            labelHelpTooltip="Name Tooltip"
            content={<Input id="name" />}
            required
          ></FormGroup>
          <FormGroup
            direction="horizontal"
            label="Email"
            id="email"
            labelHelpTooltip="Email Tooltip"
            content={<Input id="email" />}
            required
          ></FormGroup>
        </FormSection>
      </Form>
    );
  },
};

export const ButtonSizes = {
  render: ({ icon, ...args }) => {
    return (
      <>
        <Button
          variant="primary"
          label="Default"
          size="default"
          icon={icon && <Icon name={icon} />}
          {...args}
        />
        <Button
          variant="primary"
          label="Inline"
          size="inline"
          icon={icon && <Icon name={icon} />}
          {...args}
        />
      </>
    );
  },
};

export const ButtonsWithIcon = {
  ...DefaultButtons,
  args: {
    icon: 'Save',
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

export const ButtonLoading = {
  ...ButtonsWithIcon,
  args: {
    isLoading: true,
  },
};

export const IconButtonWithTooltip = {
  render: ({ ...args }) => {
    return (
      <div style={{ height: '5rem' }}>
        <Button icon={<Icon name="Delete"></Icon>} {...args} />
        <Button
          variant="secondary"
          icon={<Icon name="Sync"></Icon>}
          tooltip={{
            overlayStyle: {
              width: '80px',
            },
            overlay: 'Bound status',
            placement: 'top',
          }}
        />

        <Button {...args} icon={<Icon name="Delete"></Icon>} variant="danger" />
        <Button
          {...args}
          icon={<Icon name="Delete"></Icon>}
          variant="outline"
        />
      </div>
    );
  },
  args: {
    variant: 'primary',
    icon: <Icon name="Delete"></Icon>,
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

export const LinkButton = {
  render: ({ icon, ...args }) => {
    return (
      <>
        <Button
          label="Link"
          icon={icon === 'External-link' && <Icon name="External-link"></Icon>}
          {...args}
          variant="primary"
          onClick={() => window.open('/')}
        />
        <Button
          label="External Link"
          icon={<Icon name="External-link"></Icon>}
          variant="primary"
          onClick={() =>
            window.open('https://en.wikipedia.org/wiki/Button_(computing)')
          }
        />
      </>
    );
  },
  argTypes: {
    icon: {
      description:
        'Use the icon External-link to indicate that the button will redirect outside the UI',
      control: 'radio',
      options: ['External-link', 'No icon'],
    },
  },
};
