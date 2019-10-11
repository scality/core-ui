//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MultiSelect from "../src/lib/components/multiselect/MultiSelect.component";
import { action } from "@storybook/addon-actions";

const items = [
  {
    selected: true,
    isFavorite: true,
    label: "AWS",
    description: "Amazon",
    onRemove: action("onRemove clicked"),
    onSelect: action("onSelect clicked"),
    onFavoriteClick: action("onFavoriteClick clicked")
  },
  {
    selected: false,
    isFavorite: false,
    label: "WM",
    description: "Walmart",
    onRemove: action("onRemove clicked"),
    onSelect: action("onSelect clicked"),
    onFavoriteClick: action("onFavoriteClick clicked")
  }
];

const options = [
  {
    label: "Azure",
    value: "Azure"
  },
  {
    label: "S3",
    value: "S3"
  }
];
const search = {
  placeholder: "Select location to add",
  options: options,
  onSelect: action("onSelect clicked"),
  onAdd: action("onAdd clicked"),
  selectedOption: null
};

storiesOf("MultiSelect", module).add("Default", () => {
  return (
    <div>
      <h3>MultiSelect List</h3>
      <div className="storybook-mutiselect-container">
        <MultiSelect
          title="Destination Locations"
          items={items}
          search={search}
        />
      </div>
      <h3>MultiSelect List without search</h3>
      <div className="storybook-mutiselect-container">
        <MultiSelect title="Destination Locations" items={items} />
      </div>
    </div>
  );
});
