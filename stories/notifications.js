// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Notifications from "../src/lib/components/notifications/Notifications.component";
import { jade } from "../src/lib/style/theme";

const trNotifications = [
  {
    title: "Hi",
    message: "I am Carlito. I live at TOP_RIGHT"
  },
  {
    title: "Hi",
    message: "I am Patrick. I live at TOP_RIGHT"
  }
];

const tlNotifications = [
  {
    title: "Hi",
    message: "I am Jordi. I live at TOP_LEFT"
  },
  {
    title: "Hi",
    message: "I am Guillaume. I live at TOP_LEFT"
  }
];

const blNotifications = [
  {
    title: "Hi",
    message: "I am Teddy. I live at BOTTOM_LEFT"
  },
  {
    title: "Hi",
    message: "I am Saif. I live at BOTTOM_LEFT"
  }
];

const brNotifications = [
  {
    title: "Hi",
    message: "I am Charles. I live at BOTTOM_RIGHT"
  },
  {
    title: "Hi",
    message: "I am Claude. I live at BOTTOM_RIGHT"
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
