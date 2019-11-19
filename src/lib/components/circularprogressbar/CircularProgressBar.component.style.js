import styled from "styled-components";
import { mergeTheme } from "../../utils";
import * as defaultTheme from "../../style/theme";

export const CircularProgressBarContainer = styled.div`
  margin: 0;
  padding: 0;
  color: ${props => mergeTheme(props.theme, defaultTheme).text};
  svg 
  {
    position: relative;
    width: 150px;
    height: 150px;
    z-index: 1000;
  }
  svg circle 
  {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: ${props => mergeTheme(props.theme, defaultTheme).text};
    stroke-width: 10;
    stroke-linecap: round;
    transform: translate(5px, 5px);
  }
  svg circle:nth-child(2) 
  {
    stroke-dasharray: 440;
    stroke-dashoffset: ${({percent}) => 440 - (440 * percent)/ 100};
    stroke: ${({color,theme}) => color ? color : mergeTheme(theme, defaultTheme).primary};
  }
`;

export const Percent = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;
export const Number = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2{
    font-weight: 800;
    font-size: 30px;
  }
  h3{
    margin-top: -30px;
    font-weight: 700;
    font-size: 25px;
  }
`;
