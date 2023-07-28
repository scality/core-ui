import {
  Form,
  FormGroup,
  FormSection,
} from '../src/lib/components/form/Form.component';
import React from 'react';
import { brand } from '../src/lib/style/theme';
import { Stack } from '../src/lib/spacing';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Icon, IconName } from '../src/lib/components/icon/Icon.component';
import { Input } from '../src/lib/components/inputv2/inputv2';
import { Toggle } from '../src/lib/components/toggle/Toggle.component';
import { Banner } from '../src/lib/components/banner/Banner.component';
import { Text } from '../src/lib/components/text/Text.component';
import { Select } from '../src/lib/components/selectv2/Selectv2.component';

export default {
  title: 'Components/Form',
  component: Form,
};

export const PageForm = ({
  layout,
}: {
  layout?: {
    kind: 'page';
    title: string;
    subTitle?: string;
    icon?: IconName;
  };
}) => {
  return (
    <div
      style={{
        height: '800px',
        background: brand.backgroundLevel4,
        color: brand.textPrimary,
      }}
    >
      <Form
        layout={
          layout || {
            kind: 'page',
            title: 'My form',
            subTitle: 'The sub title',
          }
        }
        requireMode="partial"
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
            content={<Toggle onChange={() => {}} toggle={true} name="toggle" />}
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
                    An user with a specific IAM permissions can overwrite/delete
                    protected object versions during the retention period.
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
};

export const AllRequiredPageForm = ({}) => {
  return (
    <div
      style={{
        height: '800px',
        background: brand.backgroundLevel4,
        color: brand.textPrimary,
      }}
    >
      <Form
        layout={{ kind: 'page', title: 'My form' }}
        requireMode="all"
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
            direction="horizontal"
            label="Name"
            id="name"
            labelHelpTooltip="Name Tooltip"
            content={<Input id="name" />}
            help="Please type your name :)"
            required
          ></FormGroup>
          <FormGroup
            direction="horizontal"
            label="Email"
            id="email"
            labelHelpTooltip="Email Tooltip"
            content={<Input id="email" />}
            error="Invalid email format. Try with a better format."
            helpErrorPosition="right"
          ></FormGroup>
        </FormSection>
      </Form>
    </div>
  );
};

export const TabForm = ({}) => {
  return (
    <div
      style={{
        height: '800px',
        background: brand.backgroundLevel1,
        color: brand.textPrimary,
      }}
    >
      <Form
        layout={{ kind: 'tab' }}
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
            helpTooltip: 'Tooltip of the second entity',
            icon: 'Search',
          }}
        >
          <FormGroup
            direction="horizontal"
            label="Name"
            id="name1"
            labelHelpTooltip="Name Tooltip"
            content={<Input id="name1" disabled />}
            help="Optional helper text"
            required
          ></FormGroup>
          <FormGroup
            direction="horizontal"
            label="Email"
            id="email1"
            labelHelpTooltip="Email Tooltip"
            content={<Input id="email1" />}
            error="Invalid email format. Try with a better format."
            helpErrorPosition="right"
            required
          ></FormGroup>
          <FormGroup
            direction="horizontal"
            label="Email long long long"
            id="email-long1"
            labelHelpTooltip="Email Tooltip"
            content={
              <Input
                leftIcon="Account"
                rightIcon="User"
                id="email-long1"
                placeholder="text"
              />
            }
            help="optional helper text"
            helpErrorPosition="bottom"
            required
          ></FormGroup>
        </FormSection>
      </Form>
    </div>
  );
};

export const PageFormWithIcon = ({}) => {
  return (
    <PageForm
      layout={{
        kind: 'page',
        title: 'My form with icon',
        subTitle: 'The sub title',
        icon: 'Search',
      }}
    />
  );
};
