/**
 * Exploration of Sort By / Group By control styles.
 * 10 variants to compare before choosing one for the ARTESCA Deployments template.
 */
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled, { useTheme } from 'styled-components';
import { CoreUiThemeProvider } from '../../src/lib/next';
import { Stack, spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { getThemePropSelector } from '../../src/lib/utils';
import { CoreUITheme, coreUIAvailableThemes } from '../../src/lib/style/theme';

type SortKey = 'name' | 'data' | 'version';
type GroupKey = 'none' | 'label' | 'status' | 'version';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'name',    label: 'Name' },
  { key: 'data',    label: 'Managed data' },
  { key: 'version', label: 'Version' },
];

const GROUP_OPTIONS: { key: GroupKey; label: string }[] = [
  { key: 'none',    label: 'None' },
  { key: 'label',   label: 'Label' },
  { key: 'status',  label: 'Status' },
  { key: 'version', label: 'Version' },
];

// ── Shared primitives ──────────────────────────────────────────────────────────

const Page = styled.div`
  background: ${getThemePropSelector('backgroundLevel2')};
  min-height: 100vh;
  padding: ${spacing.r32};
  display: flex;
  flex-direction: column;
  gap: ${spacing.r40};
`;

const VariantRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r12};
`;

const Label = styled.div`
  font-size: 11px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${getThemePropSelector('textSecondary')};
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r24};
  flex-wrap: wrap;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
`;

const ControlGroupLabel = styled.span`
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textSecondary')};
  white-space: nowrap;
`;

// Invisible arrow placeholder to prevent layout shift
const SortArrow = ({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) => (
  <span style={{ opacity: active ? 1 : 0, fontSize: 10, lineHeight: 1 }}>{dir === 'asc' ? '↑' : '↓'}</span>
);

// ── Variant hooks (each variant has independent state) ─────────────────────────

function useControls() {
  const [sort, setSort] = useState<SortKey>('name');
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const [group, setGroup] = useState<GroupKey>('none');

  const handleSort = (key: SortKey) => {
    if (sort === key) setDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSort(key); setDir('asc'); }
  };

  return { sort, dir, group, handleSort, setGroup };
}

// ── Variant 1 — Segmented group, filled active (current) ──────────────────────

const V1Btn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 ${spacing.r12};
  background: ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  color: ${({ $active, theme }) => $active ? 'white' : (theme as CoreUITheme).textSecondary};
  border: none;
  border-left: 1px solid ${getThemePropSelector('border')};
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  &:first-child { border-left: none; }
  &:hover { background: ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : (theme as CoreUITheme).highlight}; color: white; }
`;
const V1Group = styled.div`
  display: inline-flex;
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 4px;
  overflow: hidden;
`;

function Variant1() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <ControlGroup>
        <ControlGroupLabel>Sort by</ControlGroupLabel>
        <V1Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V1Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V1Btn>
          ))}
        </V1Group>
      </ControlGroup>
      <ControlGroup>
        <ControlGroupLabel>Group by</ControlGroupLabel>
        <V1Group>
          {GROUP_OPTIONS.map(({ key, label }) => (
            <V1Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V1Btn>
          ))}
        </V1Group>
      </ControlGroup>
    </Controls>
  );
}

// ── Variant 2 — Highlight background, no outer border ─────────────────────────

const V2Btn = styled.button<{ $active: boolean }>`
  height: 30px;
  padding: 0 ${spacing.r12};
  background: ${({ $active, theme }) => $active ? (theme as CoreUITheme).highlight : 'transparent'};
  color: ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : (theme as CoreUITheme).textSecondary};
  font-weight: 400;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  &:hover { background: ${getThemePropSelector('highlight')}; color: ${getThemePropSelector('textPrimary')}; }
`;
const V2Group = styled.div`display: inline-flex; gap: 2px;`;

