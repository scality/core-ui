import {
  Form,
  FormGroup,
  FormSection,
} from '../src/lib/components/form/Form.component';
import React from 'react';
import { brand } from '../src/lib/style/theme';
import { Stack } from '../src/lib/spacing';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Input } from '../src/lib/components/inputv2/inputv2';
import { Toggle } from '../src/lib/components/toggle/Toggle.component';
import { Banner } from '../src/lib/components/banner/Banner.component';
import { Text } from '../src/lib/components/text/Text.component';
import { Select } from '../src/lib/components/selectv2/Selectv2.component';
import { iconOptions } from './controls';

export default {
  title: 'Components/Form',
  component: Form,
  args: {
    kind: 'page',
    title: 'My Form',
    subTitle: 'Some Subtitle',
  },
  argTypes: {
    kind: {
      options: ['page', 'tab'],
      control: { type: 'radio' },
    },
    icon: {
      options: iconOptions,
      control: {
        type: 'select',
      },
    },
    title: {
      control: 'text',
      if: { arg: 'kind', eq: 'page' },
    },
    subTitle: {
      control: 'text',
      if: { arg: 'kind', eq: 'page' },
    },
  },
};

export const PageForm = {
  render: ({ kind, title, subTitle, icon, requireMode }) => {
    const layout = {
      kind,
      title,
      subTitle,
      icon,
    };
    return (
      <div
        style={{
          height: '800px',
          background: brand.backgroundLevel4,
          color: brand.textPrimary,
        }}
      >
        <Form
          layout={layout}
          requireMode={requireMode}
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
          banner={
            <Banner
              variant="danger"
              icon={<Icon name="Exclamation-triangle" />}
              title={'Error'}
            >
              There is an error
            </Banner>
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
              help="Optional helper text"
              required
              disabled
            ></FormGroup>
            <FormGroup
              direction="horizontal"
              label="Email"
              id="email"
              labelHelpTooltip="Email Tooltip"
              content={<Input id="email" />}
              error="Invalid email format. Try with a better format."
              helpErrorPosition="right"
              required
            ></FormGroup>
          </FormSection>
          <FormSection
            title={{
              name: 'Second part entity data',
              helpTooltip: 'Tooltip of the Second entity',
              icon: 'Search',
            }}
          >
            <FormGroup
              direction="horizontal"
              label="Name"
              id="name1"
              labelHelpTooltip="Name Tooltip"
              content={
                <Toggle onChange={() => {}} toggle={true} name="toggle" />
              }
              help="Optional helper text"
              required={false}
            ></FormGroup>
            <FormGroup
              direction="horizontal"
              label="Email"
              id="email1"
              labelHelpTooltip="Email Tooltip"
              content={<Input id="email1" />}
              error="Invalid email format. Try with a better format."
              helpErrorPosition="right"
              required={false}
            ></FormGroup>
            <FormGroup
              direction="horizontal"
              label="Email long long long"
              id="email-long1"
              labelHelpTooltip="Email Tooltip"
              content={<Input id="email-long1" />}
              help="optional helper text"
              helpErrorPosition="bottom"
              required={false}
            ></FormGroup>
          </FormSection>
          <FormSection>
            <FormGroup
              direction="vertical"
              label="Object Lock Mode"
              id="object_lock_mode"
              labelHelpTooltip="S3 Object Lock Retention"
              content={
                <Stack direction="vertical">
                  <Stack direction="vertical">
                    <Stack>
                      <input
                        type="radio"
                        name="locktype"
                        id="locktype-governance"
                        value="governance"
                      />
                      <label htmlFor="locktype-governance">Governance</label>
                    </Stack>
                    <Text isEmphazed color="textSecondary" variant="Smaller">
                      An user with a specific IAM permissions can
                      overwrite/delete protected object versions during the
                      retention period.
                    </Text>
                  </Stack>
                  <Stack>
                    <input
                      type="radio"
                      name="locktype"
                      id="locktype-compliance"
                      value="compliance"
                    />
                    <label htmlFor="locktype-compliance">Compliance</label>
                  </Stack>
                  <Text isEmphazed color="textSecondary" variant="Smaller">
                    No one can overwrite protected object versions during the
                    retention period.
                  </Text>
                </Stack>
              }
              required={true}
            ></FormGroup>
            <FormGroup
              id="value-example"
              label="Choose a value"
              helpErrorPosition="bottom"
              required
              content={
                <Select
                  id="value-example"
                  placeholder="Select an option..."
                  onChange={() => {}}
                  value={'value-1'}
                >
                  <Select.Option value={'value-1'}>Value 1</Select.Option>
                  <Select.Option value={'value-2'}>Value 2</Select.Option>
                  <Select.Option value={'value-3'}>Value 3</Select.Option>
                </Select>
              }
            />
          </FormSection>
        </Form>
      </div>
    );
  },
  args: {
    requireMode: 'partial',
  },
};

export const AllRequiredPageForm = {
  ...PageForm,
  args: {
    requireMode: 'all',
  },
};

export const TabForm = {
  ...PageForm,
  args: {
    layout: {
      kind: 'tab',
    },
  },
};

export const PageFormWithIcon = {
  ...PageForm,
  args: {
    layout: {
      kind: 'page',
      title: 'My form with icon',
      subTitle: 'The sub title',
      icon: 'Search',
    },
  },
};
