import React from 'react';
import styled from 'styled-components';
import { Stack } from '../../spacing';
import { defaultTheme } from '../../style/theme';
import { Icon } from '../icon/Icon.component';
import { Link, Text } from '../text/Text.component';
import { useComputeBackgroundColor } from './InfoMessageUtils';

type Props = {
  title: string | React.ReactNode;
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

export const InfoMessage = ({ title, content, link }: Props) => {
  const { containerRef, backgroundColor } = useComputeBackgroundColor();

  return (
    <InfoMessageContainer
      ref={containerRef}
      style={{ backgroundColor: backgroundColor }}
    >
      <Stack>
        <Icon
          name="Info-circle"
          color={defaultTheme.darkRebrand.infoPrimary}
          size="lg"
        />
        {typeof title === 'string' ? <Text isEmphazed>{title}</Text> : title}
      </Stack>
      <Text color="textSecondary" isGentleEmphazed>
        {content}
      </Text>
      {link && (
        <Link href={link} target="_blank" style={{ alignSelf: 'flex-end' }}>
          More infos <Icon name="External-link"></Icon>
        </Link>
      )}
    </InfoMessageContainer>
  );
};
