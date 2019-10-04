import Chips from "../src/lib/components/chips/Chips.component";
//@flow
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

storiesOf("Chips", module).add("Default", () => {
  return (
    <div className="storybook-chips">
      <h3>Basic Chip</h3>
      <Chips text="Basic Chip" variant={"primary"} />
      <Chips text="Basic Chip" variant={"base"} />
      <Chips text="Basic Chip" variant={"success"} />
      <Chips text="Basic Chip" variant={"warning"} />
      <Chips text="Basic Chip" variant={"danger"} />

      <h3>Clicable Chip</h3>
      <Chips
        text="Clicable Chip"
        icon={<i className="fas fa-star" />}
        variant={"primary"}
        onClick={action("Clicable Chip")}
      />
      <Chips
        text="Clicable Chip"
        icon={<i className="fas fa-star" />}
        variant={"base"}
        onClick={action("Clicable Chip")}
      />
      <Chips
        text="Clicable Chip"
        icon={<i className="fas fa-star" />}
        variant={"success"}
        onClick={action("Clicable Chip")}
      />
      <Chips
        text="Clicable Chip"
        icon={<i className="fas fa-star" />}
        variant={"warning"}
        onClick={action("Clicable Chip")}
      />
      <Chips
        text="Clicable Chip"
        icon={<i className="fas fa-star" />}
        variant={"danger"}
        onClick={action("Clicable Chip")}
      />

      <h3>Deletable Chip</h3>
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant={"primary"}
        onClick={action("Deletable Chip")}
      />
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant={"base"}
        onClick={action("Deletable Chip")}
      />
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant={"success"}
        onClick={action("Deletable Chip")}
      />
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant={"warning"}
        onClick={action("Deletable Chip")}
      />
      <Chips
        text="Deletable"
        icon={<i className="fas fa-star" />}
        buttonIcon={<i className="fas fa-times" />}
        variant={"danger"}
        onClick={action("Deletable Chip")}
      />
    </div>
  );
});
