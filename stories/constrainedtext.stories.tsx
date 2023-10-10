import React from 'react';
import { ConstrainedText } from '../src/lib/components/constrainedtext/Constrainedtext.component';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Constrained Text',
  component: ConstrainedText,
  decorators:[(story) => (
    <Wrapper style={{minHeight:'10vh', padding:'3rem'}} >
      <div
        style={{
        width: '100px',
        color: '#0F7FFF',
        }}
      >
        {story()}
      </div>
    </Wrapper>)],
    argTypes:{
      tooltipPlacement:{
        options:["top","bottom","left","right","top-start","top-end","right-start","right-end","bottom-end","bottom-start","left-start","left-end"]
      }
    }
};

export const Default = {
  args:{
    text:"This is a long long phrase",
    tooltipStyle:{ width:'100px'}
  }
}

export const CustomizedTooltip = {
  args:{
    text:"This is a long phrase",
    tooltipStyle:{ width:'100px', color:"lightblue"},
    tooltipPlacement:"right"
  }
}

export const ConstrainedTextOnMultipleLines = {
  ...Default,
  args:{
    ...Default.args,
    text:"This is a really long long phrase that should take 2 lines",
    lineClamp:2
  }
}
/*
export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <Title>Constrained Text</Title>
        <div
          style={{
            width: '100px',
            color: '#0F7FFF',
          }}
        >
          <ConstrainedText
            text={'This is a long phrase'}
            tooltipStyle={{
              width: '100px',
            }}
          />
          <ConstrainedText
            text={'This'}
            tooltipStyle={{
              width: '100px',
            }}
          />
        </div>
        <Title>With the ability to customize the style of tooltip</Title>
        <div
          style={{
            width: '100px',
            color: '#0F7FFF',
          }}
        >
          <ConstrainedText
            text={'This is a long phrase'}
            tooltipStyle={{
              width: '100px',
            }}
            tooltipPlacement="right"
          />
        </div>

        <Title>With the ability to customize the number of line</Title>
        <div
          style={{
            width: '100px',
            color: '#0F7FFF',
          }}
        >
          <ConstrainedText
            text={'This is a long phrase that should get into 2 lines'}
            tooltipStyle={{
              width: '100px',
            }}
            lineClamp={2}
          />
        </div>
      </Wrapper>
    );
  },
};
*/