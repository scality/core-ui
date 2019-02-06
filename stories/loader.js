import React from "react";
import Loader from "../src/lib/components/loader/Loader.component";
import withPropsCombinations from "react-storybook-addon-props-combinations";
import { ThemeProvider } from "styled-components";
import { withKnobs, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import { hotPink } from "../src/lib/style/theme";

storiesOf("Loader", module)
  .addDecorator(withKnobs)
  .add("ThemeProvider", () => {
    const theme = {
      brand: {
        primary: hotPink
      }
    };

    return (
      <div>
        <h3>Default</h3>

        <Loader>Loading...</Loader>

        <ThemeProvider theme={theme}>
          <div>
            <h3>Button With ThemeProvider</h3>

            <Loader>Loading...</Loader>
          </div>
        </ThemeProvider>
      </div>
    );
  })
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
