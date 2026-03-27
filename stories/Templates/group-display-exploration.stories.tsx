/**
 * Exploration of group-by visual display styles.
 * Shows different ways to represent grouped cards in the Maestro Deployments list.
 * Groups are by version for clarity (4 distinct groups).
 */
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled, { useTheme } from 'styled-components';
import { CoreUiThemeProvider } from '../../src/lib/next';
import { spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { getThemePropSelector } from '../../src/lib/utils';
import { CoreUITheme, coreUIAvailableThemes } from '../../src/lib/style/theme';

// ── Mock data (same as Maestro Deployments, grouped by version) ────────────────

type Item = { id: string; name: string; status: 'connected' | 'degraded' | 'disconnected'; version: string };

const ITEMS: Item[] = [
  { id: '1',  name: 'artesca-acme-prod',   status: 'connected',    version: '4.2.0' },
  { id: '2',  name: 'vandelay-primary',    status: 'connected',    version: '4.2.0' },
  { id: '5',  name: 'umbrella-corp-prod',  status: 'connected',    version: '4.2.0' },
  { id: '3',  name: 'artesca-initech-stg', status: 'degraded',     version: '4.1.1' },
  { id: '4',  name: 'ams-dc01',            status: 'connected',    version: '4.1.1' },
  { id: '9',  name: 'artesca-emea-dr',     status: 'connected',    version: '4.1.1' },
  { id: '7',  name: 'fra-prod-02',         status: 'connected',    version: '4.1.0' },
  { id: '8',  name: 'umbrella-backup-eu',  status: 'degraded',     version: '4.1.0' },
  { id: '11', name: 'globex-us-east',      status: 'connected',    version: '4.1.0' },
  { id: '6',  name: 'dev-lab-internal',    status: 'disconnected', version: '3.3.0' },
  { id: '10', name: 'sin-object-01',       status: 'disconnected', version: '3.2.5' },
];

const VERSION_ORDER = ['4.2.0', '4.1.1', '4.1.0', '3.3.0', '3.2.5'];

type Group = { version: string; items: Item[] };

const GROUPS: Group[] = VERSION_ORDER
  .map((v) => ({ version: v, items: ITEMS.filter((d) => d.version === v) }))
  .filter((g) => g.items.length > 0);

const STATUS_ICON: Record<Item['status'], { icon: string; color: (t: CoreUITheme) => string }> = {
  connected:    { icon: 'fa-check-circle',      color: (t) => t.statusHealthy },
  degraded:     { icon: 'fa-exclamation-circle', color: (t) => t.statusWarning },
  disconnected: { icon: 'fa-times-circle',       color: (t) => t.textSecondary },
};

// ── Shared page shell ──────────────────────────────────────────────────────────

const Page = styled.div`
  background: ${getThemePropSelector('backgroundLevel2')};
  min-height: 100vh;
  padding: ${spacing.r32};
  display: flex;
  flex-direction: column;
  gap: ${spacing.r40};
`;

const VariantShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r12};
`;

const VariantLabel = styled.div`
  font-size: 11px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${getThemePropSelector('textSecondary')};
`;

const PageDivider = styled.div`
  height: 1px;
  background: ${getThemePropSelector('backgroundLevel3')};
`;

// Scrollable container, fixed height so variants don't blow up the page
const CardWindow = styled.div`
  height: 380px;
  overflow-y: auto;
  position: relative;
`;

// ── Shared mini-card ───────────────────────────────────────────────────────────

const MiniCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r12};
  height: 40px;
  padding: 0 ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel4')};
  border-radius: 3px;
`;

const CardName = styled.span`
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: ${getThemePropSelector('textLink')};
  flex: 1;
`;

const CardVersion = styled.span`
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textSecondary')};
`;

function MiniCardItem({ item }: { item: Item }) {
  const theme = useTheme() as CoreUITheme;
  const s = STATUS_ICON[item.status];
  return (
    <MiniCard>
      <i className={`fas ${s.icon}`} style={{ fontSize: 14, color: s.color(theme), flexShrink: 0 }} />
      <CardName>{item.name}</CardName>
      <CardVersion>v{item.version}</CardVersion>
    </MiniCard>
  );
}

// ── Variant 1 — Current: centered separator line (baseline) ───────────────────

