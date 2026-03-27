import React, { useState } from 'react';
import { Banner } from '../../src/lib/components/banner/Banner.component';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import {
  Form,
  FormGroup,
  FormSection,
} from '../../src/lib/components/form/Form.component';
import { Icon } from '../../src/lib/components/icon/Icon.component';
import { Input } from '../../src/lib/components/inputv2/inputv2';
import { Checkbox as CheckboxComponent } from '../../src/lib/components/checkbox/Checkbox.component';
import { Radio } from '../../src/lib/components/radio/Radio.component';
import { Toggle } from '../../src/lib/components/toggle/Toggle.component';
import { Stack } from '../../src/lib/spacing';

export default {
  title: 'Templates/ToggleInForm',
  component: Form,
};

const SaveActions = () => (
  <Stack gap="r16">
    <Button variant="outline" label="Cancel" />
    <Button variant="primary" label="Save" icon={<Icon name="Save" />} />
  </Stack>
);

/**
 * ❌ Problème : le label "Active" est statique.
 * Quand le toggle est ON, le label dit "Active" — OK.
 * Mais quand il est OFF, le label dit toujours "Active" — est-ce l'état
 * actuel ou l'état qu'on va obtenir en cliquant ?
 */
export const AmbiguousToggle = {
  render: () => {
    const [objectLock, setObjectLock] = useState(false);

    return (
      <Form
        layout={{ kind: 'page', title: 'Edit bucket', icon: 'Node-backend' }}
        requireMode="partial"
        rightActions={<SaveActions />}
        banner={
          <Banner
            variant="warning"
            icon={<Icon name="Exclamation-triangle" />}
            title="Bad practice — ambiguous label"
          >
            When the toggle is OFF, the label still says "Active". The user
            cannot tell if "Active" is the current state or the target state
            after clicking.
          </Banner>
        }
      >
        <FormSection title={{ name: 'General' }} forceLabelWidth="25%">
          <FormGroup
            direction="horizontal"
            label="Bucket name"
            id="bucket-name-1"
            content={
              <Input id="bucket-name-1" value="my-bucket" onChange={() => {}} />
            }
          />
        </FormSection>

        <FormSection title={{ name: 'Features' }} forceLabelWidth="25%">
          <FormGroup
            direction="horizontal"
            label="Object Lock"
            id="object-lock-1"
            help="Prevent objects from being deleted or overwritten."
            helpErrorPosition="bottom"
            content={
              // ❌ Label statique : ne change pas avec l'état
              <Toggle
                name="object-lock-1"
                toggle={objectLock}
                label="Active"
                onChange={() => setObjectLock(!objectLock)}
              />
            }
          />
        </FormSection>
      </Form>
    );
  },
};

/**
 * ✅ Correction : le label reflète dynamiquement l'état courant.
 * ON → "Enabled", OFF → "Disabled". L'utilisateur sait toujours
 * dans quel état se trouve la feature.
 */
export const ClearToggle = {
  render: () => {
    const [objectLock, setObjectLock] = useState(false);

    return (
      <Form
        layout={{ kind: 'page', title: 'Edit bucket', icon: 'Node-backend' }}
        requireMode="partial"
        rightActions={<SaveActions />}
        banner={
          <Banner
            variant="base"
            icon={<Icon name="Info-circle" />}
            title="Better — dynamic label"
          >
            The label updates with the state: "Enabled" when ON, "Disabled"
            when OFF. The current state is always unambiguous.
          </Banner>
        }
      >
        <FormSection title={{ name: 'General' }} forceLabelWidth="25%">
          <FormGroup
            direction="horizontal"
            label="Bucket name"
            id="bucket-name-2"
            content={
              <Input id="bucket-name-2" value="my-bucket" onChange={() => {}} />
            }
          />
        </FormSection>

        <FormSection title={{ name: 'Features' }} forceLabelWidth="25%">
          <FormGroup
            direction="horizontal"
            label="Object Lock"
            id="object-lock-2"
            help="Prevent objects from being deleted or overwritten."
            helpErrorPosition="bottom"
            content={
              // ✅ Label dynamique : reflète l'état courant
              <Toggle
                name="object-lock-2"
                toggle={objectLock}
                label={objectLock ? 'Enabled' : 'Disabled'}
                onChange={() => setObjectLock(!objectLock)}
              />
            }
          />
        </FormSection>
      </Form>
    );
  },
};

