//@flow
import React from "react";
import Dropdown from "../src/lib/components/dropdown/Dropdown.component";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Wrapper, Title } from "./common";

const items = [
  {
    label: "About",
    onClick: action("About clicked"),
    "data-cy": "About",
  },
  {
    label: "Documentation",
    onClick: action("Documentation clicked"),
    "data-cy": "Documentation",
  },
  {
    label: "Onboarding",
    onClick: action("Onboarding clicked"),
    "data-cy": "Onboarding",
  },
];

storiesOf("Dropdown", module).add("Default", () => {
  return (
    <Wrapper className="storybook-dropdown">
      <Title>Dropdown with text/icon</Title>
      <Dropdown
        text="Help"
        icon={<i className="fas fa-star" />}
        items={items}
        size="smaller"
      />
      <Dropdown
        text="Help"
        icon={<i className="fas fa-star" />}
        items={items}
        size="small"
      />
      <Dropdown
        text="Help"
        icon={<i className="fas fa-star" />}
        items={items}
      />
      <Dropdown
        text="Help"
        icon={<i className="fas fa-star" />}
        items={items}
        size="large"
      />
      <Dropdown
        text="Help"
        icon={<i className="fas fa-star" />}
        items={items}
        size="larger"
      />

      <Title>Dropdown with icon</Title>
      <Dropdown
        icon={<i className="fas fa-star" />}
        items={items}
        caret={false}
      />

      <Title>Dropdown with text</Title>
      <Dropdown text="Help" items={items} />

      <Title>Dropdown with variant</Title>
      <Dropdown
        icon={<i className="fas fa-star" />}
        items={items}
        variant="base"
        text="primary"
      />
      <Dropdown
        icon={<i className="fas fa-star" />}
        items={items}
        variant="secondary"
        text="secondary"
      />
      <Dropdown
        icon={<i className="fas fa-star" />}
        items={items}
        variant="healthy"
        text="healthy"
      />
      <Dropdown
        icon={<i className="fas fa-star" />}
        items={items}
        variant="warning"
        text="warning"
      />
      <Dropdown
        icon={<i className="fas fa-star" />}
        items={items}
        variant="critical"
        text="critical"
      />
    </Wrapper>
  );
});