const V1Sep = styled.div<{ $first?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${({ $first }) => ($first ? spacing.r4 : spacing.r20)} 0 ${spacing.r4};
`;
const V1Line = styled.div`
  flex: 1;
  height: 1px;
  background: ${getThemePropSelector('border')};
`;
const V1Badge = styled.span`
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textSecondary')};
  white-space: nowrap;
`;
const V1List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  padding: ${spacing.r8} 0;
`;

function Variant1() {
  return (
    <CardWindow>
      <V1List>
        {GROUPS.map((g, i) => (
          <React.Fragment key={g.version}>
            <V1Sep $first={i === 0}>
              <V1Line />
              <V1Badge>v{g.version} · {g.items.length}</V1Badge>
              <V1Line />
            </V1Sep>
            {g.items.map((item) => <MiniCardItem key={item.id} item={item} />)}
          </React.Fragment>
        ))}
      </V1List>
    </CardWindow>
  );
}

// ── Variant 2 — Sticky group header, solid background ─────────────────────────

const V2Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${spacing.r12};
  height: 32px;
  padding: 0 ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 3px;
`;
const V2Title = styled.span`
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: ${getThemePropSelector('textPrimary')};
`;
const V2Count = styled.span`
  font-size: 11px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textSecondary')};
`;
const V2Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  padding-bottom: ${spacing.r8};
`;
const V2List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r16};
  padding: ${spacing.r8} 0;
`;

function Variant2() {
  return (
    <CardWindow>
      <V2List>
        {GROUPS.map((g) => (
          <V2Group key={g.version}>
            <V2Header>
              <V2Title>v{g.version}</V2Title>
              <V2Count>{g.items.length} deployments</V2Count>
            </V2Header>
            {g.items.map((item) => <MiniCardItem key={item.id} item={item} />)}
          </V2Group>
        ))}
      </V2List>
    </CardWindow>
  );
}

// ── Variant 3 — Distinct background zone per group ────────────────────────────

const V3Zone = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  padding: ${spacing.r12} ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel1')};
  border-radius: 4px;
`;
const V3Header = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${spacing.r8};
  padding-bottom: ${spacing.r4};
`;
const V3Title = styled.span`
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: ${getThemePropSelector('textPrimary')};
`;
const V3Count = styled.span`
  font-size: 11px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textSecondary')};
`;
const V3List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r16};
  padding: ${spacing.r8} 0;
`;

function Variant3() {
  return (
    <CardWindow>
      <V3List>
        {GROUPS.map((g) => (
          <V3Zone key={g.version}>
            <V3Header>
              <V3Title>v{g.version}</V3Title>
              <V3Count>{g.items.length} deployments</V3Count>
            </V3Header>
            {g.items.map((item) => <MiniCardItem key={item.id} item={item} />)}
          </V3Zone>
        ))}
      </V3List>
    </CardWindow>
  );
}

// ── Variant 4 — Left column label + vertical guide line ───────────────────────

const V4Row = styled.div`
  display: flex;
  gap: 0;
`;
const V4Left = styled.div`
  width: 80px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: ${spacing.r16};
  padding-top: 10px;
  position: relative;
`;
const V4VersionLabel = styled.span`
  font-size: 11px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: ${getThemePropSelector('textSecondary')};
  white-space: nowrap;
`;
const V4Line = styled.div`
  position: absolute;
  top: 30px;
  right: 7px;
  bottom: 0;
  width: 1px;
  background: ${getThemePropSelector('border')};
`;
const V4Dot = styled.div`
  position: absolute;
  top: 12px;
  right: 3px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${getThemePropSelector('backgroundLevel2')};
  border: 2px solid ${getThemePropSelector('border')};
`;
const V4Cards = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  padding-bottom: ${spacing.r16};
`;
const V4List = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing.r8} 0;
`;

function Variant4() {
  return (
    <CardWindow>
      <V4List>
        {GROUPS.map((g) => (
          <V4Row key={g.version}>
            <V4Left>
              <V4VersionLabel>v{g.version}</V4VersionLabel>
              <V4Dot />
              <V4Line />
            </V4Left>
            <V4Cards>
              {g.items.map((item) => <MiniCardItem key={item.id} item={item} />)}
            </V4Cards>
          </V4Row>
        ))}
      </V4List>
    </CardWindow>
  );
}

// ── Variant 5 — Collapsible accordion ─────────────────────────────────────────

