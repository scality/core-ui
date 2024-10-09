import React, { useRef, useState } from 'react';

import { Box } from '../box/Box';
import { Icon } from '../icon/Icon.component';
import { spacing, Stack } from '../../spacing';

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
  computedHeight: string;
}>`
  overflow: hidden;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  height: ${(props) => props.computedHeight};
  transition: height 0.3s ease-in, opacity 0.3s ease-in, visibility 0.3s;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
`;
const Wrapper = styled.div`
  padding: ${spacing.r16};
  background-color: ${(props) => props.theme.backgroundLevel2};
  padding-left: ${spacing.r24};
  border-radius: ${spacing.r4};
`;

export const Accordion = ({ title, id, style, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleToggleContent = () => {
    setIsOpen((prev) => !prev);
  };
  const calcContentHeight = () => {
    if (containerRef.current && isOpen) {
      const height = containerRef.current.scrollHeight;
      return height + 'px';
    } else return '0px';
  };

  return (
    <Box style={{ width: '100%' }}>
      <h3 style={{ margin: 0 }}>
        <AccordionHeader
          id={`Accordion header ${id}`}
          onClick={handleToggleContent}
          aria-controls={id}
          aria-expanded={isOpen}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && handleToggleContent
          }
        >
          <Stack direction="horizontal" gap="r10">
            <Icon
              name="Chevron-left"
              style={{
                transform: isOpen ? 'rotate(90deg)' : 'rotate(270deg)',
                transition: 'transform 0.3s ease-in',
              }}
            />
            <Text>{title}</Text>
          </Stack>
        </AccordionHeader>
      </h3>

      <AccordionContainer
        ref={containerRef}
        computedHeight={calcContentHeight()}
        isOpen={isOpen}
        id={id}
        aria-labelledby={`Accordion header ${id}`}
        role="region"
      >
        <Wrapper style={style}>{children}</Wrapper>
      </AccordionContainer>
    </Box>
  );
};
