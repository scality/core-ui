//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Toggle from "../src/lib/components/toggle/Toggle.component";
import { Wrapper } from "./common";

storiesOf("Toggle", module).add("Default", () => {
  return (
    <Wrapper>
      <Toggle
        label="Airplane Mode"
        onChange={action("toggle clicked")}
        toggle={false}
        name="toggle"
        data-cy="default_toggle"
      />
      <Toggle
        label="Airplane Mode"
        onChange={action("toggle clicked")}
        toggle={true}
        name="toggle"
        data-cy="custom_toggle"
      />
    </Wrapper>
  );
});
