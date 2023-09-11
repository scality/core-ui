import React, { useState } from 'react';
import { BasicText } from '../src/lib';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import {
  Toast,
  ToastProps,
  useGetBackgroundColor,
} from '../src/lib/components/toast/Toast.component';

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: {
        disable: true,
      },
    },
    message: {
      control: {
        disable: true,
        description: 'The message to display in the toast',
      },
    },
    status: {
      control: 'radio',
      options: ['success', 'error', 'warning', 'info'],
      description: 'The status of the toast',
    },
    position: {
      control: 'select',
      options: [
        'top-center',
        'top-left',
        'top-right',
        'bottom-center',
        'bottom-left',
        'bottom-right',
      ],
      description: 'The position of the toast',
    },
    autoDismiss: {
      control: 'boolean',
      description: 'Whether the toast should dismiss automatically',
    },
    duration: {
      control: 'number',
      description: 'The duration of the toast',
    },
    icon: {
      control: {
        disable: true,
        description: 'The icon to display in the toast',
      },
    },
    width: {
      control: {
        disable: true,
        description: 'The width of the toast',
      },
    },
    withProgressBar: {
      control: 'boolean',
      description: 'Whether the toast should display a progress bar',
    },
    progressColor: {
      control: {
        disable: true,
      },
    },
    style: {
      control: {
        disable: true,
      },
    },
  },
};

const Template = (args: Omit<ToastProps, 'open' | 'onClose'>) => {
  const [open, setOpen] = useState(false);
  const color = useGetBackgroundColor(args.status || 'info');
  const iconName =
    args.status === 'error'
      ? 'Times-circle'
      : args.status === 'warning'
      ? 'Exclamation-circle'
      : args.status === 'success'
      ? 'Check-circle'
      : 'Info-circle';
  return (
    <>
      {!open && (
        <Button label={'Open my custom toast'} onClick={() => setOpen(true)} />
      )}
      <Toast
        open={open}
        onClose={() => setOpen(false)}
        icon={<Icon name={iconName} color={color} />}
        {...args}
      />
    </>
  );
};

export const SimpleToast = ({}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div>
      {!open && <Button label={'Open simple toast'} onClick={handleClick} />}
      <Toast
        open={open}
        message={<BasicText>{"I'm a toast"}</BasicText>}
        onClose={() => setOpen(false)}
        status="info"
      />
    </div>
  );
};

export const ToastWithProgressBar = ({}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div>
      {!open && (
        <Button
          label={'Open toast with a progress bar'}
          onClick={handleClick}
        />
      )}
      <Toast
        open={open}
        message={<BasicText>{"I'm a toast with a progress bar"}</BasicText>}
        onClose={() => setOpen(false)}
        status="info"
        withProgressBar
      />
    </div>
  );
};

export const CustomToast: {
  args?: Omit<ToastProps, 'open' | 'onClose'>;
} = Template.bind({});
CustomToast.args = {
  message: <BasicText>{"I'm a custom toast"}</BasicText>,
  status: 'info',
};
