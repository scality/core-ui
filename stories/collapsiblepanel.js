//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import CollapsiblePanel from "../src/lib/components/collapsiblepanel/CollapsiblePanel.component";

storiesOf("CollapsiblePanel", module)
  .add("Default", () => {
    return (
      <div>
          <CollapsiblePanel />
      </div>
    );
  });
