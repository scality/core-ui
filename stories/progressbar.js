//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import ProgressBar from "../src/lib/components/progressbar/ProgressBar.component";
import { Wrapper, Title } from "./common";

storiesOf("ProgressBar", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>Smaller</Title>
      <ProgressBar 
        size='smaller'
        percentage={true}
        capacity={true}
        measure='GB'
        label={true}
      />

      <Title>Small</Title>
      <ProgressBar 
        size='small'
        percentage={true}
        capacity={true}
        label={true}
        measure='GB'
      />

      <Title>Large</Title>
      <ProgressBar 
        size='large'
        measure='GB'
        percentage={true}
        label={true}
        capacity={true}
      />

      <Title>Larger</Title>
      <ProgressBar 
        size='smaller'
        measure='GB'
        percentage={true}
        label={true}
        capacity={true}
      />

      <Title>Different colors</Title>
      <ProgressBar 
        size='smaller'
        measure='GB'
        percentage={true}
        label={true}
        capacity={true}
        color='#2f67ac'
      />
      <ProgressBar 
        size='smaller'
        measure='GB'
        percentage={true}
        label={true}
        capacity={true}
        color='#ff5722'
      />
      <ProgressBar 
        size='smaller'
        measure='GB'
        percentage={true}
        label={true}
        capacity={true}
        color='#100704'
      />
      <ProgressBar 
        size='smaller'
        measure='GB'
        percentage={true}
        label={true}
        capacity={true}
        color='#982803'
      />

      <Title>Different measures/capacity</Title>
      <ProgressBar 
        size='smaller'
        measure='KG'
        total={300}
        filled={72}
        percentage={true}
        label={true}
        capacity={true}
        color='#2f67ac'
      />
      <ProgressBar 
        size='smaller'
        measure='CM'
        total={500}
        filled={347}
        percentage={true}
        label={true}
        capacity={true}
        color='#ff5722'
      />
      <ProgressBar 
        size='smaller'
        measure='people'
        total={10000}
        filled={456}
        percentage={true}
        label={true}
        capacity={true}
        color='#100704'
      />
      <ProgressBar 
        size='smaller'
        measure='M'
        total={3}
        filled={1}
        percentage={true}
        label={true}
        capacity={true}
        color='#982803'
      />
    </Wrapper>
  )
});
