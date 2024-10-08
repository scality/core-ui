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
  padding: ${spacing.r8};
  width: 100%;
`;
const AccordionContent = styled.div<{ height: string }>`
  overflow: hidden;
  background-color: ${(props) => props.theme.backgroundLevel1};
  height: ${(props) => props.height};
  transition: height 0.3s ease-in;
`;
const Wrapper = styled.div`
  padding: ${spacing.r16};
  padding-left: ${spacing.r24};
`;

const Accordion = ({ title, id, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const handleToggleContent = () => {
    setIsOpen((prev) => !prev);
  };
  const calcContentHeight = () => {
    if (contentRef.current && isOpen) {
      const height = contentRef.current.scrollHeight;
      return height + 'px';
    } else return '0px';
  };

  return (
    <Box style={{ width: '100%' }}>
      <h3 style={{ margin: 0 }}>
        <AccordionHeader
          id="panelButton"
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

      <AccordionContent
        ref={contentRef}
        height={calcContentHeight()}
        id={id}
        aria-labelledby="panelButton"
        role="region"
      >
        <Wrapper>{children}</Wrapper>
      </AccordionContent>
    </Box>
  );
};

export default Accordion;
