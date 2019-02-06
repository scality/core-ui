import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ThemeProvider } from "styled-components";
import Checkbox from "../src/lib/components/checkbox/Checkbox.component";
import { jade } from "../src/lib/style/theme";

storiesOf("Checkbox", module)
  .add("Default", () => {
    return (
      <div>
        <h3>Checkbox checked</h3>
        <Checkbox
          checked={true}
          label="interested?"
          onChange={action("checkbox clicked")}
        />
        <h3>Checkbox unchecked</h3>
        <Checkbox
          checked={false}
          label="interested?"
          onChange={action("checkbox clicked")}
        />
        <h3>Checkbox disabled</h3>
        <Checkbox
          checked={false}
          disabled={true}
          label="interested?"
          onChange={action("checkbox clicked")}
        />
      </div>
    );
  })
  .add("ThemeProvider", () => {
    const theme = {
      brand: {
        primary: jade
      }
    };
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div>
            <h3>Checkbox checked</h3>
            <Checkbox
              checked={true}
              label="interested?"
              onChange={action("checkbox clicked")}
            />
            <h3>Checkbox unchecked</h3>
            <Checkbox
              checked={false}
              label="interested?"
              onChange={action("checkbox clicked")}
            />
            <h3>Checkbox disabled</h3>
            <Checkbox
              checked={false}
              disabled={true}
              label="interested?"
              onChange={action("checkbox clicked")}
            />
          </div>
        </ThemeProvider>
      </div>
    );
  });
