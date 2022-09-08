import styled, { css } from 'styled-components';
import { ellipsis } from 'polished';
import * as defaultTheme from '../../style/theme';
import { getTheme } from '../../utils';
import { Icon } from '../icon/Icon.component';
type Props = {
  paths: Array<JSX.Element>;
};
const BreadcrumbContainer = styled.ol`
  display: flex;
  list-style-type: none;
  padding-left: 0;
  margin: 0;
`;
const BreadcrumbItem = styled.li<{ active: boolean }>`
  box-sizing: border-box;
  height: 100%;
  font-size: ${defaultTheme.fontSize.larger};
  ${ellipsis('250px')}

  ${(props) => {
    const { textPrimary, selectedActive, textLink } = getTheme(props);

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
  padding: ${defaultTheme.padding.smaller} ${defaultTheme.padding.small};
  color: ${defaultTheme.brand.textTertiary};
  display: flex;
  align-items: center;
  font-size: ${defaultTheme.fontSize.small};
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
