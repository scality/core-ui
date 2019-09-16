//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Select from "../src/lib/components/select/Select.component";

const options = Array.from(new Array(1000), (_, index) => ({
  label: `Item ${index}`,
  value: index
}));

const customOptionRenderer = ({
  focusedOption,
  focusOption,
  key,
  labelKey,
  option,
  selectValue,
  style,
  valueArray
}) => {
  const classNames = ["sc-select-option", "VirtualizedSelectOption"];
  const { disabled, className, title, ...rest } = option;

  if (option === focusedOption) {
    classNames.push("VirtualizedSelectFocusedOption");
  }

  if (disabled) {
    classNames.push("VirtualizedSelectDisabledOption");
  }

  if (valueArray && valueArray.indexOf(option) >= 0) {
    classNames.push("VirtualizedSelectSelectedOption");
  }

  if (className) {
    classNames.push(className);
  }

  const events = disabled
    ? {}
    : {
        onClick: () => selectValue(option),
        onMouseEnter: () => focusOption(option)
      };

  return (
    <div
      className={classNames.join(" ")}
      key={key}
      style={style}
      title={title}
      {...events}
      {...rest}
    >
      {option[labelKey]}&nbsp;
      {option.value % 2 === 0 ? <i className="fas fa-flag-usa"></i> : null}
    </div>
  );
};

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
          noOptionsMessage={() => "Not found"}
          value=""
        />
      </div>
      <h3>Default with custom optionRenderer</h3>
      <div style={{ width: "200px" }}>
        <Select
          name="default_select"
          options={options}
          onChange={e => console.log(e)}
          placeholder="Select an item..."
          noOptionsMessage={() => "Not found"}
          value={options[0]}
          optionRenderer={customOptionRenderer}
        />
      </div>
      <h3>Multi Select</h3>
      <div style={{ width: "400px" }}>
        <Select
          name="multi_select"
          options={options}
          onChange={e => console.log(e)}
          placeholder="Select an item..."
          noOptionsMessage={() => "Not found"}
          isMulti={true}
          value={[options[0], options[1]]}
        />
      </div>
    </div>
  );
});
