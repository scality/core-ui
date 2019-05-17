// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Notifications from "../src/lib/components/notifications/Notifications.component";

const trNotifications = [
  {
    title: "Hi",
    message: "I am Carlito. I live at TOP_RIGHT"
  },
  {
    title: "Hi",
    message: "I am Patrick. I live at TOP_RIGHT",
    variant: "secondary"
  }
];

const tlNotifications = [
  {
    title: "Hi",
    message: "I am Jordi. I live at TOP_LEFT",
    variant: "danger"
  },
  {
    title: "Hi",
    message: "I am Guillaume. I live at TOP_LEFT",
    variant: "success",
    dismissAfter: 10000
  }
];

const blNotifications = [
  {
    title: "Hi",
    message: "I am Teddy. I live at BOTTOM_LEFT",
    variant: "warning"
  },
  {
    title: "Hi",
    message: "I am Saif. I live at BOTTOM_LEFT",
    variant: "info",
    dismissAfter: 5000
  }
];

const brNotifications = [
  {
    title: "Hi",
    message: "I am Charles. I live at BOTTOM_RIGHT",
    variant: "danger"
  },
  {
    title: "Hi",
    message: "I am Claude. I live at BOTTOM_RIGHT",
    variant: "warning"
  }
];

storiesOf("Notifications", module).add("Default", () => {
  return (
    <div>
      <Notifications notifications={trNotifications} />
      <Notifications position="tl" notifications={tlNotifications} />
      <Notifications position="bl" notifications={blNotifications} />
      <Notifications position="br" notifications={brNotifications} />
    </div>
  );
});
