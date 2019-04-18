import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { action } from "@storybook/addon-actions";
import Toggle from "../src/lib/components/toggle/Toggle.component";
import { jade } from "../src/lib/style/theme";

storiesOf("Toggle", module)
  .add("Default", () => {
    return (
      <div>
        <Toggle
          label="Airplane Mode"
          onChange={action("toggle clicked")}
          toggle={false}
          name="toggle"
        />
        <Toggle
          label="Airplane Mode"
          onChange={action("toggle clicked")}
          toggle={true}
          name="toggle"
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
            <Toggle
              label="Airplane Mode"
              onChange={action("toggle clicked")}
              toggle={false}
            />
            <Toggle
              label="Airplane Mode"
              onChange={action("toggle clicked")}
              toggle={true}
            />
          </div>
        </ThemeProvider>
      </div>
    );
  });
