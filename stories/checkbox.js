// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Checkbox from "../src/lib/components/checkbox/Checkbox.component";
import { Wrapper, Title } from "./common";

storiesOf("Checkbox", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>Checkbox checked</Title>
      <Checkbox
        checked={true}
        label="interested?"
        onChange={action("checkbox clicked")}
        data-cy="checked_checkbox"
      />
      <Title>Checkbox unchecked</Title>
      <Checkbox
        checked={false}
        label="interested?"
        onChange={action("checkbox clicked")}
      />
      <Title>Checkbox disabled</Title>
      <Checkbox
        checked={false}
        disabled={true}
        label="interested?"
        onChange={action("checkbox clicked")}
      />
    </Wrapper>
  );
});
