import { Title, Wrapper } from "./common";

import CollapsiblePanel from "../src/lib/components/collapsiblepanel/CollapsiblePanel.component";
//@flow
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

const items = ['banana', 'apple', 'grape'];

storiesOf("CollapsiblePanel", module)
  .add("Default", () => {
    return (
      <Wrapper className="storybook-chips">
        <Title>Colapsed</Title>
        <CollapsiblePanel
          node="Colapsed Panel"
          onHeaderClick={action("Expand panel")}
          children={items}
        />

        <Title>Expanded</Title>
        <CollapsiblePanel
          node="Expanded Panel"
          expanded
          onHeaderClick={action("Colapse panel")}
          children={items}
          onClick={action("Clickable Item")}
        />
      </Wrapper>
    );
  });
