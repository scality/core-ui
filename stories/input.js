//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Input from "../src/lib/components/input/Input.component";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import { Wrapper, Title } from "./common";

const options = Array.from(new Array(1000), (_, index) => ({
  label: `Item ${index}`,
  value: index,
  "data-cy": `Item_${index}`
}));

const ExampleInput = () => {
  const CustomInput = styled.div`
    .sc-input-error {
      width: 200px;
    }
  `;

  return (
    <Wrapper>
      <Title>Input without label</Title>
      <Input
        id="id1"
        value="value"
        onChange={action("onChange")}
        data-cy="default_input"
      />
      <Title>Input with label</Title>
      <Input
        id="id2"
        label="label"
        value="value"
        onChange={action("onChange")}
      />
      <Title>Input with error</Title>
      <Input
        id="id3"
        label="label"
        value="value"
        error="error"
        onChange={action("onChange")}
      />
      <Title>Input with long error</Title>
      <CustomInput>
        <Input
          id="id3"
          label="label"
          value="value"
          error="long error error error error error error error error error"
          onChange={action("onChange")}
        />
      </CustomInput>

      <Title>Checkbox Input</Title>
      <Input
        id="id4"
        label="label"
        value="value"
        onChange={action("onChange")}
        type="checkbox"
      />
      <Title>Checkbox Input with error</Title>
      <Input
        id="id5"
        label="label"
        value="value"
        onChange={action("onChange")}
        type="checkbox"
        error="error"
      />
      <Title>Select Input</Title>
      <Input
        id="id6"
        label="label"
        onChange={action("onChange")}
        type="select"
        options={options}
        placeholder="Select an item..."
        noOptionsMessage={() => "Not found"}
        value={options[0]}
      />
    </Wrapper>
  );
};

storiesOf("Input", module).add("Default", () => {
  return <ExampleInput />;
});
