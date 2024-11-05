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

const AccordionContainer = styled(Box)`
  width: 100%;
  height: auto;
`;

const AccordionHeader = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  width: 100%;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.textPrimary};
  padding: 0;
  font-family: 'Lato';
`;
const AccordionContent = styled.div<{
  isOpen: boolean;
}>`
  overflow: hidden;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition:
    height 0.3s ease-in,
    opacity 0.3s ease-in,
    visibility 0.3s;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
`;
const Wrapper = styled.div`
  padding: ${spacing.r8} 0 ${spacing.r8} 0;
`;

export const Accordion = ({ title, id, style, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleContent = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    setIsOpen((prev) => !prev);
  };

  return (
    <AccordionContainer>
      <h3 style={{ margin: 0 }}>
        <AccordionHeader
          type="button"
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

      <AccordionContent
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
      </AccordionContent>
    </AccordionContainer>
  );
};
