//@flow
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Title, Wrapper } from "./common";
import CollapsiblePanel from "../src/lib/components/collapsiblepanel/CollapsiblePanel.component";


const items = ['banana', 'apple', 'grape'];

storiesOf("CollapsiblePanel", module)
  .add("Default", () => {
    return (
      <Wrapper className="storybook-collapsiblepanel">
        <Title>Colapsed</Title>
        <CollapsiblePanel
          header={items}
          onHeaderClick={action("Expand panel")}
          children="orange"
        />

        <Title>Expanded</Title>
        <CollapsiblePanel
          header={items}
          expanded
          onHeaderClick={action("Colapse panel")}
          children="orange"
        />
      </Wrapper>
    );
  });
