import React from "react";
import Loader from "../src/lib/components/loader/Loader.component";
import withPropsCombinations from "react-storybook-addon-props-combinations";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

storiesOf("Loader", module)
  .addDecorator(withKnobs)
  .add(
    "Combinations",
    withPropsCombinations(Loader, {
      customized: [false, true],
      color: [undefined, "#00B2A9"],
      size: ["small", "medium", "large"]
    })
  )
  .add("With dynamic props", () => {
    const size = text("Size", "medium");
    const color = text("Color", "#00B2A9");
    const customized = boolean("Customized", true);

    return <Loader customized={customized} color={color} size={size} />;
  });
