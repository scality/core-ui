//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import ProgressBar from "../src/lib/components/progressbar/ProgressBar.component";
import { Wrapper, Title } from "./common";

storiesOf("ProgressBar", module).add("Default", () => {
  return (
    <Wrapper>
      <div style={{ width: "200px" }}>
        <Title>Smaller</Title>
        <ProgressBar
          size="smaller"
          percentage={50}
          topLeftLabel="50%"
          topRightLabel="100GB Total"
          bottomLeftLabel="50GB Used"
          bottomRightLabel="50GB Free"
        />

        <Title>Small</Title>
        <ProgressBar
          size="small"
          percentage={50}
          topLeftLabel="50%"
          topRightLabel="100GB Total"
          bottomLeftLabel="50GB Used"
          bottomRightLabel="50GB Free"
        />

        <Title>Large</Title>
        <ProgressBar
          size="large"
          percentage={50}
          topLeftLabel="50%"
          topRightLabel="100GB Total"
          bottomLeftLabel="50GB Used"
          bottomRightLabel="50GB Free"
        />

        <Title>Larger</Title>
        <ProgressBar
          size="larger"
          percentage={50}
          topLeftLabel="50%"
          topRightLabel="100GB Total"
          bottomLeftLabel="50GB Used"
          bottomRightLabel="50GB Free"
        />

        <Title>Different colors</Title>
        <ProgressBar
          size="smaller"
          color="#2f67ac"
          percentage={50}
          topLeftLabel="50%"
          topRightLabel="100GB Total"
          bottomLeftLabel="50GB Used"
          bottomRightLabel="50GB Free"
        />
        <ProgressBar
          size="smaller"
          color="#ff5722"
          percentage={10}
          topLeftLabel="10%"
        />
        <ProgressBar
          size="smaller"
          color="#982803"
          percentage={90}
          topLeftLabel="90% Used"
          topRightLabel="100GB Total"
        />
      </div>
    </Wrapper>
  );
});
