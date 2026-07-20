import { useLayoutEffect, useMemo, useRef, useState } from 'react';

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

const AccordionContent = styled.div<{
  $isOpen: boolean;
}>`
  overflow: hidden;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transition:
    height 0.3s ease-in,
    opacity 0.3s ease-in,
    visibility 0.3s;
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
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
  const contentRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useMemo(() => {
    setIsOpen(open);
  }, [open]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const syncHeight = () => {
      content.style.height =
        isOpen && wrapperRef.current
          ? `${wrapperRef.current.offsetHeight}px`
          : '0px';
    };
    syncHeight();

    // While open, follow the content height so it is never clipped when it grows
    // or shrinks (e.g. a responsive Form flipping its fields to a stacked layout).
    if (
      !isOpen ||
      typeof ResizeObserver === 'undefined' ||
      !wrapperRef.current
    ) {
      return;
    }
    const observer = new ResizeObserver(syncHeight);
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [isOpen, children]);

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
          $isOpen={isOpen}
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
                transform: isOpen ? 'rotate(180deg)' : 'rotate(90deg)',
                transition: 'transform 0.3s ease-in',
              }}
            />
            <Text isEmphazed={isEmphazed}>{title}</Text>
          </Stack>
        </AccordionHeader>
      </h3>

      <AccordionContent
        ref={contentRef}
        $isOpen={isOpen}
        id={id}
        aria-labelledby={`Accordion-header-${id}`}
        role="region"
      >
        <Wrapper ref={wrapperRef} style={style}>
          {children}
        </Wrapper>
      </AccordionContent>
    </AccordionContainer>
  );
};
