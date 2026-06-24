import React, { useLayoutEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../src/lib/spacing';
import { fontWeight, navbarHeight } from '../src/lib/style/theme';
import { getThemePropSelector } from '../src/lib/utils';
import { Dropdown } from '../src/lib/components/dropdown/Dropdown.component';
import { type IconName } from '../src/lib/components/icon/Icon.component';
import { useContainerWidth } from '../src/lib/components/responsive/useContainerWidth';
import { computeVisibleCount } from '../src/lib/components/navbar/Navbar.component';

// Re-exported so the unit test can import the shipped greedy-fit helper from
// here; the Navbar component now owns the canonical implementation.
export { computeVisibleCount };

export type NavItem = {
  key: string;
  label: string;
  shortLabel: string;
  icon: IconName;
  selected?: boolean;
  onClick: () => void;
};

export const NAV_ITEMS: NavItem[] = [
  { key: 'overview', label: 'Overview', shortLabel: 'Overview', icon: 'Dashboard', onClick: () => { } },
  { key: 'identity', label: 'Identity', shortLabel: 'Identity', icon: 'Simple-user', onClick: () => { } },
  { key: 'platform', label: 'Platform', shortLabel: 'Platform', icon: 'Node-backend', onClick: () => { } },
  { key: 'storage', label: 'Storage Services', shortLabel: 'Storage', icon: 'Node-pdf', onClick: () => { } },
  // Selected mock placed late in the list so the "always show selected" pin is
  // visible: it stays inline even when the earlier tabs overflow into the menu.
  { key: 'data', label: 'Data Management', shortLabel: 'Data', icon: 'Folder', selected: true, onClick: () => { } },
  { key: 'alerts', label: 'Alerts', shortLabel: 'Alerts', icon: 'Alert', onClick: () => { } },
];

const StripRoot = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  align-items: center;

  /* Make any Dropdown trigger inside the strip match the navbar item look. */
  .sc-dropdown .trigger {
    height: ${navbarHeight};
    white-space: nowrap;
    background-color: transparent;
    border: none;
    &:hover {
      background-color: ${getThemePropSelector('highlight')};
    }
  }
`;

const tabBase = css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: ${spacing.r8};
  height: ${navbarHeight};
  padding: 0 ${spacing.r16};
  border: none;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  color: ${getThemePropSelector('textPrimary')};
  border-bottom: ${spacing.r2} solid transparent;
  &:hover {
    background-color: ${getThemePropSelector('highlight')};
  }
`;

const TabButton = styled.button<{ selected?: boolean }>`
  ${tabBase}
  ${(props) =>
    props.selected &&
    css`
      font-weight: ${fontWeight.bold};
      border-bottom-color: ${props.theme.selectedActive};
    `}
`;

const MeasureRow = styled.div`
  position: absolute;
  top: -9999px;
  left: 0;
  visibility: hidden;
  pointer-events: none;
  display: flex;
  white-space: nowrap;
`;

const toDropdownItems = (items: NavItem[]) =>
  items.map((item) => ({
    label: item.label,
    selected: item.selected,
    onClick: item.onClick,
  }));

/**
 * Priority+ overflow: show as many tabs as fit, the rest in a "More" menu.
 * Widths are captured from a hidden mirror row (full size) so hiding tabs
 * never zeroes their measured width.
 */
export function PriorityTabStrip({ items }: { items: NavItem[] }) {
  const { ref: containerRef, width } = useContainerWidth<HTMLDivElement>(0);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const [moreWidth, setMoreWidth] = useState(0);

  useLayoutEffect(() => {
    setItemWidths(itemRefs.current.map((el) => el?.offsetWidth ?? 0));
    setMoreWidth(moreRef.current?.offsetWidth ?? 0);
  }, [items]);

  const measured = itemWidths.length === items.length;
  const available = width ?? Infinity;
  const visibleCount = measured
    ? computeVisibleCount(itemWidths, moreWidth, available)
    : items.length;

  const selectedIndex = items.findIndex((item) => item.selected);
  let visible: NavItem[];
  let overflow: NavItem[];
  if (visibleCount >= items.length) {
    visible = items;
    overflow = [];
  } else {
    // Keep at least one inline slot when there is a selected tab, so the
    // current location is always shown even if it would otherwise overflow.
    const slots = Math.max(visibleCount, selectedIndex >= 0 ? 1 : 0);
    const chosen =
      selectedIndex >= slots
        ? [...items.slice(0, Math.max(slots - 1, 0)), items[selectedIndex]]
        : items.slice(0, slots);
    const chosenKeys = new Set(chosen.map((item) => item.key));
    visible = items.filter((item) => chosenKeys.has(item.key)); // preserve order
    overflow = items.filter((item) => !chosenKeys.has(item.key));
  }

  return (
    <StripRoot ref={containerRef}>
      <MeasureRow aria-hidden>
        {items.map((item, i) => (
          <TabButton
            key={item.key}
            selected={item.selected}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
          >
            {item.label}
          </TabButton>
        ))}
        <div ref={moreRef}>
          <Dropdown text="More" items={[]} />
        </div>
      </MeasureRow>

      {visible.map((item) => (
        <TabButton
          key={item.key}
          selected={item.selected}
          onClick={item.onClick}
          aria-current={item.selected ? 'page' : undefined}
        >
          {item.label}
        </TabButton>
      ))}
      {overflow.length > 0 && (
        <Dropdown
          text={visible.length === 0 ? 'Menu' : 'More'}
          items={toDropdownItems(overflow)}
        />
      )}
    </StripRoot>
  );
}

