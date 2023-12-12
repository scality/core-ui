import { ellipsis } from 'polished';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize } from '../../style/theme';
import { Icon } from '../icon/Icon.component';
type Props = {
  paths: Array<JSX.Element>;
};
const BreadcrumbContainer = styled.ol`
  display: flex;
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  overflow-y: auto;
`;
const BreadcrumbItem = styled.li<{ active: boolean }>`
  box-sizing: border-box;
  height: 100%;
  font-size: ${fontSize.larger};
  ${ellipsis('250px')}
  min-width: 3rem;

  ${(props) => {
    const { textPrimary, selectedActive, textLink } = props.theme;

    if (props.active) {
      return css`
        * {
          text-decoration: none;
          color: ${textPrimary};
        }
        color: ${textPrimary};
      `;
    }

    return css`
      * {
        text-decoration: none;
        color: ${textLink};
      }
      color: ${textLink};
      border-bottom: 2px solid transparent;
      &:hover {
        * {
          color: ${selectedActive};
        }
        color: ${selectedActive};
        border-bottom: 2px solid ${selectedActive};
      }
    `;
  }}
`;
const BreadcrumbSeparator = styled.li`
  ${(props) => css`
    color: ${props.theme.textTertiary};
    padding: ${spacing.r4} ${spacing.r8};
    display: flex;
    align-items: center;
    font-size: ${fontSize.small};
  `}
`;

const withBreadcrumbSeparator = (lastIndex) => (acc, item, index) => {
  const notLast = index < lastIndex;
  return notLast
    ? [
        ...acc,
        item,
        <BreadcrumbSeparator
          key={`sc-breadcrumb_separator_${index}`}
          className="sc-breadcrumb_separator"
        >
          <Icon name="Chevron-right" />
        </BreadcrumbSeparator>,
      ]
    : [...acc, item];
};

const Breadcrumb = ({ paths = [], ...rest }: Props) => {
  const lastIndex = paths.length - 1;
  const breadcrumbItems = paths
    .map((item, index) => {
      return (
        <BreadcrumbItem
          key={`sc-breadcrumb_item_${index}`}
          className="sc-breadcrumb_item"
          active={index === lastIndex}
        >
          {item}
        </BreadcrumbItem>
      );
    })
    .reduce(withBreadcrumbSeparator(lastIndex), []);
  return (
    <BreadcrumbContainer className="sc-breadcrumb" {...rest}>
      {breadcrumbItems}
    </BreadcrumbContainer>
  );
};

export { Breadcrumb };
