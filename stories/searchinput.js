//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import SearchInput from "../src/lib/components/searchinput/SearchInput.component";

storiesOf("SearchInput", module).add("Default", () => {
  return (
    <div>
      <h3>Default</h3>
      <div style={{ width: "250px" }}>
        <SearchInput
          value=""
          placeholder="Search server..."
          onChange={action("on input change")}
          onReset={action("on input reset")}
          disableToggle={false}
        />
      </div>
      <h3>Search Input filled</h3>
      <div style={{ width: "250px" }}>
        <SearchInput
          value="carlito"
          onChange={action("on input change")}
          onReset={action("on input reset")}
          disableToggle={false}
          data-cy="carlito_searchinput"
        />
      </div>
      <h3>Disable the default toggle</h3>
      <div style={{ width: "250px" }}>
        <SearchInput
          value=""
          placeholder="Search and Filter…"
          onChange={action("on input change")}
          onReset={action("on input reset")}
          disableToggle={true}
        />
      </div>
      <h3>Disable the default toggle undefined onReset action</h3>
      <div style={{ width: "250px" }}>
        <SearchInput
          value=""
          placeholder="Search and Filter…"
          onChange={action("on input change")}
          disableToggle={true}
        />
      </div>
    </div>
  );
});
