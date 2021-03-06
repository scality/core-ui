//@flow
import React from 'react';
import Modal from '../src/lib/components/modal/Modal.component';
import Button from '../src/lib/components/button/Button.component';
import { action } from '@storybook/addon-actions';
import { Wrapper } from './common';

export default {
  title: 'Components/Notification/Modal',
  component: Modal,
};

export const Default = () => {
  return (
    <Wrapper>
      <Modal
        close={action('close clicked')}
        isOpen={true}
        title="Hello"
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              text="No"
              size="small"
              outlined
              onClick={action('No clicked')}
            />
            <Button
              variant="secondary"
              text="Yes"
              size="small"
              onClick={action('Yes clicked')}
            />
          </div>
        }
      >
        <span>Do you want a cookie?</span>
      </Modal>
    </Wrapper>
  );
};
