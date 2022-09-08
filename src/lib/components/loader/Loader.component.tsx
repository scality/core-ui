import styled, { css } from 'styled-components';

import { LOADER_SIZE as SIZE } from '../constants';
import { LoaderIcon } from '../../icons/scality-loading';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector } from '../../utils';
type Props = {
  size?: keyof typeof SIZE;
  color?: string;
  children?: JSX.Element;
  centered?: boolean;
};
const LoaderContainer = styled.div<{
  size: keyof typeof SIZE;
  centered?: boolean;
}>`
  display: flex;
  ${(props) => {
    return css`
      font-size: ${defaultTheme.fontSize[props.size]};
      svg {
        height: ${defaultTheme.svgSize[props.size]};
        width: ${defaultTheme.svgSize[props.size]};
        fill: ${props.color};
      }
    `;
  }}

  ${(props) => {
    if (props.centered)
      return css`
        height: 100vh;
        justify-content: center;
        align-items: center;
      `;
  }}
`;
const LoaderText = styled.span`
  padding: 10px 0;
  color: ${getThemePropSelector('textPrimary')};
`;
const LoaderTextDiv = styled.span`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

function Loader({
  children,
  color = '#A14FBF',
  size = SIZE.large,
  centered = false,
  ...rest
}: Props) {
  return (
    <LoaderContainer
      size={size}
      color={color}
      centered={centered}
      className="sc-loader"
      {...rest}
    >
      <LoaderTextDiv>
        <LoaderIcon />
        {children && <LoaderText> {children}</LoaderText>}
      </LoaderTextDiv>
    </LoaderContainer>
  );
}

export { Loader };
