import styled from 'styled-components';
import { Link, Text } from '../text/Text.component';
import { Icon } from '../icon/Icon.component';
import { defaultTheme } from '../../style/theme';
import { useComputeBackgroundColor } from './InfoMessageUtils';

type Props = {
  title: string;
  content: React.ReactNode;
  link?: string;
};

const InfoMessageContainer = styled.div`
  background-color: ${defaultTheme.darkRebrand.backgroundLevel2};
  border-radius: 3px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: white;
`;
const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`;

function InfoMessage({ title, content, link }: Props) {
  const { containerRef, backgroundColor } = useComputeBackgroundColor();

  return (
    <InfoMessageContainer
      ref={containerRef}
      style={{ backgroundColor: backgroundColor }}
    >
      <TitleContainer>
        <Icon
          name="Info-circle"
          color={defaultTheme.darkRebrand.infoPrimary}
          size="lg"
        />
        <Text isEmphazed>{title}</Text>
      </TitleContainer>
      <Text color="textSecondary">{content}</Text>
      {link && (
        <Link href={link} target="_blank" style={{ alignSelf: 'flex-end' }}>
          More infos <Icon name="External-link"></Icon>
        </Link>
      )}
    </InfoMessageContainer>
  );
}

export default InfoMessage;
