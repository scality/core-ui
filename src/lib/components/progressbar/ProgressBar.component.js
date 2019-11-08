//@flow
import React, { useEffect, useState } from 'react';
import styled, { css } from "styled-components";

export type ProgressBarProps = {
  total: number,
  filled: number,
  size?: Size,
  color: string,
  measure: string,
  percentage?: boolean,
  capacity?: boolean,
  label?: boolean
};

export const ProgressBarContainer = styled.div`
  display: block;
  background: #d9d9d9;

  ${props => {
    switch (props.size) {
      case "smaller":
        return css`
          border-radius: 12px;
          width: 200px;
          height: 10px;
        `;

      case "small":
        return css`
          border-radius: 12px;
          width: 250px;
          height: 15px;
        `;

      case "large":
        return css`
          border-radius: 12px;
          width: 300px;
          height: 15px;
        `;

      case "larger":
        return css`
          border-radius: 12px;
          width: 400px;
          height: 20px;
        `;

      default:
        return css`
          border-radius: 12px;
          width: 200px;
          height: 10px;
        `;
  }
}}
`;

export const Container = styled.div`
  .percentage {
    font-size: 20px;
    display: inline-block;
    font-weight: 800;
    margin-bottom: 4px;
    width: 50%;
    text-align: left;
  }

  .capacity {
    display: inline-block;
    width: 50%;
    text-align: right;
    font-size: 14px;
    color: #908d8d;
  }

  .used {
    display: inline-block;
    width: 50%;
    text-align: left;
  }

  .free {
    display: inline-block;
    width: 50%;
    text-align: right;
  }

  margin: 10px 0 10px 0;

  ${props => {
    switch (props.size) {
      case "smaller":
        return css`
          width: 200px;
        `;

      case "small":
        return css`
          width: 250px;
        `;

      case "large":
        return css`
          width: 300px;
        `;

      case "larger":
        return css`
          width: 400px;
        `;

      default:
        return css`
          width: 200px;
        `;
  }
}}
`;

export const LabelContainer = styled.div`
  margin-top: 6px;
  font-size: 14px;
`;

export const FilledAreaContainer = styled.div`
  transition:All 1s ease;
  -webkit-transition:All 1s ease;
  -moz-transition:All 1s ease;
  -o-transition:All 1s ease;

  ${props => {
    let borderStyle;

    switch (props.size) {
      case "smaller":
        borderStyle = `
          border-radius: 12px;
        `;
        break;

      case "small":
        borderStyle = `
          border-radius: 12px;
        `;
        break;

      case "large":
        borderStyle = `
          border-radius: 12px;
        `;
        break;

      case "larger":
        borderStyle = `
          border-radius: 12px;
        `;
        break;

      default:
        borderStyle = `
          border-radius: 12px;
        `;
        break;
    }

    return css`
      background: ${props.color};
      width: ${props.width}%;
      height: 100%;
      ${borderStyle}
    `;
  }
}}
`;

function ProgressBar({
  total = 100,
  filled = 50,
  size = 'base',
  color = '#fcb039',
  measure = '',
  percentage = false,
  capacity = false,
  label = false
}) {
  const [width, setWidth] = useState(0);
  const filledWidth = calcWidth(total, filled);
  useEffect(() => setWidth(filledWidth), []);

  return (
    <Container
      size={size}
    >
      {
        percentage &&
          <span className="percentage">
            {filledWidth}%
          </span>
      }
      {
        capacity &&
          <span className="capacity">
            {`${total} ${measure} Total`}
          </span>
      }
      <ProgressBarContainer
        size={size}
      >
        <FilledAreaContainer
          color={color}
          width={width}
        />
      </ProgressBarContainer>
      {
        label &&
        (
          <LabelContainer>
            <span className="used">
              {`${filled} ${measure}`} used
            </span>
            <span className="free">
              {`${total - filled} ${measure}`} free
            </span>
          </LabelContainer>
        )
      }
    </Container>
  )
}

const calcWidth = (total, filled) => (100 * filled / total).toFixed(2);

export default ProgressBar;
