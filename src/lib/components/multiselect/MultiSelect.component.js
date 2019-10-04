import React, { Component } from "react";
import styled, { css } from "styled-components";
import * as defaultTheme from "../../style/theme";
type MultiSelectProps = {
  options: Array<MultiSelectOption>,
  newOption: {
    label: {
      value: string,
      placeholder: string,
    },
    title: {
      value: string,
      placeholder: string,
    }
  },
  title: string,
  labelCheckBox: string,
  width: string,
};

type MultiSelectOptionProps = {
  marked?: boolean,
  label: string,
  content: string,
  onClick: () => void,
  onCheck: () => void
}

type MultiSelectFormProps = {
  value: string, 
  placeholder: string, 
  onChange:() => void, 
  onClick: () => void
}

const defaultProps = {
  options: [],
  title: '',
  labelCheckBox: '',
  width: '500px',
  newOption: {
    title: {
      value: '',
      placeholder: 'Content of option'
    },
    label: {
      value: '',
      placeholder: 'Label of option'
    },
  },
};

const MultiSelectContainer = styled.div`
  display: block;
  min-height: 50px;
  padding: ${defaultTheme.padding.small} ${defaultTheme.padding.base} ${defaultTheme.padding.small} ${defaultTheme.padding.base};
  
  ${props => {
    return css`
      width: ${props.width};
    `;
  }};

  .title-multi-select {
    color: ${defaultTheme.grayDarker};
    font-weight: ${defaultTheme.fontWeight.light};
    font-size: ${defaultTheme.fontSize.large};
    display: inline-block;
    width: 70%;
  }

  .label-checkbox-multi-select {
    color: ${defaultTheme.grayDarker};
    font-weight: ${defaultTheme.fontWeight.light};
    font-size: ${defaultTheme.fontSize.large};
    display: inline-block;
    width: 30%;
  }
`;

const BlockContainer = styled.div`
  display: block;
  width: 100%;
`;

const MultiSelectOptionContainer = styled.div`
  display: block;
  width: 100%;
  height: 33px;
  margin: 10px 0 10px 0;
`;

const MultiSelectContent = styled.div`
  display: inline-block;
  width: 70%;
  height: 100%;
  border: 1px solid ${defaultTheme.grayLight};
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: ease-in-out .2s;
  color: ${defaultTheme.grayDarker};
  
  &:hover {
    box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.4);
  }

  .content-title {
    font-size: ${defaultTheme.fontSize.base};
    font-weight: ${defaultTheme.fontWeight.semibold};
    margin: 0;
    position: absolute;
    left: 10px;
    top: 10px;
  }

  .content-label {
    font-size: ${defaultTheme.fontSize.small};
    font-weight: ${defaultTheme.fontWeight.light};
    margin: 0;
    position: absolute;
    right: 50px;
    top: 10px;
  }

  .remove-button {
    position: absolute;
    right: 10px;
    top: 6px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: ${defaultTheme.grayDarkest};
    opacity: 0.6;
    border: none;
    cursor: pointer;
    transition: ease-in-out .2s;
  }

  .remove-button:hover {
    opacity: 1;
  }

  .remove-button:focus {
    outline: 0;
  }
}
`;

const MultiSelectMark = styled.div`
  display: inline-block;
  width: 29%;
  height: 100%;
  position: relative;

  .checkbox {
    appearance: none;
    width: 13px;
    height: 13px;
    border-radius: 4px;
    position: absolute;
    left: 23px;
    top: 6px;
    border: 1px solid ${defaultTheme.grayDark};
    cursor: pointer;
    transition: ease-in-out .2s;
  }

  .checkbox:focus { 
    outline: 0;
  }

  .checkbox:checked {
    background: ${defaultTheme.black};
  }
`;

const RemoveIcon = styled.div`
  display: block;
  position: absolute;
  height: 2px;
  background: ${defaultTheme.white};
  width: 60%;
  transform: rotate(45deg);
  right: 4px;
  top: 9px;

  &:before {
    display: block;
    position: absolute;
    height: 2px;
    background: ${defaultTheme.white};
    width: 100%;
    transform: rotate(-90deg);
    right: 0px;
    top: 0px;
    content: '';
  }
`;