function Variant2() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <ControlGroup>
        <ControlGroupLabel>Sort by</ControlGroupLabel>
        <V2Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V2Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V2Btn>
          ))}
        </V2Group>
      </ControlGroup>
      <ControlGroup>
        <ControlGroupLabel>Group by</ControlGroupLabel>
        <V2Group>
          {GROUP_OPTIONS.map(({ key, label }) => (
            <V2Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V2Btn>
          ))}
        </V2Group>
      </ControlGroup>
    </Controls>
  );
}

// ── Variant 3 — Underline indicator only ──────────────────────────────────────

const V3Btn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 ${spacing.r8};
  background: transparent;
  color: ${({ $active, theme }) => $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  font-weight: 400;
  border: none;
  border-bottom: 2px solid ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  transition: border-color 0.15s, color 0.15s;
  &:hover { color: ${getThemePropSelector('textPrimary')}; }
`;
const V3Group = styled.div`display: inline-flex; gap: ${spacing.r4};`;

function Variant3() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <ControlGroup>
        <ControlGroupLabel>Sort by</ControlGroupLabel>
        <V3Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V3Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V3Btn>
          ))}
        </V3Group>
      </ControlGroup>
      <ControlGroup>
        <ControlGroupLabel>Group by</ControlGroupLabel>
        <V3Group>
          {GROUP_OPTIONS.map(({ key, label }) => (
            <V3Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V3Btn>
          ))}
        </V3Group>
      </ControlGroup>
    </Controls>
  );
}

// ── Variant 4 — Pill/chip, rounded, subtle ────────────────────────────────────

const V4Btn = styled.button<{ $active: boolean }>`
  height: 26px;
  padding: 0 ${spacing.r10};
  background: ${({ $active, theme }) => $active ? (theme as CoreUITheme).backgroundLevel4 : 'transparent'};
  color: ${({ $active, theme }) => $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  border: 1px solid ${({ $active, theme }) => $active ? (theme as CoreUITheme).border : 'transparent'};
  border-radius: 12px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  &:hover { background: ${getThemePropSelector('backgroundLevel4')}; color: ${getThemePropSelector('textPrimary')}; }
`;
const V4Group = styled.div`display: inline-flex; gap: ${spacing.r4};`;

function Variant4() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <ControlGroup>
        <ControlGroupLabel>Sort by</ControlGroupLabel>
        <V4Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V4Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V4Btn>
          ))}
        </V4Group>
      </ControlGroup>
      <ControlGroup>
        <ControlGroupLabel>Group by</ControlGroupLabel>
        <V4Group>
          {GROUP_OPTIONS.map(({ key, label }) => (
            <V4Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V4Btn>
          ))}
        </V4Group>
      </ControlGroup>
    </Controls>
  );
}

// ── Variant 5 — Inline text, separator, bold active ───────────────────────────

const V5Btn = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  font-weight: ${({ $active }) => $active ? 700 : 400};
  color: ${({ $active, theme }) => $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  display: inline-flex; align-items: center; gap: 3px;
  &:hover { color: ${getThemePropSelector('textPrimary')}; }
`;
const V5Sep = styled.span`
  color: ${getThemePropSelector('border')};
  font-size: 13px;
  user-select: none;
`;

function Variant5() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <ControlGroup>
        <ControlGroupLabel>Sort by</ControlGroupLabel>
        {SORT_OPTIONS.map(({ key, label }, i) => (
          <React.Fragment key={key}>
            {i > 0 && <V5Sep>·</V5Sep>}
            <V5Btn $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V5Btn>
          </React.Fragment>
        ))}
      </ControlGroup>
      <ControlGroup>
        <ControlGroupLabel>Group by</ControlGroupLabel>
        {GROUP_OPTIONS.map(({ key, label }, i) => (
          <React.Fragment key={key}>
            {i > 0 && <V5Sep>·</V5Sep>}
            <V5Btn $active={group === key} onClick={() => setGroup(key)}>{label}</V5Btn>
          </React.Fragment>
        ))}
      </ControlGroup>
    </Controls>
  );
}

// ── Variant 6 — Outlined ghost, border appears on active ──────────────────────

