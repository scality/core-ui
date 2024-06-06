import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { Button } from '../buttonv2/Buttonv2.component';
import { Icon, IconName } from '../icon/Icon.component';
import { LargeText } from '../text/Text.component';
import { CoreUITheme } from '../../style/theme';
import { useHistory } from 'react-router';

export type Props = {
  listedResource: {
    singular: string;
    plural: string;
  };
  icon: IconName;
  link?: string;
  backgroundColor?: keyof CoreUITheme;
  /**
   * The resource to create before browsing the listed resource
   * Only used when resource to create is different from listed resource
   */
  resourceToCreate?: string;
};
const EmptystateContainer = styled.div<{ backgroundColor?: keyof CoreUITheme }>`
  ${(props) => {
    const { theme, backgroundColor } = props;
    return css`
      color: ${theme.textSecondary};
      background-color: ${backgroundColor
        ? theme[backgroundColor]
        : 'transparent'};
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
  margin-bottom: ${spacing.r24};
`;
export const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

function EmptyState(props: Props) {
  const { icon, listedResource, link, resourceToCreate, backgroundColor } =
    props;
  const history = useHistory();
  return (
    <EmptystateContainer
      className="sc-emptystate"
      backgroundColor={backgroundColor}
    >
      <EmptyStateRow>
        <Icon name={icon} color="infoPrimary" size="5x" withWrapper />
      </EmptyStateRow>
      <EmptyStateRow>
        <LargeText>{`A list of ${listedResource.plural} will appear here.`}</LargeText>
      </EmptyStateRow>
      <EmptyStateRow>
        <LargeText>
          {!resourceToCreate
            ? `There are no ${listedResource.plural} created yet, let's create your first ${listedResource.singular}.`
            : `Before browsing your ${listedResource.plural}, create your first ${resourceToCreate}.`}
        </LargeText>
      </EmptyStateRow>
      {link && (
        <ActionWrapper>
          <Button
            label={`Create ${resourceToCreate || listedResource.singular}`}
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
