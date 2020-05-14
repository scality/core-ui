// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Notifications from "../src/lib/components/notifications/Notifications.component";
import { Wrapper } from "./common";

const trNotifications = [
  {
    uid: "1",
    title: "Hi",
    message: "I am Carlito. I live at TOP_RIGHT",
    variant: "base",
    "data-cy": "Carlito_notification",
  },
  {
    uid: "2",
    title: "Hi",
    message: "I am Patrick. I live at TOP_RIGHT",
    variant: "secondary",
    "data-cy": "Patrick_notification",
  },
];

const tlNotifications = [
  {
    uid: "3",
    title: "Hi",
    message: "I am Jordi. I live at TOP_LEFT",
    variant: "danger",
  },
  {
    uid: "4",
    title: "Hi",
    message: "I am Guidllaume. I live at TOP_LEFT",
    variant: "success",
    dismissAfter: 10000,
  },
];

const blNotifications = [
  {
    uid: "5",
    title: "Hi",
    message: "I am Teddy. I live at BOTTOM_LEFT",
    variant: "warning",
  },
  {
    uid: "6",
    title: "Hi",
    message: "I am Yanjin. I live at BOTTOM_LEFT",
    variant: "success",
    dismissAfter: 10000,
  },
];

const brNotifications = [
  {
    uid: "7",
    title: "Hi",
    message: "I am Charles. I live at BOTTOM_RIGHT",
    variant: "danger",
  },
  {
    uid: "8",
    title: "Hi",
    message: "I am Claude. I live at BOTTOM_RIGHT",
    variant: "warning",
  },
];

storiesOf("Notifications", module).add("Default", () => {
  return (
    <Wrapper>
      <Notifications
        notifications={trNotifications}
        onDismiss={action("onDismiss")}
      />
      <Notifications
        position="tl"
        notifications={tlNotifications}
        onDismiss={action("onDismiss")}
      />
      <Notifications
        position="bl"
        notifications={blNotifications}
        onDismiss={action("onDismiss")}
      />
      <Notifications
        position="br"
        notifications={brNotifications}
        onDismiss={action("onDismiss")}
      />
    </Wrapper>
  );
});
