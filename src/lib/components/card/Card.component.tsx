// @ts-nocheck
import { HTMLProps } from 'react';
import { createContext } from 'react';
import styled, { css } from 'styled-components';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';
import { hex2RGB } from '../../utils';
const CardContext = createContext(null);
type CardElementProps = {
  children: React.ReactNode;
  className?: string;
};

function withCompoundCheck(Component) {
  return ({ children, className, ...rest }: CardElementProps) => (
    <CardContext.Consumer>
      {(value) => {
        const componentName = Component.displayName;

        if (!value) {
          throw new Error(
            `${
              componentName ? componentName : 'This component'
            } cannot be rendered outside the Card component`,
          );
        }

        return (
          <Component
            className={[
              componentName ? `sc-${componentName.toLowerCase()}` : null,
              className,
            ].join(' ')}
            {...rest}
          >
            {children}
          </Component>
        );
      }}
    </CardContext.Consumer>
  );
}

const StyledCardHeader = styled.div`
  padding: 0.7rem;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  font-weight: bold;
`;
StyledCardHeader.displayName = 'CardHeader';
const StyledCardBody = styled.div`
  padding: 0.7rem 0;
  color: ${(props) => props.theme.textPrimary};
`;
StyledCardBody.displayName = 'CardBody';
const StyledCardBodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
StyledCardBodyContainer.displayName = 'CardBodyContainer';
export const CardHeader = withCompoundCheck(StyledCardHeader);
export const CardBody = withCompoundCheck(StyledCardBody);
export const CardBodyContainer = withCompoundCheck(StyledCardBodyContainer);

const StyledCard = styled.div<{
  width: string;
  height: string;
  headerBackgroundColor: string;
  bodyBackgroundColor: string;
  colorStatus?: string;
  activeBorderColor: string;
  disabled: boolean;
}>`
  border-radius: 3px;
  display: flex;
  flex-flow: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.theme[props.bodyBackgroundColor]};
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
  ${StyledCardBody} {
    opacity: ${(props) => (props.disabled ? '0.2' : '1')};
  }

  ${StyledCardHeader} {
    color: ${(props) => props.theme.textPrimary};
    background: ${(props) =>
      props.colorStatus
        ? `rgba(${hex2RGB(props.theme[props.colorStatus]).join(',')}, 0.7)`
        : props.theme[props.headerBackgroundColor]};

    ${(props) => props.disabled && 'opacity: 0.3;'}
  }

  ${(props) =>
    props.onClick && !props.disabled
      ? css`
          cursor: pointer;

          &:hover {
            box-shadow: 0 0 0 2px ${props.theme.highlight};
          }

          &:focus {
            ${FocusVisibleStyle}
          }
        `
      : ''};

  &.active {
    box-shadow: 0 0 0 1px
      ${(props) => props.theme[props.activeBorderColor || 'selectedActive']};
  }
`;
type CardProps = {
  width?: string;
  height?: string;
  headerBackgroundColor?: string;
  bodyBackgroundColor?: string;
  status?: 'healthy' | 'warning' | 'critical';
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>;
function Card({
  width = 'auto',
  height = 'auto',
  headerBackgroundColor = 'buttonSecondary',
  bodyBackgroundColor = 'backgroundLevel3',
  status = null,
  onClick = null,
  active = false,
  disabled = false,
  children,
  className,
  ...rest
}: CardProps) {
  let colorStatus: string | null = null;

  if (status) {
    colorStatus =
      status != 'healthy' &&
      'status' + status.replace(/^\w/, (c) => c.toUpperCase());
  }

  return (
    <CardContext.Provider value={true}>
      <StyledCard
        className={[`sc-card ${active ? 'active' : ''}`, className].join(' ')}
        width={width}
        height={height}
        headerBackgroundColor={headerBackgroundColor}
        bodyBackgroundColor={bodyBackgroundColor}
        colorStatus={colorStatus}
        activeBorderColor={
          !status || status === 'healthy' ? 'selectedActive' : colorStatus
        }
        disabled={disabled}
        role={onClick && !disabled ? 'button' : null}
        aria-pressed={onClick && !disabled ? active : null}
        tabIndex={onClick && !disabled ? 0 : null}
        onClick={!disabled ? onClick : undefined}
        active={active}
        onKeyDown={(event) => {
          if (
            !disabled &&
            (event.key === ' ' ||
              event.key === 'Enter' ||
              event.key === 'Spacebar')
          ) {
            event.preventDefault();
            onClick();
          }
        }}
        {...rest}
      >
        {children}
      </StyledCard>
    </CardContext.Provider>
  );
}
Card.Header = CardHeader;
Card.Body = CardBody;
Card.BodyContainer = CardBodyContainer;
export { Card };
