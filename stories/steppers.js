import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Steppers from "../src/lib/components/steppers/Steppers.component";
import { action } from "@storybook/addon-actions";
import { hotPink } from "../src/lib/style/theme";
import Button from "../src/lib/components/button/Button.component";

const steps = [
  {
    title: "Node Registerd",
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action("Button Apply Click")}
      />
    )
  },
  {
    title: "Deploy Salt Minion on node",
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action("Button Apply Click")}
      />
    )
  },
  {
    title: "Add node to Workload Plane",
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action("Button Apply Click")}
      />
    )
  },
  {
    title: "Add node to Control Plane",
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action("Button Apply Click")}
      />
    )
  },
  {
    title: "Extend etcd cluster to node",
    content: (
      <Button
        size="small"
        text="Apply"
        onClick={action("Button Apply Click")}
      />
    )
  }
];

storiesOf("Steppers", module)
  .add("Default", () => {
    return (
      <div>
        <Steppers steps={steps} activeStep={1} />
      </div>
    );
  })
  .add("ThemeProvider", () => {
    const theme = {
      brand: {
        primary: hotPink
      }
    };
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div>
            <div>
              <Steppers steps={steps} activeStep={2} />
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  });
