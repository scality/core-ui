import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize, fontWeight } from '../../style/theme';
import { getThemeVariantSelector, getVariantThemeKey } from '../../utils';
import { Variant } from '../constants';
import { Icon, type IconName } from '../icon/Icon.component';

const BANNER_ICON_SIZE = 'lg';

const DEFAULT_ICON_BY_VARIANT: Record<Variant, IconName> = {
  base: 'Info-circle',
  selected: 'Exclamation-circle',
  healthy: 'Exclamation-circle',
  warning: 'Exclamation-circle',
  danger: 'Exclamation-circle',
};

export type Props = {
  /** When true, shows the default icon (Info-circle for base, Exclamation-circle otherwise) with variant color and "lg" size. 
   * Use icon prop to override the default icon.
  */
  withDefaultIcon?: boolean;
  /** Custom icon element. Overrides withDefaultIcon when provided. */
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  variant: Variant;
};

const BannerContainer = styled.div<{ $variant: Variant }>`
  ${(props) => css`
    color: ${props.theme.textPrimary};
    background-color: ${props.theme.backgroundLevel1};
    display: flex;
    padding: ${spacing.r8};
    align-items: center;
    font-size: ${fontSize.small};
    border: 1px solid;
    border-left: 5px solid;
    border-radius: 3px;
    border-color: ${getThemeVariantSelector()};
  `}
`;

const BannerIconContainerStyled = styled.div<{ $variant: Variant }>`
  ${(props) => css`
    display: flex;
    align-items: center;
    margin-left: ${spacing.r8};
    color: ${getThemeVariantSelector()};
  `}
`;

function BannerIconContainer({
  variant,
  children,
}: {
  variant: Variant;
  children: React.ReactNode;
}) {
  if (children == null) return null;
  return (
    <BannerIconContainerStyled $variant={variant}>
      {children}
    </BannerIconContainerStyled>
  );
}

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.span`
  margin-left: ${spacing.r16};
`;
const Title = styled.div`
  margin-left: ${spacing.r16};
  font-weight: ${fontWeight.bold};
`;

function Banner({ withDefaultIcon = false, icon, title, children, variant, ...rest }: Props) {
  const iconContent =
    icon !== undefined
      ? icon
      : withDefaultIcon
        ? (
          <Icon
            name={DEFAULT_ICON_BY_VARIANT[variant]}
            size={BANNER_ICON_SIZE}
            color={getVariantThemeKey(variant)}
          />
        )
        : null;

  return (
    <BannerContainer $variant={variant}>
      <BannerIconContainer variant={variant}>{iconContent}</BannerIconContainer>
      <TextContainer>
        {title && <Title>{title}</Title>}
        <Text>{children}</Text>
      </TextContainer>
    </BannerContainer>
  );
}

export { Banner };
