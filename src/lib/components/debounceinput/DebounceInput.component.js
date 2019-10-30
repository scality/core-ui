//@flow
import React,{useState,useEffect} from "react";
import styled from "styled-components";

type Props = {
};

const DebounceInputContainer = styled.div``;

function DebounceInput(props: Props) {
  const minLength = 1
  const delay = 300
  const[value, setValue] = useState('')

  const handleChange = async e => {
    
    e.persist();
    
    let newValue =  e.target.value;
    let lengthDiff = Math.abs(newValue.length - value.length);
    
    if(minLength === lengthDiff) 
    await setTimeout(() => {
      return setValue(newValue)
      },delay);
  }

  return (
    <DebounceInputContainer className="sc-debounceinput">
      <input type='text' onChange={e => handleChange(e)}></input>
      <label>Value: {value}</label>
    </DebounceInputContainer>
  );
}

export default DebounceInput;
