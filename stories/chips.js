//@flow
import Chips from "../src/lib/components/chips/Chips.component";
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

storiesOf("Chips", module).add("Default", () => {
  return (
    <div className="storybook-chips">
      <h3>Basic Chip</h3>
      <Chips text="Basic Chip" variant="primary" />
      <Chips text="Basic Chip" variant="base" />
      <Chips text="Basic Chip" variant="success" />
      <Chips text="Basic Chip" variant="warning" />
      <Chips text="Basic Chip" variant="danger" />

      <h3>Clickable Chip</h3>
      <Chips
        text="Clickable Chip"
        icon={<i className="fas fa-star" />}
        variant="primary"
        onClick={action("Clickable Chip")}
      />
      <Chips
        text="Clickable Chip"
        icon={<i className="fas fa-star" />}
        variant="base"
        onClick={action("Clickable Chip")}
      />
      <Chips
        text="Clickable Chip"
        icon={<i className="fas fa-star" />}
        variant="success"
        onClick={action("Clickable Chip")}
      />
      <Chips
        text="Clickable Chip"
        icon={<i className="fas fa-star" />}
        variant="warning"
        onClick={action("Clickable Chip")}
      />
      <Chips
        text="Clickable Chip"
        icon={<i className="fas fa-star" />}
        variant="danger"
        onClick={action("Clickable Chip")}
      />

      <h3>Deletable Chip</h3>
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant="primary"
        onRemove={action("Deletable Chip")}
      />
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant="base"
        onRemove={action("Deletable Chip")}
      />
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant="success"
        onRemove={action("Deletable Chip")}
      />
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant="warning"
        onRemove={action("Deletable Chip")}
      />
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant="danger"
        onRemove={action("Deletable Chip")}
      />

      <h3>Different sizes</h3>
      <Chips
        text="Smaller"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant="primary"
        onRemove={action("Deletable Chip")}
        size="smaller"
      />
      <Chips
        text="Small"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant="base"
        onRemove={action("Deletable Chip")}
        size="small"
      />
      <Chips
        text="Large"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant="success"
        onRemove={action("Deletable Chip")}
        size="large"
      />
      <Chips
        text="Larger"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant="warning"
        onRemove={action("Deletable Chip")}
        size="larger"
      />
    </div>
  );
});
