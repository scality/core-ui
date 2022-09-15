import React from 'react';
import styled, { css } from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getTheme } from '../../utils';
import { Button } from '../buttonv2/Buttonv2.component';
import { Icon, IconName } from '../icon/Icon.component';
import { LargeText } from '../text/Text.component';
type Props = {
  label: string;
  icon: IconName;
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
      color: ${brand.background};
      border: 1px solid ${brand.infoPrimary};
    `;
  }}

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 150px;
  height: 150px;
`;

function EmptyState(props: Props) {
  const { icon, label, link, history } = props;
  return (
    <EmptystateContainer className="sc-emptystate">
      <EmptyStateRow>
        <IconWrapper>
          <Icon name={icon} color="infoPrimary" size="5x" />
        </IconWrapper>
      </EmptyStateRow>
      <EmptyStateRow>
        <LargeText>A list of {`${label}s`} will appear here.</LargeText>
      </EmptyStateRow>
      <EmptyStateRow>
        <LargeText>
          There are no {`${label}s`} created yet, let's create your first{' '}
          {label}.
        </LargeText>
      </EmptyStateRow>
      {history && (
        <ActionWrapper>
          <Button
            label={`Create ${label}`}
            icon={<Icon name="Create-add" />}
            type="button"
            variant="primary"
            onClick={() => history.push(link)}
          />
        </ActionWrapper>
      )}
    </EmptystateContainer>
  );
}

export { EmptyState };
