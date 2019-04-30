//@flow
import React from "react";
import Loader from "../src/lib/components/loader/Loader.component";
import withPropsCombinations from "react-storybook-addon-props-combinations";
import { withKnobs, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

storiesOf("Loader", module)
  .addDecorator(withKnobs)
  .add(
    "Combinations",
    withPropsCombinations(Loader, {
      size: ["base", "large", "larger", "huge", "massive"]
    })
  )
  .add("With dynamic props", () => {
    const size = text("Size", "base");
    const content = text("Children", "Loading");

    return <Loader size={size}>{content}</Loader>;
  });
