//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Emptystate from "../src/lib/components/emptystate/Emptystate.component";
import { Wrapper } from "./common";

storiesOf("Emptystate", module)
  .add("With Link", () => {
    return (
      <Wrapper>
        <Emptystate
          icon="fa-server"
          label="node"
          link=""
          history={{ push: () => {} }}
        />
      </Wrapper>
    );
  })
  .add("Without Link", () => {
    return (
      <Wrapper>
        <Emptystate icon="fa-server" label="node" />
      </Wrapper>
    );
  });
