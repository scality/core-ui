import { useEffect, useState } from 'react';

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
  open?: boolean;
  isEmphazed?: boolean;
};

const AccordionContainer = styled(Box)`
  width: 100%;
  height: auto;
  padding: ${spacing.r16};
  border-radius: 4px;
  box-sizing: border-box;
  ${({ theme }) => `border: 0.5px solid ${theme.border};`}
`;

const AccordionHeader = styled.button<{
  $isOpen?: boolean;
}>`
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
  ${({ $isOpen, theme }) =>
    $isOpen &&
    `
    border-bottom: 0.5px solid ${theme.border};
    padding-bottom: ${spacing.r16};
    margin-bottom: ${spacing.r8};
  `}
`;

// Animate open/closed by transitioning a single grid row from 0fr to 1fr.
// A 1fr track always resolves to the content's current height, so content that
// grows or shrinks while open follows instantly and is never clipped — no
// height measurement needed.
const AccordionContent = styled.div<{
  $isOpen: boolean;
}>`
  display: grid;
  grid-template-rows: ${(props) => (props.$isOpen ? '1fr' : '0fr')};
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  transition:
    grid-template-rows 0.3s ease-in,
    opacity 0.3s ease-in,
    visibility 0.3s;
`;

// Clips the content while the row collapses (min-height: 0 lets the grid track
// shrink to 0). Once open and fully expanded, overflow is released so a child
// that renders outside the box — a Select menu, dropdown or tooltip — is not
// clipped by the accordion border (ARTESCA-17819).
const ContentClip = styled.div<{
  $isExpanded: boolean;
}>`
  overflow: ${(props) => (props.$isExpanded ? 'visible' : 'hidden')};
  min-height: 0;
`;

const Wrapper = styled.div`
  padding: ${spacing.r8} 0 ${spacing.r8} 0;
`;

export const Accordion = ({
  title,
  id,
  style,
  children,
  open = false,
  isEmphazed = true,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const [previousOpenProp, setPreviousOpenProp] = useState(open);
  // Gates overflow: true only once the open animation has finished, so the
  // box still clips while it animates but lets content escape once settled.
  const [isExpanded, setIsExpanded] = useState(open);

  // Sync to the `open` prop when it changes, while still letting the header
  // toggle drive state in between (adjusting state during render, per React docs).
  if (open !== previousOpenProp) {
    setPreviousOpenProp(open);
    setIsOpen(open);
  }

  useEffect(() => {
    // Re-clip as soon as the accordion starts closing so nothing spills during
    // the collapse animation, and so the next open starts clipped again.
    if (!isOpen) {
      setIsExpanded(false);
    }
  }, [isOpen]);

  const handleToggleContent = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Only react to this element's own row transition finishing, not a
    // transition bubbling up from a descendant.
    if (
      e.target === e.currentTarget &&
      e.propertyName === 'grid-template-rows' &&
      isOpen
    ) {
      setIsExpanded(true);
    }
  };

  return (
    <AccordionContainer>
      <h3 style={{ margin: 0 }}>
        <AccordionHeader
          $isOpen={isOpen}
          type="button"
          id={`Accordion-header-${id}`}
          onClick={handleToggleContent}
          aria-controls={id}
          aria-expanded={isOpen}
        >
          <Stack direction="horizontal" gap="r8">
            <Icon
              name="Chevron-up"
              size="lg"
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(90deg)',
                transition: 'transform 0.3s ease-in',
              }}
            />
            <Text isEmphazed={isEmphazed}>{title}</Text>
          </Stack>
        </AccordionHeader>
      </h3>

      <AccordionContent
        $isOpen={isOpen}
        onTransitionEnd={handleTransitionEnd}
        id={id}
        aria-labelledby={`Accordion-header-${id}`}
        role="region"
      >
        <ContentClip $isExpanded={isOpen && isExpanded}>
          <Wrapper style={style}>{children}</Wrapper>
        </ContentClip>
      </AccordionContent>
    </AccordionContainer>
  );
};
