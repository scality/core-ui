//@flow
import Chips from "../src/lib/components/chips/Chips.component";
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Wrapper, Title } from "./common";

storiesOf("Chips", module).add("Default", () => {
  return (
    <Wrapper className="storybook-chips">
      <Title>Basic Chip</Title>
      <Chips text="Basic Chip" variant="base" />
      <Chips text="Basic Chip" variant="healthy" />
      <Chips text="Basic Chip" variant="warning" />
      <Chips text="Basic Chip" variant="danger" />

      <Title>Clickable Chip</Title>
      <Chips
        text="Clickable Chip"
        icon={<i className="fas fa-star" />}
        variant="base"
        onClick={action("Clickable Chip")}
      />
      <Chips
        text="Clickable Chip"
        icon={<i className="fas fa-star" />}
        variant="healthy"
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

      <Title>Deletable Chip</Title>
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        variant="base"
        onRemove={action("Deletable Chip")}
      />
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        variant="healthy"
        onRemove={action("Deletable Chip")}
      />
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        variant="warning"
        onRemove={action("Deletable Chip")}
      />
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        variant="danger"
        onRemove={action("Deletable Chip")}
      />

      <Title>Different sizes</Title>
      <Chips
        text="Smaller"
        icon={<i className="fas fa-star" />}
        variant="base"
        onRemove={action("Deletable Chip")}
        size="smaller"
      />
      <Chips
        text="Small"
        icon={<i className="fas fa-star" />}
        variant="base"
        onRemove={action("Deletable Chip")}
        size="small"
      />
      <Chips
        text="Base"
        icon={<i className="fas fa-star" />}
        variant="warning"
        onRemove={action("Deletable Chip")}
        size="base"
      />
      <Chips
        text="Large"
        icon={<i className="fas fa-star" />}
        variant="healthy"
        onRemove={action("Deletable Chip")}
        size="large"
      />
      <Chips
        text="Larger"
        icon={<i className="fas fa-star" />}
        variant="warning"
        onRemove={action("Deletable Chip")}
        size="larger"
      />
    </Wrapper>
  );
});
