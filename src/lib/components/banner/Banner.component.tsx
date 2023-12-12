import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize, fontWeight } from '../../style/theme';
import { getThemeVariantSelector } from '../../utils';
import { Variant } from '../constants';

export type Props = {
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  variant: Variant;
};

const BannerContainer = styled.div<{ variant: Variant }>`
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
    i {
      display: flex;
      align-items: center;
      margin-left: ${spacing.r8};
      color: ${getThemeVariantSelector()};
    }
  `}
`;

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

function Banner({ icon, title, children, variant, ...rest }: Props) {
  return (
    <BannerContainer className="sc-banner" variant={variant}>
      {icon}
      <TextContainer>
        {title && <Title>{title}</Title>}
        <Text>{children}</Text>
      </TextContainer>
    </BannerContainer>
  );
}

export { Banner };
