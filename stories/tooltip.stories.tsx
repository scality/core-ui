import React from 'react';
import { Tooltip } from '../src/lib/components/tooltip/Tooltip.component';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Wrapper, Title, SubTitle } from './common';

const options = [
  'top',
  'bottom',
  'left',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom-end',
  'bottom-start',
  'left-start',
  'left-end',
];

export default {
  title: 'Components/Notification/Tooltip',
  component: Tooltip,
};
export const Playground = {
  render: (args) => {
    return (
      <Wrapper
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Tooltip overlay="You can play with me" {...args}>
          <SubTitle>
            Hover here <br />
            to see <br /> the tooltip !
          </SubTitle>
        </Tooltip>
      </Wrapper>
    );
  },
  argTypes: {
    placement: {
      options,
      control: {
        type: 'select',
      },
    },
  },
};

export const Default = {
  render: ({}) => {
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
          <Button
            icon={<i className="fas fa-trash" />}
            label=""
            tooltip={{
              placement: 'top',
              overlay: `Hello, this is the button tooltip!`,
              overlayStyle: { width: '8rem' },
            }}
          />
        </div>
        <div>
          <Title>Tooltip with disabled button</Title>
          <Button
            disabled={true}
            icon={<i className="fas fa-trash" />}
            label=""
            tooltip={{
              placement: 'top',
              overlay: `You can't delete it :(`,
              overlayStyle: { width: '8rem' },
            }}
          />
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
  },
};
