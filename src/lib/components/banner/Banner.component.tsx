import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector, getThemeVariantSelector } from '../../utils';
import { Variant } from '../constants';

export type Props = {
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  variant: Variant;
};

const BannerContainer = styled.div<{ variant: Variant }>`
  display: flex;
  padding: ${defaultTheme.padding.small};
  font-size: ${defaultTheme.fontSize.small};
  color: ${getThemePropSelector('textPrimary')};
  align-items: center;

  border: 1px solid;
  border-left: 5px solid;
  border-radius: 3px;
  border-color: ${getThemeVariantSelector()};
  background-color: ${getThemePropSelector('backgroundLevel1')};
  i {
    display: flex;
    align-items: center;
    margin-left: ${defaultTheme.padding.small};
    color: ${getThemeVariantSelector()};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.span`
  margin-left: ${defaultTheme.padding.base};
`;
const Title = styled.div`
  margin-left: ${defaultTheme.padding.base};
  font-weight: ${defaultTheme.fontWeight.bold};
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