const AddIcon = styled.div`
  display: block;
  position: absolute;
  height: 2px;
  background: ${defaultTheme.white};
  width: 60%;
  transform: rotate(90deg);
  right: 4px;
  top: 9px;

  &:before {
    display: block;
    position: absolute;
    height: 2px;
    background: ${defaultTheme.white};
    width: 100%;
    transform: rotate(-90deg);
    right: 0px;
    top: 0px;
    content: '';
  }
`;

const MultiSelectFormContainer = styled.div`
  position: relative;
  display: block;
  width: 70%;
  height: 33px;

  .input {
    width: 88%;
    height: 100%;
    position: absolute;
    border-radius: 4px;
    transition: ease-in-out .2s;
    border: 1px solid ${defaultTheme.grayLight};
    padding: 0 0 0 43px;
    color: ${defaultTheme.grayDarker};
  }

  .input:focus {
    outline: none;
    border: 1px solid ${defaultTheme.blueLight};
  }

  .add-button {
    position: absolute;
    left: 10px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: #2F3941;
    border: none;
    top: 6px;
    cursor: pointer;
  }

  .add-button:focus {
    padding: 0;
    border: none;
    outline: 0;
  }
`;

function MultiSelectOption(props: MultiSelectOptionProps) {
  const { checked, label, content, onClick, onCheck } = props;

  return (
    <MultiSelectOptionContainer>
      <MultiSelectContent>
        <h4 className="content-title">{content}</h4>
        <h4 className="content-label">{label}</h4>
        <button className="remove-button" onClick={onClick}>
          <RemoveIcon />
        </button>
      </MultiSelectContent>
      <MultiSelectMark>
        <input type="checkbox" className="checkbox" onChange={onCheck} checked={checked} />
      </MultiSelectMark>
    </MultiSelectOptionContainer>
  )
}

function MultiSelectForm(props: MultiSelectFormProps) {
  const { value, placeholder, onChange, onClick } = props;

  return (
    <MultiSelectFormContainer>
      <input
        className='input'
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <button 
        type='button'
        onClick={onClick}
        className='add-button'
      >
        <AddIcon />
      </button>
    </MultiSelectFormContainer>
  )
}

class MultiSelect extends Component {
  constructor(props: MultiSelectProps) {
    super(props)

    this.state = {
      ...props,
      currentInput: 'title'
    };
  }

  handleChange = e => {
    const { newOption, currentInput } = this.state
    newOption[currentInput].value = e.target.value
    this.setState({ newOption })
  }

  handleRemove = option => {
    const { options } = this.state
    const changedOptions = options.filter(item => item != option)
    this.setState({ options: changedOptions })
  }

  handleCheck = option => {
    const { options } = this.state
    const changedOptions = options.map(item => {
      if (item == option) {
        return {
          ...item,
          checked: !item.checked
        }
      } else {
        return item
      }
    })
    this.setState({ options: changedOptions })
  }

  handleAdd = e => {
    const { options, newOption, currentInput } = this.state

    if (currentInput == 'title' && newOption['title'].value) {
      this.setState({ currentInput: 'label' })
    } else if (newOption['label'].value) {
      options.push({
        checked: false, 
        label: newOption['label'].value, 
        content: newOption['title'].value
      });
            
      newOption['title'].value = '';
      newOption['label'].value = '';

      this.setState({ options, newOption, currentInput: 'title' })
    }
  }

  render() {
    const { options, title, labelCheckBox, width, newOption, currentInput } = this.state;

    return (
      <MultiSelectContainer
        width={width}
      >
        <BlockContainer>
          <h3 className="title-multi-select">{title}</h3>
          <h3 className="label-checkbox-multi-select">{labelCheckBox}</h3>
        </BlockContainer>
        <BlockContainer>
          {
            options.map(option =>
              <MultiSelectOption 
                checked={option.checked}
                label={option.label}
                content={option.content}
                key={options.content}
                onClick={() => this.handleRemove(option)}
                onCheck={() => this.handleCheck(option)}
              />  
            )
          }
        </BlockContainer>
        <BlockContainer>
          <MultiSelectForm 
            value={newOption[currentInput].value}
            placeholder={newOption[currentInput].placeholder}
            onChange={this.handleChange}
            onClick={this.handleAdd}
          />
        </BlockContainer>
      </MultiSelectContainer>
    );
  }
}

MultiSelect.defaultProps = defaultProps;

export default MultiSelect
