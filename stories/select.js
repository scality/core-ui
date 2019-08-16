import React from "react";
import { storiesOf } from "@storybook/react";
import Select from "../src/lib/components/select/Select.component";

const options = Array.from(new Array(1000), (_, index) => ({
  label: `Item ${index}`,
  value: index
}));

storiesOf("Select", module).add("Default", () => {
  return (
    <div>
      <h3>Default</h3>
      <div style={{ width: "200px" }}>
        <Select
          name="default_select"
          options={options}
          onChange={e => console.log(e)}
          placeholder="Select an item..."
          noResultsText="Not found"
          value={options[0]}
        />
      </div>
      <h3>Multi Select</h3>
      <div style={{ width: "400px" }}>
        <Select
          name="multi_select"
          options={options}
          onChange={e => console.log(e)}
          placeholder="Select an item..."
          noResultsText="Not found"
          multi={true}
          value={[options[0], options[1]]}
        />
      </div>
    </div>
  );
});
