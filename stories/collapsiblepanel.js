//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Title, Wrapper } from "./common";
import CollapsiblePanel from "../src/lib/components/collapsiblepanel/CollapsiblePanel.component";

const items = ['Text', 'apple', 'grape'];

storiesOf("CollapsiblePanel", module)
  .add("Default", () => {
    return (
      <Wrapper className="storybook-chips">
        <Title>Colapsed</Title>
        <CollapsiblePanel
          node={items}
          onHeaderClick={action("Expand panel")}
          children="orange"
        />

        <Title>Expanded</Title>
        <CollapsiblePanel
          node={items}
          expanded
          onHeaderClick={action("Colapse panel")}
          children="orange"
        />
      </Wrapper>
    );
  });
