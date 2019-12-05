//@flow
import React,{useState} from "react";
import styled from "styled-components";

type Props = {
  minLength: Number,
  delay: Number
};

const DebounceInputContainer = styled.div``;

function DebounceInput({minLength,delay, ...rest}: Props) {

  const[value, setValue] = useState('')
  const[timeOutID, setTimeOutID] = useState(null)

  const handleChange = e => {        
    let newValue =  e.target.value;
    let lengthDiff = Math.abs(newValue.length - value.length) % (minLength + 1) ;
    
    if(minLength === lengthDiff){
      clearTimeout(timeOutID)

      const newTimeOutID = setTimeout(() => {
          setValue(newValue)
        },delay);

      setTimeOutID(newTimeOutID)
    } 
  }

  return (
    <DebounceInputContainer className="sc-debounceinput">
      <input type='text' onChange={e => handleChange(e)}></input>
      <label>Value: {value}</label>
    </DebounceInputContainer>
  );
}

export default DebounceInput;
