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
import { SmallerSecondaryText } from '../src/lib/components/text/Text.component';

export default {
  title: 'Components/Form',
  component: Form,
};

export const PageForm = () => {
  return (
    <div
      style={{
        height: '800px',
        background: brand.backgroundLevel4,
        color: brand.textPrimary,
      }}
    >
      <Form
        title="My form"
        layout="page"
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
            {'There is an error.'}
          </Banner>
        }
      >
        <FormSection
          title="First part entity data"
          helpTooltip="Tooltip of the first entity"
          icon="Search"
        >
          <FormGroup
            direction="vertical"
            label="Name"
            id="name"
            labelHelpTooltip="Name Tooltip"
            content={<Input id={'name'}></Input>}
            help="Optional helper text"
            required
            disabled
          ></FormGroup>
          <FormGroup
            direction="horizontal"
            label="Email"
            id="email"
            labelHelpTooltip="Email Tooltip"
            content={<Input id={'email'}></Input>}
            error="Invalid email format. Try with a better format."
            helpErrorPosition="right"
            required
          ></FormGroup>
        </FormSection>
        <FormSection
          title="Second part entity data"
          helpTooltip="Tooltip of the Second entity"
          icon="Search"
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
            content={<Input value={''} onChange={() => {}} id="email1"></Input>}
            error="Invalid email format. Try with a better format."
            helpErrorPosition="right"
            required={false}
          ></FormGroup>
          <FormGroup
            direction="horizontal"
            label="Email long long long"
            id="email-long1"
            labelHelpTooltip="Email Tooltip"
            content={
              <Input value={''} onChange={() => {}} id="email-long1"></Input>
            }
            help="toto"
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

                  <SmallerSecondaryText>
                    An user with a specific IAM permissions can overwrite/delete
                    protected object versions during the retention period.
                  </SmallerSecondaryText>
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
                <SmallerSecondaryText>
                  No one can overwrite protected object versions during the
                  retention period.
                </SmallerSecondaryText>
              </Stack>
            }
            required={true}
          ></FormGroup>
        </FormSection>
      </Form>
    </div>
  );
};

export const AllRequiredPageForm = () => {
  return (
    <div
      style={{
        height: '800px',
        background: brand.backgroundLevel4,
        color: brand.textPrimary,
      }}
    >
      <Form
        title="My form"
        layout="page"
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
          title="First part entity data"
          helpTooltip="Tooltip of the first entity"
          icon="Search"
        >
          <FormGroup
            direction="horizontal"
            label="Name"
            id="name"
            labelHelpTooltip="Name Tooltip"
            content={<Input id={'name'}></Input>}
            help="Please type your name :)"
            required
          ></FormGroup>
          <FormGroup
            direction="horizontal"
            label="Email"
            id="email"
            labelHelpTooltip="Email Tooltip"
            content={<Input id={'email'}></Input>}
            error="Invalid email format. Try with a better format."
            helpErrorPosition="right"
          ></FormGroup>
        </FormSection>
      </Form>
    </div>
  );
};

export const TabForm = () => {
  return (
    <div
      style={{
        height: '800px',
        background: brand.backgroundLevel1,
        color: brand.textPrimary,
      }}
    >
      <Form
        layout="tab"
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
            {'There is an error.'}
          </Banner>
        }
      >
        <FormSection
          title="First part entity data"
          helpTooltip="Tooltip of the first entity"
          icon="Search"
        >
          <FormGroup
            direction="vertical"
            label="Name"
            id="name"
            labelHelpTooltip="Name Tooltip"
            content={<Input value={''} onChange={() => {}} id={'name'}></Input>}
            help="Optional helper text"
            required
            disabled
          ></FormGroup>
          <FormGroup
            direction="horizontal"
            label="Email"
            id="email"
            labelHelpTooltip="Email Tooltip"
            content={
              <Input value={''} onChange={() => {}} id={'email'}></Input>
            }
            error="Invalid email format. Try with a better format."
            helpErrorPosition="right"
            required
          ></FormGroup>
        </FormSection>
        <FormSection
          title="Second part entity data"
          helpTooltip="Tooltip of the Second entity"
          icon="Search"
        >
          <FormGroup
            direction="horizontal"
            label="Name"
            id="name1"
            labelHelpTooltip="Name Tooltip"
            content={<Input id="name1" disabled></Input>}
            help="Optional helper text"
            required
          ></FormGroup>
          <FormGroup
            direction="horizontal"
            label="Email"
            id="email1"
            labelHelpTooltip="Email Tooltip"
            content={<Input id="email1"></Input>}
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
              ></Input>
            }
            help="toto"
            helpErrorPosition="bottom"
            required
          ></FormGroup>
        </FormSection>
      </Form>
    </div>
  );
};
