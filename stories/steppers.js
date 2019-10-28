//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Steppers from "../src/lib/components/steppers/Steppers.component";
import { action } from "@storybook/addon-actions";
import Button from "../src/lib/components/button/Button.component";
import { Wrapper } from "./common";

const steps = [
  {
    title: "Node Registerd",
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action("Button Apply Click")}
      />
    ),
    "data-cy": "Node_Registerd"
  },
  {
    title: "Deploy Salt Minion on node",
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action("Button Apply Click")}
      />
    ),
    "data-cy": "Deploy_Salt"
  },
  {
    title: "Add node to Workload Plane",
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action("Button Apply Click")}
      />
    ),
    "data-cy": "Add_Node_WP"
  },
  {
    title: "Add node to Control Plane",
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action("Button Apply Click")}
      />
    ),
    "data-cy": "Add_Node_CP"
  },
  {
    title: "Extend etcd cluster to node",
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action("Button Apply Click")}
      />
    ),
    "data-cy": "Extend_Node"
  }
];

storiesOf("Steppers", module).add("Default", () => {
  return (
    <Wrapper>
      <Steppers steps={steps} activeStep={1} />
    </Wrapper>
  );
});
