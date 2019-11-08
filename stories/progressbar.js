//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import ProgressBar from "../src/lib/components/progressbar/ProgressBar.component";
import { Wrapper, Title } from "./common";

storiesOf("ProgressBar", module).add("Default", () => {
  return (
    <Wrapper>
      <div style={{width: '200px'}}>
        <Title>Smaller</Title>
        <ProgressBar 
          size='smaller'
          percentage={50}
          topLeftLabel='50%'
          topRightLabel='100GB Total'
          bottomLeftLabel='50GB Used'
          bottomRightLabel='50GB Free'
        />

        <Title>Small</Title>
        <ProgressBar 
          size='small'
          percentage={50}
          topLeftLabel='50%'
          topRightLabel='100GB Total'
          bottomLeftLabel='50GB Used'
          bottomRightLabel='50GB Free'
        />

        <Title>Large</Title>
        <ProgressBar 
          size='large'
          percentage={50}
          topLeftLabel='50%'
          topRightLabel='100GB Total'
          bottomLeftLabel='50GB Used'
          bottomRightLabel='50GB Free'
        />

        <Title>Larger</Title>
        <ProgressBar 
          size='larger'
          percentage={50}
          topLeftLabel='50%'
          topRightLabel='100GB Total'
          bottomLeftLabel='50GB Used'
          bottomRightLabel='50GB Free'
        />

        <Title>Different colors</Title>
        <ProgressBar 
          size='smaller'
          color='#2f67ac'
          percentage={50}
          topLeftLabel='50%'
          topRightLabel='100GB Total'
          bottomLeftLabel='50GB Used'
          bottomRightLabel='50GB Free'
        />
        <ProgressBar 
          size='smaller'
          color='#ff5722'
          percentage={50}
          topLeftLabel='50%'
          topRightLabel='100GB Total'
          bottomLeftLabel='50GB Used'
          bottomRightLabel='50GB Free'
        />
        <ProgressBar 
          size='smaller'
          color='#100704'
          percentage={50}
          topLeftLabel='50%'
          topRightLabel='100GB Total'
          bottomLeftLabel='50GB Used'
          bottomRightLabel='50GB Free'
        />
        <ProgressBar 
          size='smaller'
          color='#982803'
          percentage={50}
          topLeftLabel='50%'
          topRightLabel='100GB Total'
          bottomLeftLabel='50GB Used'
          bottomRightLabel='50GB Free'
        />
        <ProgressBar 
          color='#2f67ac'
          percentage={24}
          topLeftLabel='24%'
          topRightLabel='100GB Total'
          bottomLeftLabel='24GB Used'
          bottomRightLabel='76GB Free'
        />
        <ProgressBar 
          color='#ff5722'
          percentage={70}
          topLeftLabel='70%'
          topRightLabel='100GB Total'
          bottomLeftLabel='70GB Used'
          bottomRightLabel='30GB Free'
        />
        <ProgressBar 
          color='#100704'
          percentage={5}
          topLeftLabel='5%'
          topRightLabel='100GB Total'
          bottomLeftLabel='5GB Used'
          bottomRightLabel='95GB Free'
        />
        <ProgressBar 
          color='#982803'
          percentage={78}
          topLeftLabel='78%'
          topRightLabel='100GB Total'
          bottomLeftLabel='78GB Used'
          bottomRightLabel='22GB Free'
        />
      </div>
    </Wrapper>
  )
});
