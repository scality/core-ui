import React from "react";
import Dropdown from "../src/lib/components/dropdown/Dropdown.component";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

const items = [
  { label: "About", onClick: action("About clicked") },
  {
    label: "Documentation",
    onClick: action("Documentation clicked")
  },
  {
    label: "Onboarding",
    onClick: action("Onboarding clicked")
  }
];

storiesOf("Dropdown", module).add("Default", () => {
  return (
    <div className="storybook-dropdown">
      <h3>Dropdown with text/icon</h3>
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

      <h3>Dropdown with icon</h3>
      <Dropdown
        icon={<i className="fas fa-star" />}
        items={items}
        caret={false}
      />

      <h3>Dropdown with text</h3>
      <Dropdown text="Help" items={items} />

      <h3>Dropdown with variant</h3>
      <Dropdown
        icon={<i className="fas fa-star" />}
        items={items}
        variant="primary"
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
        variant="success"
        text="success"
      />
      <Dropdown
        icon={<i className="fas fa-star" />}
        items={items}
        variant="info"
        text="info"
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
        variant="danger"
        text="danger"
      />
    </div>
  );
});
