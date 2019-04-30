// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Checkbox from "../src/lib/components/checkbox/Checkbox.component";

storiesOf("Checkbox", module).add("Default", () => {
  return (
    <div>
      <h3>Checkbox checked</h3>
      <Checkbox
        checked={true}
        label="interested?"
        onChange={action("checkbox clicked")}
      />
      <h3>Checkbox unchecked</h3>
      <Checkbox
        checked={false}
        label="interested?"
        onChange={action("checkbox clicked")}
      />
      <h3>Checkbox disabled</h3>
      <Checkbox
        checked={false}
        disabled={true}
        label="interested?"
        onChange={action("checkbox clicked")}
      />
    </div>
  );
});
