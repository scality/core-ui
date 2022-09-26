import React from 'react';
import { ProgressBar } from '../src/lib/components/progressbar/ProgressBar.component';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Progress & loading/ProgressBar',
  component: ProgressBar,
};
export const Default = ({}) => {
  return (
    <Wrapper>
      <div
        style={{
          width: '260px',
        }}
      >
        <Title>Smaller</Title>
        <ProgressBar
          size="smaller"
          percentage={50}
          topLeftLabel="50%"
          topRightLabel="100GB Total"
          bottomLeftLabel="50GB Used"
          bottomRightLabel="50GB Free"
          buildinLabel="50%"
          backgroundColor="#87929D"
        />

        <Title>Base</Title>
        <ProgressBar
          size="base"
          percentage={50}
          topLeftLabel="Usage"
          topRightLabel="50%"
          bottomLeftLabel="5.17TB STORED - 13TB USED"
          bottomRightLabel="12.9TB FREE - 25.83TB TOTAL"
          buildinLabel="50%"
        />

        <Title>Large with animation</Title>
        <ProgressBar
          size="large"
          percentage={50}
          topLeftLabel="50%"
          topRightLabel="100GB Total"
          bottomLeftLabel="50GB Used"
          bottomRightLabel="50GB Free"
          buildinLabel="50%"
          backgroundColor="#87929D"
          isAnimation={true}
        />

        <Title>Larger</Title>
        <ProgressBar
          size="larger"
          percentage={50}
          topLeftLabel="50%"
          topRightLabel="100GB Total"
          bottomLeftLabel="50GB Used"
          bottomRightLabel="50GB Free"
          buildinLabel="50%"
          backgroundColor="#87929D"
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
          buildinLabel="50%"
          backgroundColor="#87929D"
        />
        <ProgressBar
          size="smaller"
          color="#ff5722"
          percentage={10}
          topLeftLabel="10%"
          buildinLabel="10%"
          backgroundColor="#87929D"
        />
        <ProgressBar
          size="smaller"
          color="#982803"
          percentage={90}
          topLeftLabel="90% Used"
          topRightLabel="100GB Total"
          buildinLabel="90%"
          backgroundColor="#87929D"
        />
      </div>
    </Wrapper>
  );
};
