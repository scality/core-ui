//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import CircularProgressBar from "../src/lib/components/circularprogressbar/CircularProgressBar.component";
import { Wrapper, Title } from "./common";

storiesOf("CircularProgressBar", module)
  .add("Default", () => {
    return (
      <Wrapper>
        <Title>With Custom Color</Title>
          <CircularProgressBar color="#00ff43" title="Total Capacity" label="used" percent={90}/>
        <Title>With Default Color</Title>
          <CircularProgressBar title="Total Capacity" label="used" percent={60}/>
          <CircularProgressBar title="Total Capacity" label="used" percent={30}/>
      </Wrapper>
    );
  });
