import { CSSProperties, type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { spacing } from '../../spacing';
import { zIndex } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Button } from '../buttonv2/Buttonv2.component';
import { Icon } from '../icon/Icon.component';
import { Text } from '../text/Text.component';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

type Props = {
  isOpen: boolean;
  close: () => void;
  title: ReactNode;
  position?: DrawerPosition;
  size?: CSSProperties['width'];
  footer?: ReactNode;
  overlay?: boolean;
  showCloseButton?: boolean;
  children: ReactNode;
};

const TRANSITION_DURATION = '250ms';

const DrawerBackdrop = styled.div<{ $overlay: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${zIndex.overlay};
  background: ${({ $overlay }) => ($overlay ? 'rgba(0, 0, 0, 0.3)' : 'transparent')};
`;

function getTransform(position: DrawerPosition, isOpen: boolean): string {
  if (isOpen) return 'translate3d(0, 0, 0)';
  switch (position) {
    case 'left':
      return 'translate3d(-100%, 0, 0)';
    case 'right':
      return 'translate3d(100%, 0, 0)';
    case 'top':
      return 'translate3d(0, -100%, 0)';
    case 'bottom':
      return 'translate3d(0, 100%, 0)';
  }
}

const DrawerPanel = styled.div<{
  $position: DrawerPosition;
  $size: CSSProperties['width'];
  $isOpen: boolean;
}>`
  position: fixed;
  z-index: ${zIndex.drawer};
  background-color: ${getThemePropSelector('backgroundLevel2')};
  color: ${getThemePropSelector('textPrimary')};
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
  transition: transform ${TRANSITION_DURATION} ease-in-out;
  transform: ${({ $position, $isOpen }) => getTransform($position, $isOpen)};

  ${({ $position, $size, theme }) => {
    const borderSide = $position === 'left' ? 'right' : $position === 'right' ? 'left' : $position === 'top' ? 'bottom' : 'top';
    const border = `border-${borderSide}: 1px solid ${theme.border};`;
    switch ($position) {
      case 'left':
        return `top: 0; left: 0; bottom: 0; width: ${$size}; ${border}`;
      case 'right':
        return `top: 0; right: 0; bottom: 0; width: ${$size}; ${border}`;
      case 'top':
        return `top: 0; left: 0; right: 0; height: ${$size}; ${border}`;
      case 'bottom':
        return `bottom: 0; left: 0; right: 0; height: ${$size}; ${border}`;
    }
  }}
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.r16};
  background-color: ${getThemePropSelector('backgroundLevel3')};
`;

const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.r16};
  background-color: ${getThemePropSelector('backgroundLevel4')};
`;

const DrawerFooter = styled.div`
  padding: ${spacing.r16};
  background-color: ${getThemePropSelector('backgroundLevel3')};
  display: flex;
  gap: ${spacing.r8};
  justify-content: flex-end;
`;

const Drawer = ({
  isOpen,
  close,
  title,
  position = 'left',
  size = '400px',
  footer,
  overlay = false,
  showCloseButton = true,
  children,
}: Props) => {
  const drawerContainer = useRef(document.createElement('div'));
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(isOpen);
  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    const container = drawerContainer.current;
    document.body?.prepend(container);
    return () => {
      document.body?.removeChild(container);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      setActive(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (mounted && isOpen) {
      const frame = requestAnimationFrame(() => {
        setActive(true);
        panelRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [mounted, isOpen]);

  const stableClose = useCallback(close, [close]);

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          stableClose();
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen, stableClose]);

  const handleTransitionEnd = () => {
    if (!isOpen) setMounted(false);
  };

  if (!mounted) return null;

  return createPortal(
    <>
      <DrawerBackdrop $overlay={overlay} onClick={stableClose} />
      <DrawerPanel
        ref={panelRef}
        className="sc-drawer"
        $position={position}
        $size={size}
        $isOpen={active}
        role="dialog"
        tabIndex={-1}
        aria-modal={overlay ? 'true' : undefined}
        aria-labelledby="drawer_label"
        onTransitionEnd={handleTransitionEnd}
      >
        <DrawerHeader className="sc-drawer-header">
          <Text variant="Larger" id="drawer_label">
            {title}
          </Text>
          {showCloseButton && (
            <Button
              icon={<Icon name="Close" />}
              onClick={stableClose}
              tooltip={{ overlay: 'Close' }}
              aria-label="Close"
            />
          )}
        </DrawerHeader>
        <DrawerBody className="sc-drawer-body">{children}</DrawerBody>
        {footer && (
          <DrawerFooter className="sc-drawer-footer">
            {footer}
          </DrawerFooter>
        )}
      </DrawerPanel>
    </>,
    drawerContainer.current,
  );
};

export { Drawer };
export type { DrawerPosition };