const V6Btn = styled.button<{ $active: boolean }>`
  height: 28px;
  padding: 0 ${spacing.r10};
  background: transparent;
  color: ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : (theme as CoreUITheme).textSecondary};
  border: 1px solid ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  &:hover { border-color: ${getThemePropSelector('border')}; color: ${getThemePropSelector('textPrimary')}; }
`;
const V6Group = styled.div`display: inline-flex; gap: 2px;`;

function Variant6() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <ControlGroup>
        <ControlGroupLabel>Sort by</ControlGroupLabel>
        <V6Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V6Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V6Btn>
          ))}
        </V6Group>
      </ControlGroup>
      <ControlGroup>
        <ControlGroupLabel>Group by</ControlGroupLabel>
        <V6Group>
          {GROUP_OPTIONS.map(({ key, label }) => (
            <V6Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V6Btn>
          ))}
        </V6Group>
      </ControlGroup>
    </Controls>
  );
}

// ── Variant 7 — Single-line label:value selector (compact dropdown feel) ──────

const V7Selector = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.r6};
  height: 30px;
  padding: 0 ${spacing.r10};
  background: ${getThemePropSelector('backgroundLevel3')};
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  &:hover { border-color: ${getThemePropSelector('selectedActive')}; }
`;
const V7Key = styled.span`
  font-size: 11px;
  color: ${getThemePropSelector('textSecondary')};
`;
const V7Val = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${getThemePropSelector('textPrimary')};
`;
const V7Chevron = styled.span`
  font-size: 9px;
  color: ${getThemePropSelector('textSecondary')};
  margin-left: 2px;
`;

// For this variant we cycle through options on click
function Variant7() {
  const [sortIdx, setSortIdx] = useState(0);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const [groupIdx, setGroupIdx] = useState(0);

  const cycleSort = () => {
    const next = (sortIdx + 1) % SORT_OPTIONS.length;
    if (next === sortIdx) setDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    setSortIdx(next);
  };

  return (
    <Controls>
      <V7Selector onClick={cycleSort}>
        <V7Key>Sort</V7Key>
        <V7Val>{SORT_OPTIONS[sortIdx].label} {dir === 'asc' ? '↑' : '↓'}</V7Val>
        <V7Chevron>▾</V7Chevron>
      </V7Selector>
      <V7Selector onClick={() => setGroupIdx((i) => (i + 1) % GROUP_OPTIONS.length)}>
        <V7Key>Group</V7Key>
        <V7Val>{GROUP_OPTIONS[groupIdx].label}</V7Val>
        <V7Chevron>▾</V7Chevron>
      </V7Selector>
    </Controls>
  );
}

// ── Variant 8 — backgroundLevel3 fill, very flat ──────────────────────────────

const V8Group = styled.div`
  display: inline-flex;
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 4px;
  padding: 2px;
  gap: 2px;
`;
const V8Btn = styled.button<{ $active: boolean }>`
  height: 26px;
  padding: 0 ${spacing.r10};
  background: ${({ $active, theme }) => $active ? (theme as CoreUITheme).backgroundLevel4 : 'transparent'};
  color: ${({ $active, theme }) => $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  &:hover { background: ${getThemePropSelector('backgroundLevel4')}; color: ${getThemePropSelector('textPrimary')}; }
`;

function Variant8() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <ControlGroup>
        <ControlGroupLabel>Sort by</ControlGroupLabel>
        <V8Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V8Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V8Btn>
          ))}
        </V8Group>
      </ControlGroup>
      <ControlGroup>
        <ControlGroupLabel>Group by</ControlGroupLabel>
        <V8Group>
          {GROUP_OPTIONS.map(({ key, label }) => (
            <V8Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V8Btn>
          ))}
        </V8Group>
      </ControlGroup>
    </Controls>
  );
}

// ── Variant 9 — Dot indicator left of active label ────────────────────────────

