//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import TextArea from "../src/lib/components/textarea/TextArea.component";
import { Wrapper, Title } from "./common";


storiesOf("TextArea", module)
  .add("Default", () => {
    return (
      <Wrapper>
      <Title>Text Area without label</Title>
        <TextArea 
          rows={10} 
          cols={200} 
          id={"text"} 
          label="Text Area:"                      
        />
      <Title>Text Area with label</Title>
        <TextArea 
          rows={10} 
          cols={50} 
          id={"text"} 
          label="Text Area:"                      
          placeholder="Text area input"            
        />
        <Title>Text Area with error</Title>
        <TextArea 
          rows={10} 
          cols={50} 
          id={"text"} 
          label="Text Area:"                      
          placeholder="Text area input"           
          error={"error"} 
        />
        <Title>Text Area disabled</Title>
        <TextArea 
          rows={10} 
          cols={50} 
          id={"text"} 
          label="Text Area:"                      
          placeholder="Text area input"           
          disabled={true} 
        />
      </Wrapper>
    );
  });


  