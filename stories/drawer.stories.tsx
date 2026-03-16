import { useState } from 'react';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Drawer } from '../src/lib/components/drawer/Drawer.component';
import { Wrapper } from './common';

export default {
  title: 'Components/Feedback/Drawer',
  component: Drawer,
  decorators: [
    (story) => <Wrapper style={{ minHeight: '30vh' }}>{story()}</Wrapper>,
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: { control: 'text' },
    overlay: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
  },
};

export const Default = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} label="Open Drawer" />
        <Drawer {...args} isOpen={isOpen} close={() => setIsOpen(false)} />
      </>
    );
  },
  args: {
    title: 'Drawer Title',
    position: 'left',
    size: '400px',
    overlay: false,
    children: (
      <div>
        <p>This is the drawer content.</p>
        <p>The app remains visible and interactive behind the drawer.</p>
      </div>
    ),
  },
};

export const WithFooter = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} label="Open Drawer" />
        <Drawer
          {...args}
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          footer={
            <>
              <Button
                label="Cancel"
                variant="outline"
                onClick={() => setIsOpen(false)}
                style={{ minWidth: '6rem' }}
              />
              <Button
                label="Save"
                variant="primary"
                onClick={() => setIsOpen(false)}
                style={{ minWidth: '6rem' }}
              />
            </>
          }
        />
      </>
    );
  },
  args: {
    title: 'Settings',
    position: 'left',
    size: '400px',
    overlay: false,
    children: (
      <div>
        <p>Drawer with footer actions.</p>
        <p>Use footer for save, cancel, or reset buttons.</p>
      </div>
    ),
  },
};

export const WithOverlay = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button
          onClick={() => setIsOpen(true)}
          label="Open Drawer with Overlay"
        />
        <Drawer {...args} isOpen={isOpen} close={() => setIsOpen(false)} />
      </>
    );
  },
  args: {
    title: 'Overlay Drawer',
    position: 'left',
    size: '400px',
    overlay: true,
    children: (
      <div>
        <p>This drawer has a backdrop overlay.</p>
        <p>Click the overlay or press Escape to close.</p>
      </div>
    ),
  },
};

export const RightPosition = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} label="Open Right Drawer" />
        <Drawer {...args} isOpen={isOpen} close={() => setIsOpen(false)} />
      </>
    );
  },
  args: {
    title: 'Right Drawer',
    position: 'right',
    size: '350px',
    overlay: false,
    children: <p>Drawer sliding in from the right.</p>,
  },
};