/**
 * ✅ Recommandé dans un formulaire : checkbox avec label d'intention.
 *
 * La règle clé : ne pas parler d'état ("Active", "Enabled") mais d'intention.
 * Le label répond à "qu'est-ce que je vais obtenir si je coche ça ?"
 *
 *   ☑ Enable Object Lock  →  coché = je veux que ce soit activé au Save
 *   ☐ Enable Object Lock  →  décoché = je ne veux pas l'activer
 *
 * Pas d'ambiguïté entre état courant et action à effectuer.
 */
export const RadioButtons = {
  render: () => {
    const [objectLock, setObjectLock] = useState<'enabled' | 'disabled'>('disabled');

    return (
      <Form
        layout={{ kind: 'page', title: 'Edit bucket', icon: 'Node-backend' }}
        requireMode="partial"
        rightActions={<SaveActions />}
        banner={
          <Banner
            variant="success"
            icon={<Icon name="Check-circle" />}
            title="Alternative — radio buttons"
          >
            Both options are visible at once. Useful when the two states have
            equal semantic weight and distinct labels (e.g. Governance /
            Compliance).
          </Banner>
        }
      >
        <FormSection title={{ name: 'General' }} forceLabelWidth="25%">
          <FormGroup
            direction="horizontal"
            label="Bucket name"
            id="bucket-name-radio"
            content={
              <Input id="bucket-name-radio" value="my-bucket" onChange={() => {}} />
            }
          />
        </FormSection>

        <FormSection title={{ name: 'Features' }} forceLabelWidth="25%">
          <FormGroup
            direction="horizontal"
            label="Object Lock"
            id="object-lock-radio"
            helpErrorPosition="bottom"
            content={
              <Stack gap="r24">
                <Radio
                  name="object-lock"
                  value="enabled"
                  checked={objectLock === 'enabled'}
                  onChange={() => setObjectLock('enabled')}
                  label="Enable"
                />
                <Radio
                  name="object-lock"
                  value="disabled"
                  checked={objectLock === 'disabled'}
                  onChange={() => setObjectLock('disabled')}
                  label="Disable"
                />
              </Stack>
            }
            help="Prevent objects from being deleted or overwritten."
          />
        </FormSection>
      </Form>
    );
  },
};

export const Checkbox = {
  render: () => {
    const [objectLock, setObjectLock] = useState(false);

    return (
      <Form
        layout={{ kind: 'page', title: 'Edit bucket', icon: 'Node-backend' }}
        requireMode="partial"
        rightActions={<SaveActions />}
        banner={
          <Banner
            variant="success"
            icon={<Icon name="Check-circle" />}
            title="Recommended — checkbox with intent label"
          >
            The label describes an intention, not a state. "Enable Object Lock"
            means: if checked, Object Lock will be active after saving. No
            ambiguity — the user chooses what they want, not what currently is.
          </Banner>
        }
      >
        <FormSection title={{ name: 'General' }} forceLabelWidth="25%">
          <FormGroup
            direction="horizontal"
            label="Bucket name"
            id="bucket-name-3"
            content={
              <Input id="bucket-name-3" value="my-bucket" onChange={() => {}} />
            }
          />
        </FormSection>

        <FormSection title={{ name: 'Features' }} forceLabelWidth="25%">
          <FormGroup
            direction="horizontal"
            label="Object Lock"
            id="object-lock-3"
            helpErrorPosition="bottom"
            content={
              // ✅ "Enable" : intention claire, le label FormGroup porte le nom de la feature
              <CheckboxComponent
                label="Enable"
                checked={objectLock}
                onChange={(e) => setObjectLock(e.target.checked)}
              />
            }
            help={
              objectLock
                ? 'Objects will be protected from deletion or overwrite after saving.'
                : 'Objects will not be protected. You can enable this later.'
            }
          />
        </FormSection>
      </Form>
    );
  },
};
