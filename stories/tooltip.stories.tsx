import React from 'react';
import Tooltip from '../src/lib/components/tooltip/Tooltip.component';
import Button from '../src/lib/components/button/Button.component';
import { Wrapper, Title, SubTitle } from './common';
export default {
  title: 'Components/Notification/Tooltip',
  component: Tooltip,
};
export const Default = () => {
  return (
    <Wrapper
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <Title>Default Tooltip</Title>
        <Tooltip overlay="Hellooooo">
          <SubTitle>Hover here!</SubTitle>
        </Tooltip>
      </div>

      <div>
        <Title>Tooltip right</Title>
        <Tooltip placement="right" overlay="Helloooooo">
          <SubTitle>Hover here!</SubTitle>
        </Tooltip>
      </div>
      <div
        style={{
          marginLeft: '100px',
        }}
      >
        <Title>Tooltip left</Title>
        <Tooltip placement="left" overlay="Helloooooo">
          <SubTitle>Hover here!</SubTitle>
        </Tooltip>
      </div>
      <div>
        <Title>Tooltip bottom</Title>
        <Tooltip placement="bottom" overlay="Helloooooo">
          <SubTitle>Hover here!</SubTitle>
        </Tooltip>
      </div>
      <div>
        <Title>Customize your tooltip style</Title>
        <Tooltip
          placement="right"
          overlayStyle={{
            backgroundColor: 'green',
            fontSize: '20px',
            width: '120px',
          }}
          overlay="Helloooooo"
        >
          <SubTitle>Hover here!</SubTitle>
        </Tooltip>
      </div>
      <div>
        <Title>Tooltip with button</Title>
        <Tooltip placement="bottom" overlay="Helloooooo">
          <Button size="small" text="Hover here" />
        </Tooltip>
      </div>
      <div>
        <Title>add icon in the overlay of tooltip</Title>
        <Tooltip
          placement="bottom"
          overlay={
            <div>
              <i className="far fa-smile"></i>Helloooooooo
            </div>
          }
        >
          <SubTitle>tooltip with icon</SubTitle>
        </Tooltip>
      </div>
      <div>
        <Title>Tooltip doesn't trigger</Title>
        <Tooltip placement="bottom">
          <SubTitle>Hover here!</SubTitle>
        </Tooltip>
      </div>
    </Wrapper>
  );
};