const V9Btn = styled.button<{ $active: boolean }>`
  height: 28px;
  padding: 0 ${spacing.r8};
  background: transparent;
  color: ${({ $active, theme }) => $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r6};
  &:hover { color: ${getThemePropSelector('textPrimary')}; }
`;
const V9Dot = styled.span<{ $active: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  border: 1px solid ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : (theme as CoreUITheme).border};
  flex-shrink: 0;
`;
const V9Group = styled.div`
  display: inline-flex;
  gap: 0;
  border-left: 1px solid ${getThemePropSelector('border')};
  padding-left: ${spacing.r8};
`;

function Variant9() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <ControlGroup>
        <ControlGroupLabel>Sort by</ControlGroupLabel>
        <V9Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V9Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              <V9Dot $active={sort === key} />
              {label}<SortArrow active={sort === key} dir={dir} />
            </V9Btn>
          ))}
        </V9Group>
      </ControlGroup>
      <ControlGroup>
        <ControlGroupLabel>Group by</ControlGroupLabel>
        <V9Group>
          {GROUP_OPTIONS.map(({ key, label }) => (
            <V9Btn key={key} $active={group === key} onClick={() => setGroup(key)}>
              <V9Dot $active={group === key} />
              {label}
            </V9Btn>
          ))}
        </V9Group>
      </ControlGroup>
    </Controls>
  );
}

// ── Variant 10 — Left-border accent on active ─────────────────────────────────

const V10Group = styled.div`
  display: inline-flex;
  align-items: stretch;
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 4px;
  overflow: hidden;
`;
const V10Btn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 ${spacing.r12};
  background: transparent;
  color: ${({ $active, theme }) => $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  border: none;
  border-left: 2px solid ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  &:hover { color: ${getThemePropSelector('textPrimary')}; background: ${getThemePropSelector('backgroundLevel4')}; }
`;

function Variant10() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <ControlGroup>
        <ControlGroupLabel>Sort by</ControlGroupLabel>
        <V10Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V10Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V10Btn>
          ))}
        </V10Group>
      </ControlGroup>
      <ControlGroup>
        <ControlGroupLabel>Group by</ControlGroupLabel>
        <V10Group>
          {GROUP_OPTIONS.map(({ key, label }) => (
            <V10Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V10Btn>
          ))}
        </V10Group>
      </ControlGroup>
    </Controls>
  );
}

// ── Variant 11 — Underline active + label separated by vertical rule ──────────
// Mix of 1 & 3: underline indicator, label clearly a category via a vertical
// separator and uppercase treatment.

const V11Label = styled.span`
  font-size: 10px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${getThemePropSelector('textSecondary')};
  white-space: nowrap;
  padding-right: ${spacing.r10};
  border-right: 1px solid ${getThemePropSelector('border')};
`;
const V11Btn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 ${spacing.r10};
  background: transparent;
  color: ${({ $active, theme }) => $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  font-weight: 400;
  border: none;
  border-bottom: 2px solid ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  transition: border-color 0.15s, color 0.15s;
  &:hover { color: ${getThemePropSelector('textPrimary')}; }
`;
const V11Group = styled.div`display: inline-flex; align-items: center; gap: ${spacing.r4};`;

function Variant11() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <V11Group>
        <V11Label>Sort by</V11Label>
        {SORT_OPTIONS.map(({ key, label }) => (
          <V11Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
            {label}<SortArrow active={sort === key} dir={dir} />
          </V11Btn>
        ))}
      </V11Group>
      <V11Group>
        <V11Label>Group by</V11Label>
        {GROUP_OPTIONS.map(({ key, label }) => (
          <V11Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V11Btn>
        ))}
      </V11Group>
    </Controls>
  );
}

// ── Variant 12 — Underline active + label as a distinct muted badge ────────────
// The label is visually a "chip" so it can't be confused with an option.

const V12Label = styled.span`
  font-size: 11px;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  color: ${getThemePropSelector('textSecondary')};
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 3px;
  padding: 2px ${spacing.r8};
  white-space: nowrap;
  flex-shrink: 0;
`;
const V12Btn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 ${spacing.r8};
  background: transparent;
  color: ${({ $active, theme }) => $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  font-weight: 400;
  border: none;
  border-bottom: 2px solid ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  transition: border-color 0.15s, color 0.15s;
  &:hover { color: ${getThemePropSelector('textPrimary')}; }
`;
const V12Group = styled.div`display: inline-flex; align-items: center; gap: ${spacing.r8};`;

function Variant12() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <V12Group>
        <V12Label>Sort by</V12Label>
        {SORT_OPTIONS.map(({ key, label }) => (
          <V12Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
            {label}<SortArrow active={sort === key} dir={dir} />
          </V12Btn>
        ))}
      </V12Group>
      <V12Group>
        <V12Label>Group by</V12Label>
        {GROUP_OPTIONS.map(({ key, label }) => (
          <V12Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V12Btn>
        ))}
      </V12Group>
    </Controls>
  );
}

