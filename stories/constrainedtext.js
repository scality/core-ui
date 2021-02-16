//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Constrainedtext from "../src/lib/components/constrainedtext/Constrainedtext.component";
import { Wrapper, Title } from "./common";

storiesOf("Constrainedtext", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>Constrained Text</Title>
      <div
        style={{
          width: "100px",
          color: "#0F7FFF",
        }}
      >
        <Constrainedtext
          text={"This is a long phrase"}
          tooltipStyle={{ width: "100px" }}
        />
      </div>
      <Title>With the ability to customize the style of tooltip</Title>
      <div
        style={{
          width: "100px",
          color: "#0F7FFF",
        }}
      >
        <Constrainedtext
          text={"This is a long phrase"}
          tooltipStyle={{ width: "100px" }}
          tooltipPlacement="right"
        />
      </div>
    </Wrapper>
  );
});
