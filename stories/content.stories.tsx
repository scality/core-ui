import React, { useState } from 'react';
import { Modal } from '../src/lib/components/modal/Modal.component';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { FormGroup, FormSection } from '../src/lib/components/form/Form.component';
import { Input } from '../src/lib/components/inputv2/inputv2';

export default {
  title: 'Style/ContentExamples',
  tags: ['!dev', '!autodocs'],
};

export const ConfirmationModal = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button
          variant="secondary"
          icon={<Icon name="Download" />}
          label="Download connection details"
          onClick={() => setIsOpen(true)}
        />
        <Modal
          isOpen={isOpen}
          title='Download new connection details for "prod-paris"?'
          close={() => setIsOpen(false)}
          actions={{
            cancel: { onClick: () => setIsOpen(false) },
            confirm: {
              label: 'Download',
              variant: 'primary',
              onClick: () => setIsOpen(false),
            },
          }}
        >
          The connection details downloaded before will stop working.
        </Modal>
      </>
    );
  },
};

export const ValidationMessages = {
  render: () => (
    <FormSection>
      <FormGroup
        direction="vertical"
        label="Rule name"
        id="rule-name"
        required
        content={<Input id="rule-name" value="" onChange={() => {}} />}
        error="Enter a rule name."
        helpErrorPosition="bottom"
      />
      <FormGroup
        direction="vertical"
        label="Days"
        id="days"
        required
        content={<Input id="days" type="number" value="0" onChange={() => {}} />}
        error="The number of days must be at least 1."
        helpErrorPosition="bottom"
      />
    </FormSection>
  ),
};