// ── Variant 13 — Underline + subtle tint on active + uppercase label ──────────
// Mixes V1's "something fills" feel with V3's underline lightness.
// Active = very light tint background + underline. Label is uppercase, no border.

const V13Label = styled.span`
  font-size: 10px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${getThemePropSelector('textSecondary')};
  white-space: nowrap;
`;
const V13Btn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 ${spacing.r10};
  background: ${({ $active, theme }) =>
    $active ? `${(theme as CoreUITheme).selectedActive}1a` : 'transparent'};
  color: ${({ $active, theme }) => $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  font-weight: 400;
  border: none;
  border-bottom: 2px solid ${({ $active, theme }) => $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  border-radius: 3px 3px 0 0;
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  &:hover { background: ${({ theme }) => `${(theme as CoreUITheme).selectedActive}0d`}; color: ${getThemePropSelector('textPrimary')}; }
`;
const V13Group = styled.div`display: inline-flex; align-items: center; gap: ${spacing.r4};`;

function Variant13() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <V13Group>
        <V13Label>Sort by</V13Label>
        {SORT_OPTIONS.map(({ key, label }) => (
          <V13Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
            {label}<SortArrow active={sort === key} dir={dir} />
          </V13Btn>
        ))}
      </V13Group>
      <V13Group>
        <V13Label>Group by</V13Label>
        {GROUP_OPTIONS.map(({ key, label }) => (
          <V13Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V13Btn>
        ))}
      </V13Group>
    </Controls>
  );
}

// ── Variants 14–16 — Bordered group (V1) + tint+underline active (V13) ────────

// Variant 14 — Border group + tint + underline, label uppercase with vertical rule
const V14Group = styled.div`
  display: inline-flex;
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 4px;
  overflow: hidden;
`;
const V14Btn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 ${spacing.r12};
  background: ${({ $active, theme }) =>
    $active ? `${(theme as CoreUITheme).selectedActive}1a` : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  font-weight: 400;
  border: none;
  border-left: 1px solid ${getThemePropSelector('border')};
  border-bottom: 2px solid ${({ $active, theme }) =>
    $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  &:first-child { border-left: none; }
  &:hover {
    background: ${({ theme }) => `${(theme as CoreUITheme).selectedActive}0d`};
    color: ${getThemePropSelector('textPrimary')};
  }
`;
const V14Label = styled.span`
  font-size: 10px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${getThemePropSelector('textSecondary')};
  white-space: nowrap;
  padding-right: ${spacing.r10};
  border-right: 1px solid ${getThemePropSelector('border')};
`;
const V14Row = styled.div`display: inline-flex; align-items: center; gap: ${spacing.r8};`;

function Variant14() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <V14Row>
        <V14Label>Sort by</V14Label>
        <V14Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V14Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V14Btn>
          ))}
        </V14Group>
      </V14Row>
      <V14Row>
        <V14Label>Group by</V14Label>
        <V14Group>
          {GROUP_OPTIONS.map(({ key, label }) => (
            <V14Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V14Btn>
          ))}
        </V14Group>
      </V14Row>
    </Controls>
  );
}

