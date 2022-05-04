import React from 'react';
import Button from '../button/Button.component';
import styled, { css } from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getTheme } from '../../utils';
type Props = {
  label: string;
  icon: string;
  link?: string;
  history?: Record<string, any>;
};
const EmptystateContainer = styled.div`
  ${(props) => {
    const brand = getTheme(props);
    return css`
      color: ${brand.textSecondary};
    `;
  }}
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10%;
`;
export const BigText = styled.h3`
  text-align: center;
  margin: 0px;
`;
export const EmptyStateRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: ${defaultTheme.padding.larger};
`;
export const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const IconWrapper = styled.div`
  ${(props) => {
    const brand = getTheme(props);
    return css`
      background-color: ${brand.borderLight};
      color: ${brand.background};
    `;
  }}

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 150px;
  height: 150px;

  i {
    &.fas {
      font-size: 4.5em;
    }
  }
`;

function Emptystate(props: Props) {
  const { icon, label, link, history } = props;
  return (
    <EmptystateContainer className="sc-emptystate">
      <EmptyStateRow>
        <IconWrapper>
          <i className={`fas ${icon}`}></i>
        </IconWrapper>
      </EmptyStateRow>
      <EmptyStateRow>
        <BigText>A list of {`${label}s`} will appear here</BigText>
      </EmptyStateRow>
      <EmptyStateRow>
        <BigText>
          There are no {`${label}s`} created yet, let's create your first{' '}
          {label}.
        </BigText>
      </EmptyStateRow>
      {history && (
        <ActionWrapper>
          <Button
            text={`Create ${label}`}
            size="large"
            icon={<i className="fas fa-plus"></i>}
            type="button"
            variant="buttonSecondary"
            onClick={() => history.push(link)}
          />
        </ActionWrapper>
      )}
    </EmptystateContainer>
  );
}

export default Emptystate;