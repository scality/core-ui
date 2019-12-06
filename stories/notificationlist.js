//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import NotificationList from "../src/lib/components/notificationlist/NotificationList.component";
import { Wrapper, Title } from "./common";

const notifications = [
  {
    important: false,
    text: 'First notification!'
  },
  {
    important: false,
    text: 'Second notification!'
  },
  {
    important: true,
    text: 'Third notification (important)!'
  },
];

storiesOf("NotificationList", module).add("Default", () => {
  return (
    <Wrapper>
      <div style={{ width: "200px" }}>
        <Title>Smaller</Title>
        <NotificationList
          notifications={notifications}
        />
      </div>
      <div style={{ width: "500px" }}>
        <Title>Small</Title>
        <NotificationList
          notifications={notifications}
          fontSize="30px"
        />
      </div>
      <div style={{ width: "800px" }}>
        <Title>Big</Title>
        <NotificationList
          notifications={notifications}
          fontSize="15px"
          borderColor="#027ac5"
          fontColor="#bbbbbb"
        />
      </div>
    </Wrapper>
  );
});