// Variant 15 — Border group + tint + underline, label as muted badge (V12 label style)
const V15Group = styled.div`
  display: inline-flex;
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 4px;
  overflow: hidden;
`;
const V15Btn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 ${spacing.r12};
  background: ${({ $active, theme }) =>
    $active ? `${(theme as CoreUITheme).selectedActive}1a` : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  font-weight: 400;
  border: none;
  border-left: 1px solid ${getThemePropSelector('border')};
  border-bottom: 2px solid ${({ $active, theme }) =>
    $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  &:first-child { border-left: none; }
  &:hover {
    background: ${({ theme }) => `${(theme as CoreUITheme).selectedActive}0d`};
    color: ${getThemePropSelector('textPrimary')};
  }
`;
const V15Label = styled.span`
  font-size: 11px;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  color: ${getThemePropSelector('textSecondary')};
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 3px;
  padding: 2px ${spacing.r8};
  white-space: nowrap;
  flex-shrink: 0;
`;
const V15Row = styled.div`display: inline-flex; align-items: center; gap: ${spacing.r8};`;

function Variant15() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <V15Row>
        <V15Label>Sort by</V15Label>
        <V15Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V15Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V15Btn>
          ))}
        </V15Group>
      </V15Row>
      <V15Row>
        <V15Label>Group by</V15Label>
        <V15Group>
          {GROUP_OPTIONS.map(({ key, label }) => (
            <V15Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V15Btn>
          ))}
        </V15Group>
      </V15Row>
    </Controls>
  );
}

// Variant 16 — Border group + tint only (no underline), label plain textSecondary
// The tint alone is enough contrast; cleaner without the underline.
const V16Group = styled.div`
  display: inline-flex;
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 4px;
  overflow: hidden;
`;
const V16Btn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 ${spacing.r12};
  background: ${({ $active, theme }) =>
    $active ? `${(theme as CoreUITheme).selectedActive}22` : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  font-weight: 400;
  border: none;
  border-left: 1px solid ${getThemePropSelector('border')};
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  transition: background 0.15s, color 0.15s;
  &:first-child { border-left: none; }
  &:hover {
    background: ${({ theme }) => `${(theme as CoreUITheme).selectedActive}0d`};
    color: ${getThemePropSelector('textPrimary')};
  }
`;
const V16Label = styled.span`
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textSecondary')};
  white-space: nowrap;
`;
const V16Row = styled.div`display: inline-flex; align-items: center; gap: ${spacing.r8};`;

function Variant16() {
  const { sort, dir, group, handleSort, setGroup } = useControls();
  return (
    <Controls>
      <V16Row>
        <V16Label>Sort by</V16Label>
        <V16Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V16Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V16Btn>
          ))}
        </V16Group>
      </V16Row>
      <V16Row>
        <V16Label>Group by</V16Label>
        <V16Group>
          {GROUP_OPTIONS.map(({ key, label }) => (
            <V16Btn key={key} $active={group === key} onClick={() => setGroup(key)}>{label}</V16Btn>
          ))}
        </V16Group>
      </V16Row>
    </Controls>
  );
}

// Variant 17 — Frame (V1) + tint + underline (V14 buttons) + plain lowercase label (V16)
const V17Group = styled.div`
  display: inline-flex;
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 4px;
  overflow: hidden;
`;
const V17Btn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 ${spacing.r12};
  background: ${({ $active, theme }) =>
    $active ? `${(theme as CoreUITheme).selectedActive}1a` : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? (theme as CoreUITheme).textPrimary : (theme as CoreUITheme).textSecondary};
  font-weight: 400;
  border: none;
  border-left: 1px solid ${getThemePropSelector('border')};
  border-bottom: 2px solid ${({ $active, theme }) =>
    $active ? (theme as CoreUITheme).selectedActive : 'transparent'};
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  display: flex; align-items: center; gap: ${spacing.r4};
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  &:first-child { border-left: none; }
  &:hover {
    background: ${({ theme }) => `${(theme as CoreUITheme).selectedActive}0d`};
    color: ${getThemePropSelector('textPrimary')};
  }
