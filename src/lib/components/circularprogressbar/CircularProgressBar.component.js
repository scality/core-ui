//@flow
import React from "react";
import {CircularProgressBarContainer, Percent, Number} from './CircularProgressBar.component.style'

type Props = {
  percent?: number,
  label?: string,
  title?: string,
  id?: string,
  color?: string,
};

function CircularProgressBar({ label, percent, title, color, ...rest }: Props) {
  return (
    <CircularProgressBarContainer percent={percent} color={color} className="sc-circularprogressbar">
      <h2>{title}</h2>
     <Percent>
      <svg>
        <circle cx="70" cy="70" r="70"></circle>
        <circle cx="70" cy="70" r="70"></circle>
      </svg>
      <Number>
        <h2>{percent}%</h2>
        <h3>{label}</h3>
      </Number>
     </Percent>     
    </CircularProgressBarContainer>
  );
}

export default CircularProgressBar;
