import React, { useState } from 'react';
import { Checkbox } from '../../src/lib/components/checkbox/Checkbox.component';
import { Toggle } from '../../src/lib/components/toggle/Toggle.component';
import { RadioGroup } from '../../src/lib/components/radio/RadioGroup.component';
import { Select } from '../../src/lib/components/selectv2/Selectv2.component';

export default {
  title: 'Guidelines/SelectionControlsOverview',
  tags: ['!dev', '!autodocs'],
};

export const Overview = {
  render: () => {
    const [checked, setChecked] = useState(true);
    const [toggle, setToggle] = useState(false);
    const [radio, setRadio] = useState('governance');
    const [select, setSelect] = useState<string | undefined>(undefined);

    const labelStyle: React.CSSProperties = {
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      opacity: 0.5,
      marginBottom: '0.75rem',
    };

    return (
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', paddingTop: '1.5rem', minHeight: '220px' }}>
        <div>
          <div style={labelStyle}>Checkbox</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Enable versioning</span>
            <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          </div>
        </div>
        <div>
          <div style={labelStyle}>Toggle</div>
          <Toggle name="overview-toggle" toggle={toggle} label="List versions" onChange={() => setToggle(!toggle)} />
        </div>
        <div>
          <div style={labelStyle}>Radio</div>
          <RadioGroup
            name="overview-radio"
            aria-label="Radio"
            value={radio}
            onChange={setRadio}
            options={[
              { value: 'governance', label: 'Governance' },
              { value: 'compliance', label: 'Compliance' },
            ]}
          />
        </div>
        <div>
          <div style={labelStyle}>Select</div>
          <Select id="overview-select" placeholder="Select an option" value={select} onChange={(v) => setSelect(v as string)}>
            <Select.Option value="a">Option A</Select.Option>
            <Select.Option value="b">Option B</Select.Option>
            <Select.Option value="c">Option C</Select.Option>
            <Select.Option value="d">Option D</Select.Option>
            <Select.Option value="e">Option E</Select.Option>
          </Select>
        </div>
      </div>
    );
  },
};
