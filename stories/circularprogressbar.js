//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import CircularProgressBar from "../src/lib/components/circularprogressbar/CircularProgressBar.component";
import { Wrapper, Title, Text } from "./common";

storiesOf("CircularProgressBar", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>With Default Color</Title>
      <CircularProgressBar title="Total Capacity" radius={70} percent={60}>
        <Text
          className="sc-circularprogressbar-text"
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          60% used
        </Text>
      </CircularProgressBar>
      <Title>With Custom Color</Title>
      <CircularProgressBar
        color="#00ff43"
        title="Total Capacity"
        radius={50}
        percent={90}
      >
        <Text
          className="sc-circularprogressbar-text"
          x="50%"
          y="45%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "15px", fontWeight: "700" }}
        >
          4.9 PB
        </Text>
        <Text
          className="sc-circularprogressbar-text"
          x="50%"
          y="60%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          used
        </Text>
      </CircularProgressBar>
    </Wrapper>
  );
});