const V5Header = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  height: 36px;
  padding: 0 ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel3')};
  border: none;
  border-radius: 3px;
  cursor: pointer;
  text-align: left;
  &:hover { background: ${getThemePropSelector('backgroundLevel4')}; }
`;
const V5Title = styled.span`
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: ${getThemePropSelector('textPrimary')};
  flex: 1;
`;
const V5Count = styled.span`
  font-size: 11px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textSecondary')};
`;
const V5Chevron = styled.span<{ $open: boolean }>`
  font-size: 10px;
  color: ${getThemePropSelector('textSecondary')};
  transform: rotate(${({ $open }) => ($open ? '90deg' : '0deg')});
  transition: transform 0.15s;
  display: inline-block;
`;
const V5Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  padding: ${spacing.r8} 0 ${spacing.r4};
`;
const V5List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  padding: ${spacing.r8} 0;
`;

function AccordionGroup({ group }: { group: Group }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <V5Header onClick={() => setOpen((o) => !o)}>
        <V5Chevron $open={open}>▶</V5Chevron>
        <V5Title>v{group.version}</V5Title>
        <V5Count>{group.items.length} deployments</V5Count>
      </V5Header>
      {open && (
        <V5Cards>
          {group.items.map((item) => <MiniCardItem key={item.id} item={item} />)}
        </V5Cards>
      )}
    </div>
  );
}

function Variant5() {
  return (
    <CardWindow>
      <V5List>
        {GROUPS.map((g) => <AccordionGroup key={g.version} group={g} />)}
      </V5List>
    </CardWindow>
  );
}

// ── Variant 6 — Left accent border on group container ─────────────────────────

const VERSION_ACCENT: Record<string, string> = {
  '4.2.0': '#4a9eff',
  '4.1.1': '#5db87a',
  '4.1.0': '#b8955c',
  '3.3.0': '#9090b8',
  '3.2.5': '#9090b8',
};

const V6Zone = styled.div<{ $accent: string }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  border-left: 3px solid ${({ $accent }) => $accent};
  padding: ${spacing.r8} ${spacing.r16};
`;
const V6Header = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${spacing.r8};
`;
const V6Title = styled.span<{ $accent: string }>`
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: ${({ $accent }) => $accent};
`;
const V6Count = styled.span`
  font-size: 11px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textSecondary')};
`;
const V6List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r20};
  padding: ${spacing.r8} 0;
`;

function Variant6() {
  return (
    <CardWindow>
      <V6List>
        {GROUPS.map((g) => {
          const accent = VERSION_ACCENT[g.version] ?? '#9090b8';
          return (
            <V6Zone key={g.version} $accent={accent}>
              <V6Header>
                <V6Title $accent={accent}>v{g.version}</V6Title>
                <V6Count>{g.items.length} deployments</V6Count>
              </V6Header>
              {g.items.map((item) => <MiniCardItem key={item.id} item={item} />)}
            </V6Zone>
          );
        })}
      </V6List>
    </CardWindow>
  );
}

// ── Explorer ───────────────────────────────────────────────────────────────────

const VARIANTS = [
  { n: 1, name: 'Current — centered separator line (baseline)',          Component: Variant1 },
  { n: 2, name: 'Sticky group header — solid backgroundLevel3',          Component: Variant2 },
  { n: 3, name: 'Distinct background zone per group (backgroundLevel1)', Component: Variant3 },
  { n: 4, name: 'Left column label + vertical guide line',               Component: Variant4 },
  { n: 5, name: 'Collapsible accordion (open by default)',               Component: Variant5 },
  { n: 6, name: 'Left accent border per group, color-coded',             Component: Variant6 },
];

const Explorer = () => (
  <Page>
    <div>
      <Text variant="Larger" isEmphazed>Group display — style exploration</Text>
      <Text color="textSecondary">Grouped by version. Each variant is scrollable.</Text>
    </div>
    <PageDivider />
    {VARIANTS.map(({ n, name, Component }, i) => (
      <React.Fragment key={n}>
        <VariantShell>
          <VariantLabel>{n}. {name}</VariantLabel>
          <Component />
        </VariantShell>
        {i < VARIANTS.length - 1 && <PageDivider />}
      </React.Fragment>
    ))}
  </Page>
);

// ── Storybook meta ─────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Group Display Exploration',
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
