//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Input from "../src/lib/components/input/Input.component";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";

const ExampleInput = () => {
  const CustomInput = styled.div`
    .sc-input-error {
      width: 200px;
    }
  `;

  return (
    <div>
      <h3>Input without label</h3>
      <Input
        id="id1"
        value="value"
        onChange={action("onChange")}
        data-cy="default_input"
      />
      <h3>Input with label</h3>
      <Input
        id="id2"
        label="label"
        value="value"
        onChange={action("onChange")}
      />
      <h3>Input with error</h3>
      <Input
        id="id3"
        label="label"
        value="value"
        error="error"
        onChange={action("onChange")}
      />
      <h3>Input with long error</h3>
      <CustomInput>
        <Input
          id="id3"
          label="label"
          value="value"
          error="long error error error error error error error error error"
          onChange={action("onChange")}
        />
      </CustomInput>

      <h3>Checkbox Input</h3>
      <Input
        id="id4"
        label="label"
        value="value"
        onChange={action("onChange")}
        type="checkbox"
      />
      <h3>Checkbox Input with error</h3>
      <Input
        id="id5"
        label="label"
        value="value"
        onChange={action("onChange")}
        type="checkbox"
        error="error"
      />
    </div>
  );
};

storiesOf("Input", module).add("Default", () => {
  return <ExampleInput />;
});
