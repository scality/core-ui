import React, { useState } from 'react';
import { Banner } from '../src/lib/components/banner/Banner.component';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import {
  Form,
  FormGroup,
  FormSection,
} from '../src/lib/components/form/Form.component';
import { Checkbox } from '../src/lib/components/checkbox/Checkbox.component';
import { ConstrainedText } from '../src/lib/components/constrainedtext/Constrainedtext.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Input } from '../src/lib/components/inputv2/inputv2';
import { RadioGroup } from '../src/lib/components/radio/RadioGroup.component';
import { Select } from '../src/lib/components/selectv2/Selectv2.component';
import { Text } from '../src/lib/components/text/Text.component';
import { TextArea } from '../src/lib/components/textarea/TextArea.component';
import { Toggle } from '../src/lib/components/toggle/Toggle.component';
import { Tooltip } from '../src/lib/components/tooltip/Tooltip.component';
import { Stack } from '../src/lib/spacing';
import { iconArgType } from './controls';
import { Accordion } from '../src/lib/next';

export default {
  title: 'Templates/Form',
  component: Form,
  args: {
    kind: 'page',
    title: 'My Form',
    subTitle: 'Some Subtitle',
  },
  argTypes: {
    layout: {
      control: false,
      description:
        'Control the layout of the form, it is an object containing "kind", "title", "subTitle" and "icon", if the kind is "page" the title and subTitle are required',
      table: {
        type: {
          summary:
            'Object{kind: "page" | "tab", title: string, subTitle: string, icon: Element}',
        },
      },
    },
    kind: {
      options: ['page', 'tab'],
      control: { type: 'radio' },
    },
    icon: {
      if: { arg: 'kind', eq: 'page' },
      ...iconArgType,
    },
    title: {
      control: 'text',
      if: { arg: 'kind', eq: 'page' },
    },
    subTitle: {
      control: 'text',
      if: { arg: 'kind', eq: 'page' },
    },
    responsive: {
      control: 'boolean',
      description:
        'Makes contained fields fluid and lays each FormSection out as a grid that auto-flips to a stacked column on narrow widths. Only `Input` honors the fluid width today.',
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
    const [toggle, setToggle] = useState(true);
    return (
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
            icon={<Icon name="Exclamation-circle" />}
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
              <Toggle
                onChange={() => {
                  setToggle(!toggle);
                }}
                toggle={toggle}
                name="toggle"
              />
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
    );
  },
  args: {
    requireMode: 'partial',
  },
};

export const ResponsiveForm = {
  render: ({ requireMode, responsive }) => {
    const [analytics, setAnalytics] = useState(true);
    const [versioning, setVersioning] = useState(false);
    const [lockMode, setLockMode] = useState('governance');

    return (
      <div
        style={{
          resize: 'horizontal',
          overflow: 'auto',
          minWidth: '18rem',
          maxWidth: '100%',
          border: '1px dashed #666',
          height: '40rem',
        }}
      >
        <Form
          layout={{ kind: 'tab' }}
          requireMode={requireMode}
          responsive={responsive}
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
              name: 'Mixed field types',
              helpTooltip: 'One of every common input, in horizontal rows',
              icon: 'Node-backend',
            }}
            forceLabelWidth={200} // force the label column to 200px wide
          >
            <FormGroup
              direction="horizontal"
              label="Bucket name"
              id="bucket-name"
              labelHelpTooltip="The name of the bucket"
              content={<Input id="bucket-name" />}
              help="Optional helper text"
              required
            />
            <FormGroup
              direction="horizontal"
              label="Analytics"
              id="analytics"
              content={
                <Checkbox
                  id="analytics"
                  label="Enable usage analytics"
                  checked={analytics}
                  onChange={() => setAnalytics(!analytics)}
                />
              }
              error="Analytics must be enabled while the trial is active."
              helpErrorPosition="right"
              required={false}
            />
            <FormGroup
              direction="horizontal"
              label="Object Lock Mode"
              id="lock-mode"
              labelHelpTooltip="S3 Object Lock Retention"
              content={
                <RadioGroup
                  name="lock-mode"
                  aria-label="Object Lock Mode"
                  value={lockMode}
                  onChange={setLockMode}
                  options={[
                    { value: 'governance', label: 'Governance' },
                    { value: 'compliance', label: 'Compliance' },
                  ]}
                />
              }
              required
            />
            <FormGroup
              direction="horizontal"
              label="Versioning"
              id="versioning"
              content={
                <Toggle
                  name="versioning"
                  toggle={versioning}
                  onChange={() => setVersioning(!versioning)}
                />
              }
              required={false}
            />
            <FormGroup
              direction="horizontal"
              label="Description"
              id="description"
              content={
                <TextArea
                  id="description"
                  placeholder="Describe this bucket for other operators"
                />
              }
              help="Shown in the destination console."
              required={false}
            />
          </FormSection>

          <FormSection
            title={{
              name: 'Read-only details',
              helpTooltip:
                'Text-only fields that display a value, not an input',
              icon: 'Info-circle',
            }}
          >
            <FormGroup
              direction="horizontal"
              label="User Type"
              id="userType"
              content={
                <Text>
                  <Stack>
                    <Tooltip overlay={'Remote User'}>
                      <Icon name="Simple-user" ariaLabel="Remote User" />
                    </Tooltip>
                    Remote
                  </Stack>
                </Text>
              }
              required={false}
            />
            <FormGroup
              direction="horizontal"
              label="Username"
              id="username"
              content={
                <div style={{ overflow: 'hidden', width: '20.5rem' }}>
                  <ConstrainedText
                    text={
                      <Text>
                        a-very-long-username-that-will-be-clamped-across-two-lines-when-it-does-not-fit
                      </Text>
                    }
                    lineClamp={2}
                  />
                </div>
              }
              required={false}
            />
            <FormGroup
              direction="horizontal"
              label="Created on"
              id="createdOn"
              content={<Text>2026-07-17 10:24 UTC</Text>}
              required={false}
            />
          </FormSection>
        </Form>
      </div>
    );
  },
  args: {
    requireMode: 'partial',
    responsive: true,
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
    kind: 'tab',
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

export const FormWithAccordion = {
  render: ({ kind, title, subTitle, icon, requireMode }) => {
    const layout = {
      kind,
      title,
      subTitle,
      icon,
    };
    const [toggle, setToggle] = useState(true);
    return (
      <>
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
              icon={<Icon name="Exclamation-circle" />}
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
                <Toggle
                  onChange={() => {
                    setToggle(!toggle);
                  }}
                  toggle={toggle}
                  name="toggle"
                />
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
            <Accordion title="Advanced Settings" id="advanced-settings">
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
            </Accordion>
          </FormSection>
        </Form>
      </>
    );
  },
  args: {
    requireMode: 'partial',
  },
};
