import React from 'react';
import { action } from '@storybook/addon-actions';
import { Notifications } from '../src/lib/components/notifications/Notifications.component';
import { Props } from '../src/lib/components/notifications/Notification.component';
import { Wrapper } from './common';

const trNotifications: Array<Props> = [
  {
    uid: '1',
    title: 'Hi',
    message: 'I am Carlito. I live at TOP_RIGHT',
    variant: 'base',
    // 'data-cy': 'Carlito_notification',
  },
  {
    uid: '2',
    title: 'Hi',
    message: 'I am Patrick. I live at TOP_RIGHT',
    // 'data-cy': 'Patrick_notification',
  },
];
const tlNotifications: Array<Props> = [
  {
    uid: '3',
    title: 'Hi',
    message: 'I am Jordi. I live at TOP_LEFT',
    variant: 'danger',
  },
  {
    uid: '4',
    title: 'Hi',
    message: 'I am Guidllaume. I live at TOP_LEFT',
    variant: 'healthy',
    dismissAfter: 10000,
  },
];
const blNotifications: Array<Props> = [
  {
    uid: '5',
    title: 'Hi',
    message: 'I am Teddy. I live at BOTTOM_LEFT',
    variant: 'warning',
  },
  {
    uid: '6',
    title: 'Hi',
    message: 'I am Yanjin. I live at BOTTOM_LEFT',
    variant: 'healthy',
    dismissAfter: 10000,
  },
];
const brNotifications: Array<Props> = [
  {
    uid: '7',
    title: 'Hi',
    message: 'I am Charles. I live at BOTTOM_RIGHT',
    variant: 'danger',
  },
  {
    uid: '8',
    title: 'Hi',
    message: 'I am Claude. I live at BOTTOM_RIGHT',
    variant: 'warning',
  },
];
export default {
  title: 'Components/Feedback/Notifications',
  component: Notifications,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};

const basic: Props = {
  uid: '1',
  title: 'Notification Title',
};

export const Basic = {
  args: {
    notifications: [basic],
  },
};

export const WithMessage = {
  args: {
    notifications: [
      {
        uid: '1',
        title: 'HI!',
        message: 'This is a notifiaction with a message',
      },
    ],
  },
};

export const WithTimer = {
  args: {
    notifications: [
      {
        uid: '1',
        title: 'Hi !',
        variant: 'success',
        message: 'This is a notification with a timer',
        dismissAfter: 10000,
      },
    ],
  },
  parameters: {
    docs: {
      canvas: {
        withToolbar: true,
      },
    },
  },
};

export const DifferentPosition = {
  ...Basic,
  args: {
    notifications: [
      {
        uid: '1',
        title: 'Hi',
        message: 'This is a notification living in the Top Left corner',
      },
    ],
    position: 'tl',
  },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'none',
      },
    },
  },
};

export const MultipleNotificationsWithVariants = {
  args: {
    notifications: [
      {
        uid: '0',
        title: 'Hi !',
        message: "This is notification doesn't have a background",
      },
      {
        uid: '1',
        title: 'Hi !',
        message: 'This is a base variant notification',
        variant: 'base',
      },
      {
        uid: '2',
        title: 'Hi !',
        message: 'This is a warning variant notification',
        variant: 'warning',
      },
      {
        uid: '3',
        title: 'Hi !',
        message: 'This is a danger variant notification',
        variant: 'danger',
      },
      {
        uid: '4',
        title: 'Hi !',
        message: 'This is a healthy variant notification',
        variant: 'healthy',
      },
    ],
  },
};

export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <Notifications
          notifications={trNotifications}
          onDismiss={action('onDismiss')}
        />
        <Notifications
          position="tl"
          notifications={tlNotifications}
          onDismiss={action('onDismiss')}
        />
        <Notifications
          position="bl"
          notifications={blNotifications}
          onDismiss={action('onDismiss')}
        />
        <Notifications
          position="br"
          notifications={brNotifications}
          onDismiss={action('onDismiss')}
        />
      </Wrapper>
    );
  },
};
