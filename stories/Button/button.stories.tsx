import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  Form,
  FormGroup,
  FormSection,
  Icon,
  Stack,
  Text,
  Toggle,
} from '../../src/lib';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import { Wrapper } from '../common';
import { Input, Select } from '../../src/lib/next';
import { brand } from '../../src/lib/style/theme';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (story) => (
      <Wrapper className="storybook-button" style={{ height: 'auto' }}>
        {story()}
      </Wrapper>
    ),
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
    icon: {
      description: 'Icon to display on the button',
      options: [
        'Save',
        'Exclamation-triangle',
        'Arrow-right',
        'Link',
        'Copy',
        'Sync',
      ],
      type: 'select',
    },
  },
  parameters: {
    docs: {
      canvas: {
        additionalActions: [
          {
            title: 'Open in GitHub',
            onClick: () => {
              window.open('https://github.com/scality/core-ui', '_blank');
            },
          },
        ],
      },
    },
  },
};

export const Playground = {
  args: {
    label: 'Playground',
  },
};

export const DefaultButtons = {
  render: ({ ...args }) => {
    return (
      <>
        <Button variant="primary" label="primary" {...args} />
        <Button variant="secondary" label="secondary" {...args} />
        <Button variant="danger" label="danger" {...args} />
        <Button variant="outline" label="outline" {...args} />
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
  render: ({ ...args }) => {
    return (
      <div
        style={{
          background: brand.backgroundLevel4,
          color: brand.textPrimary,
        }}
      >
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
      </div>
    );
  },
};

export const ButtonSizes = {
  render: ({ ...args }) => {
    return (
      <>
        <Button variant="primary" label="Default" size="default" {...args} />
        <Button variant="primary" label="Inline" size="inline" {...args} />
      </>
    );
  },
};

export const ButtonsWithIcon = {
  ...DefaultButtons,
  args: {
    icon: <Icon name="Sync"></Icon>,
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
      <>
        <Button {...args} />
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
        <Button {...args} variant="danger" />
        <Button {...args} variant="outline" />
      </>
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
  render: (args) => {
    return (
      <>
        <Button
          label="Link"
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
};
