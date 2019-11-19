//@flow
import React from "react";
import CloudProgressBar from "../src/lib/components/cloudprogressbar/CloudProgressBar.component";
import { Wrapper, Title } from "./common";
import { storiesOf } from "@storybook/react";

storiesOf("CloudProgressBar", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>CloudProgressBar</Title>
      <div style={{ width: "200px" }}>
        <CloudProgressBar
          percentage={30}
          borderSize='0.5px'
          color='yellow'
          progressColor='blue'
          label='Lorem ipsum'
          fontColor='#000'
          fontSizePercentage='25px'
          fontSizeLabel='15px'
        />
      </div>
      <div style={{ width: "300px" }}>
        <CloudProgressBar
          percentage={50}
          borderSize='0.5px'
          color='#ccc'
          progressColor='#000'
          label='Half cloud'
          fontColor='#000'
          fontSizePercentage='25px'
          fontSizeLabel='15px'
        />
      </div>
      <div style={{ width: "400px" }}>
        <CloudProgressBar
          percentage={80}
          borderSize='1px'
          color='#3d383a'
          progressColor='#83d136'
          label='Border bigger'
          fontColor='#000'
          fontSizePercentage='25px'
          fontSizeLabel='15px'
        />
      </div>
      <div style={{ width: "500px" }}>
        <CloudProgressBar
          percentage={70}
          borderSize='0.5px'
          color='#BDFFB0'
          progressColor='#A3FFCB'
          label='Bigger font size'
          fontColor='#000'
          fontSizePercentage='40px'
          fontSizeLabel='20px'
        />
      </div>
    </Wrapper>
  );
});
