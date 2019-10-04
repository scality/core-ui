import MultiSelect from "../src/lib/components/multiselect/MultiSelect.component";
//@flow
import React from "react";
import { storiesOf } from "@storybook/react";

const twoOptions = [
  {
    checked: false, 
    label: 'Amazon', 
    content: 'AWS'
  },
  {
    checked: false, 
    label: 'Wallmart', 
    content: 'WM'
  }
]

storiesOf("MultiSelect", module).add("Default", () => {
  return (
    <div>
      <h3>Two options</h3>
      <MultiSelect 
        options={twoOptions}
        title='Destination Locations'
        labelCheckBox='Preferred'
        width='500px'
        newOption={
          {
            title: {
              value: '',
              placeholder: 'Content of option'
            },
            label: {
              value: '',
              placeholder: 'Label of option'
            }
          }
        }
        currentInput='title'
      />
      <h3>One option</h3>
      <MultiSelect 
        options={[twoOptions[0]]}
        title={'Destination Locations'}
        labelCheckBox={'Preferred'}
        width='500px'
        newOption={
          {
            title: {
              value: '',
              placeholder: 'Content of option'
            },
            label: {
              value: '',
              placeholder: 'Label of option'
            }
          }
        }
        currentInput='title'
      />
      <h3>No options</h3>
      <MultiSelect 
        options={[]}
        title={'Destination Locations'}
        labelCheckBox={'Preferred'}
        width='500px'
        newOption={
          {
            title: {
              value: '',
              placeholder: 'Content of option'
            },
            label: {
              value: '',
              placeholder: 'Label of option'
            }
          }
        }
        currentInput='title'
      />
    </div>
  );
});
