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
    onSelect: action("onSelect clicked"),
    onFavoriteClick: action("onFavoriteClick clicked")
  },
  {
    selected: false,
    isFavorite: false,
    label: "WM",
    description: "Walmart",
    onSelect: action("onSelect clicked"),
    onFavoriteClick: action("onFavoriteClick clicked")
  }
];

const itemsWithoutFavourite = [
  {
    selected: true,
    label: "AWS",
    description: "Amazon",
    onSelect: action("onSelect clicked")
  },
  {
    selected: false,
    label: "WM",
    description: "Walmart",
    onSelect: action("onSelect clicked")
  }
];

const itemsWithoutCheckboxFavourite = [
  {
    label: "AWS",
    description: "Amazon"
  },
  {
    label: "WM",
    description: "Walmart"
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
          onItemRemove={action("onItemRemove clicked")}
        />
      </div>
      <h3>MultiSelect List without search</h3>
      <div className="storybook-mutiselect-container">
        <MultiSelect
          title="Destination Locations"
          items={items}
          onItemRemove={action("onItemRemove clicked")}
        />
      </div>
      <h3>MultiSelect List without Favourite</h3>
      <div className="storybook-mutiselect-container">
        <MultiSelect
          title="Destination Locations"
          items={itemsWithoutFavourite}
          search={search}
          onItemRemove={action("onItemRemove clicked")}
        />
      </div>
      <h3>MultiSelect List without Favourite and Selectbox</h3>
      <div className="storybook-mutiselect-container">
        <MultiSelect
          title="Destination Locations"
          items={itemsWithoutCheckboxFavourite}
          search={search}
          onItemRemove={action("onItemRemove clicked")}
        />
      </div>
      <h3>MultiSelect List without Remove Button, Favourite and Selectbox</h3>
      <div className="storybook-mutiselect-container">
        <MultiSelect
          title="Destination Locations"
          items={itemsWithoutCheckboxFavourite}
          search={search}
        />
      </div>
      <h3>
        MultiSelect List without Title, Remove Button, Favourite and Selectbox
      </h3>
      <div className="storybook-mutiselect-container">
        <MultiSelect items={itemsWithoutCheckboxFavourite} search={search} />
      </div>
    </div>
  );
});
