import React, { useState } from 'react';

import { spacing, Stack } from '../../spacing';
import { Box } from '../box/Box';
import { Icon } from '../icon/Icon.component';

import styled from 'styled-components';

import { Text } from '../text/Text.component';

export type AccordionProps = {
  title: string;
  id: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const AccordionHeader = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  gap: ${spacing.r8};
  width: 100%;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.textPrimary};
  padding: ${spacing.r4};
  width: 100%;
`;
const AccordionContainer = styled.div<{
  isOpen: boolean;
}>`
  overflow: hidden;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: height 0.3s ease-in, opacity 0.3s ease-in, visibility 0.3s;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
`;
const Wrapper = styled.div`
  padding-block: ${spacing.r8};
`;

export const Accordion = ({ title, id, style, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleContent = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box style={{ width: '100%', height: 'auto' }}>
      <h3 style={{ margin: 0 }}>
        <AccordionHeader
          id={`Accordion-header-${id}`}
          onClick={handleToggleContent}
          aria-controls={id}
          aria-expanded={isOpen}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && handleToggleContent
          }
        >
          <Stack direction="horizontal" gap="r8">
            <Icon
              name="Chevron-up"
              size="lg"
              style={{
                transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.3s ease-in',
              }}
            />
            <Text isEmphazed>{title}</Text>
          </Stack>
        </AccordionHeader>
      </h3>

      <AccordionContainer
        ref={(element) => {
          if (isOpen) {
            element?.style.setProperty('height', element.scrollHeight + 'px');
          } else {
            element?.style.setProperty('height', '0px');
          }
        }}
        isOpen={isOpen}
        id={id}
        aria-labelledby={`Accordion-header-${id}`}
        role="region"
      >
        <Wrapper style={style}>{children}</Wrapper>
      </AccordionContainer>
    </Box>
  );
};
