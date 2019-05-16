// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Notifications from "../src/lib/components/notifications/Notifications.component";
import { jade } from "../src/lib/style/theme";

const notifications = [
  {
    title: "Hi",
    message: "I am Charles"
  },
  {
    title: "Hi",
    message: "I am Patrick"
  }
];
storiesOf("Notifications", module)
  .add("Default", () => {
    return (
      <div>
        <Notifications position="tr" notifications={notifications} />
      </div>
    );
  })
  .add("ThemeProvider", () => {
    const theme = {
      brand: {
        primary: jade
      }
    };
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div>
            <Notifications position="tr" notifications={notifications} />
          </div>
        </ThemeProvider>
      </div>
    );
  });