`;
const V17Label = styled.span`
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textSecondary')};
  white-space: nowrap;
`;
const V17Row = styled.div`display: inline-flex; align-items: center; gap: ${spacing.r8};`;

const GROUP_OPTIONS_NO_NONE = GROUP_OPTIONS.filter(({ key }) => key !== 'none');

function Variant17() {
  const { sort, dir, handleSort } = useControls();
  const [group, setGroup] = useState<GroupKey | null>(null);

  const handleGroup = (key: GroupKey) => {
    setGroup((current) => (current === key ? null : key));
  };

  return (
    <Controls>
      <V17Row>
        <V17Label>Sort by</V17Label>
        <V17Group>
          {SORT_OPTIONS.map(({ key, label }) => (
            <V17Btn key={key} $active={sort === key} onClick={() => handleSort(key)}>
              {label}<SortArrow active={sort === key} dir={dir} />
            </V17Btn>
          ))}
        </V17Group>
      </V17Row>
      <V17Row>
        <V17Label>Group by</V17Label>
        <V17Group>
          {GROUP_OPTIONS_NO_NONE.map(({ key, label }) => (
            <V17Btn key={key} $active={group === key} onClick={() => handleGroup(key)}>{label}</V17Btn>
          ))}
        </V17Group>
      </V17Row>
    </Controls>
  );
}

// ── Explorer ───────────────────────────────────────────────────────────────────

const VARIANTS = [
  { n: 1,  name: 'Segmented — filled active (current)',         Component: Variant1 },
  { n: 2,  name: 'Segmented — highlight bg, blue text',        Component: Variant2 },
  { n: 3,  name: 'Underline indicator only',                    Component: Variant3 },
  { n: 4,  name: 'Pill chips, subtle border',                   Component: Variant4 },
  { n: 5,  name: 'Inline text with · separator',               Component: Variant5 },
  { n: 6,  name: 'Ghost border — appears only on active',       Component: Variant6 },
  { n: 7,  name: 'Compact selector (click to cycle)',           Component: Variant7 },
  { n: 8,  name: 'Flat — backgroundLevel3 tray, level4 active', Component: Variant8 },
  { n: 9,  name: 'Dot indicator left of label',                 Component: Variant9 },
  { n: 10, name: 'Left-border accent on active',                Component: Variant10 },
  { n: 11, name: 'Underline + vertical rule separates label',  Component: Variant11 },
  { n: 12, name: 'Underline + label as muted badge/chip',      Component: Variant12 },
  { n: 13, name: 'Underline + tint on active + uppercase label', Component: Variant13 },
  { n: 14, name: 'Frame (V1) + tint + underline, uppercase label with rule', Component: Variant14 },
  { n: 15, name: 'Frame (V1) + tint + underline, label as badge', Component: Variant15 },
  { n: 16, name: 'Frame (V1) + tint only, no underline, plain label', Component: Variant16 },
  { n: 17, name: 'Frame (V1) + tint + underline (V14) + plain lowercase label (V16)', Component: Variant17 },
];

const Divider = styled.div`
  height: 1px;
  background: ${getThemePropSelector('backgroundLevel3')};
`;

const Explorer = () => (
  <Page>
    <div>
      <Text variant="Larger" isEmphazed>Sort By / Group By — style exploration</Text>
      <Text color="textSecondary">Each row is interactive. Click to try the variant.</Text>
    </div>
    <Divider />
    {VARIANTS.map(({ n, name, Component }, i) => (
      <React.Fragment key={n}>
        <VariantRow>
          <Label>{n}. {name}</Label>
          <Component />
        </VariantRow>
        {i < VARIANTS.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </Page>
);

// ── Storybook meta ─────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Sort-Group Exploration',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
      <Explorer />
    </CoreUiThemeProvider>
  ),
};
