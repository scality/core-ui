import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { action } from "@storybook/addon-actions";
import SearchInput from "../src/lib/components/searchinput/SearchInput.component";
import { jade } from "../src/lib/style/theme";

storiesOf("SearchInput", module)
  .add("Default", () => {
    return (
      <div>
        <h3>Default</h3>
        <div style={{ width: "250px" }}>
          <SearchInput
            value=""
            placeholder="Search server..."
            onChange={action("on input change")}
            onReset={action("on input reset")}
          />
        </div>
        <h3>Search Input filled</h3>
        <div style={{ width: "250px" }}>
          <SearchInput
            value="carlito"
            onChange={action("on input change")}
            onReset={action("on input reset")}
          />
        </div>
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
          <div style={{ width: "250px" }}>
            <SearchInput
              value=""
              placeholder="Search server..."
              onChange={action("on input change")}
              onReset={action("on input reset")}
            />
          </div>
        </ThemeProvider>
      </div>
    );
  });
