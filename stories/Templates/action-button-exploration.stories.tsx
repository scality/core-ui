import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled, { useTheme } from 'styled-components';
import { Button, CoreUiThemeProvider } from '../../src/lib/next';
import { Stack, spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { getThemePropSelector } from '../../src/lib/utils';
import { Tooltip } from '../../src/lib/components/tooltip/Tooltip.component';
import { CoreUITheme, coreUIAvailableThemes } from '../../src/lib/style/theme';
import { ScrollbarWrapper } from '../../src/lib/components/scrollbarwrapper/ScrollbarWrapper.component';

// ── Types & data ───────────────────────────────────────────────────────────────

type Status = 'connected' | 'degraded' | 'disconnected';
type Item = { id: string; name: string; status: Status; nodes: number; volumes: number; version: string };

const ITEMS: Item[] = [
  { id: '1', name: 'artesca-acme-prod',   status: 'connected',    nodes: 3, volumes: 36, version: '4.2.0' },
  { id: '2', name: 'vandelay-primary',    status: 'degraded',     nodes: 1, volumes: 12, version: '4.2.0' },
  { id: '3', name: 'artesca-initech-stg', status: 'connected',    nodes: 2, volumes: 24, version: '4.1.1' },
  { id: '4', name: 'fra-prod-02',         status: 'disconnected', nodes: 1, volumes: 4,  version: '4.1.0' },
];

const STATUS_META: Record<Status, { icon: string; color: (t: CoreUITheme) => string; label: string }> = {
  connected:    { icon: 'fa-check-circle',       color: (t) => t.statusHealthy, label: 'Connected'    },
  degraded:     { icon: 'fa-exclamation-circle', color: (t) => t.statusWarning, label: 'Degraded'     },
  disconnected: { icon: 'fa-times-circle',       color: (t) => t.textSecondary, label: 'Disconnected' },
};

// ── Page layout ────────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  padding: ${spacing.r32};
  background: ${getThemePropSelector('backgroundLevel1')};
  min-height: 100vh;
  color: ${getThemePropSelector('textPrimary')};
`;

const ChallengeBanner = styled.div`
  padding: ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel2')};
  border-left: 3px solid ${getThemePropSelector('selectedActive')};
  border-radius: 3px;
  margin-top: ${spacing.r16};
  margin-bottom: ${spacing.r40};
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
`;

const SectionWrapper = styled.div`
  margin-bottom: ${spacing.r40};
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${spacing.r12};
  margin-bottom: ${spacing.r16};
`;

const NoteGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.r8};
  margin-bottom: ${spacing.r16};
`;

const Note = styled.div<{ $type: 'pro' | 'con' | 'neutral' }>`
  padding: ${spacing.r8} ${spacing.r12};
  background: ${getThemePropSelector('backgroundLevel2')};
  border-radius: 3px;
  border-left: 3px solid ${({ $type, theme }) => {
    const t = theme as CoreUITheme;
    if ($type === 'pro') return t.statusHealthy;
    if ($type === 'con') return t.statusWarning;
    return t.border;
  }};
`;

const SectionDivider = styled.div`
  height: 1px;
  background: ${getThemePropSelector('backgroundLevel4')};
  margin-bottom: ${spacing.r40};
`;

// ── Shared card components ─────────────────────────────────────────────────────

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
`;

const CardShell = styled.div`
  display: flex;
  flex-direction: column;
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 3px;
  &:hover .hover-actions { opacity: 1; }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel4')};
  border-radius: 3px;
  gap: ${spacing.r8};
`;

const CardHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  flex: 1;
  min-width: 0;
`;

const CardHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r4};
  flex-shrink: 0;
`;

const DeploymentLink = styled.a`
  color: ${getThemePropSelector('textLink')};
  font-weight: 700;
  font-size: 14px;
  font-family: 'Lato', sans-serif;
  text-decoration: none;
  white-space: nowrap;
  &:hover { text-decoration: underline; }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 ${spacing.r16};
  gap: ${spacing.r16};
`;

const HoverActions = styled.div`
  opacity: 0;
  transition: opacity 0.15s;
  display: flex;
  align-items: center;
  gap: ${spacing.r4};
`;

// ── Shared card render (actions injected per variant) ──────────────────────────

const DeploymentCard = ({ item, actions }: { item: Item; actions: React.ReactNode }) => {
  const theme = useTheme() as CoreUITheme;
  const meta = STATUS_META[item.status];
  return (
    <CardShell>
      <CardHeader>
        <CardHeaderLeft>
          <i className={`fas ${meta.icon}`} style={{ fontSize: 16, color: meta.color(theme), flexShrink: 0 }} />
          <DeploymentLink href="#">{item.name} ↗</DeploymentLink>
        </CardHeaderLeft>
        <CardHeaderRight>
          <i className="fas fa-link" style={{ fontSize: 13, color: meta.color(theme) }} />
          <Text variant="Smaller" color="textSecondary">{meta.label}</Text>
        </CardHeaderRight>
      </CardHeader>
      <CardBody>
        <Stack gap="r16" style={{ alignItems: 'center', flex: 1 }}>
          <Text isEmphazed style={{ minWidth: '3.8rem' }}>{item.nodes} {item.nodes === 1 ? 'Node' : 'Nodes'}</Text>
          <Text color="textSecondary">{item.volumes} Volumes</Text>
          <Text color="textSecondary">v {item.version}</Text>
        </Stack>
        {actions}
      </CardBody>
    </CardShell>
  );
};

// ── V1 — Always visible ────────────────────────────────────────────────────────

const V1Actions = () => (
  <Stack gap="r4" style={{ alignItems: 'center', flexShrink: 0 }}>
    <Button variant="secondary" size="inline" label="Manage tokens" onClick={() => {}} />
    <Button variant="danger" size="inline" icon={<i className="fas fa-trash" />} aria-label="Remove deployment" onClick={() => {}} />
  </Stack>
);

// ── V2 — Hover reveal ─────────────────────────────────────────────────────────

const V2Actions = () => (
  <HoverActions className="hover-actions">
    <Button variant="secondary" size="inline" label="Manage tokens" onClick={() => {}} />
    <Button variant="danger" size="inline" icon={<i className="fas fa-trash" />} aria-label="Remove deployment" onClick={() => {}} />
  </HoverActions>
);

// ── V3 — Icon-only with tooltip ───────────────────────────────────────────────

const V3Actions = () => (
  <Stack gap="r4" style={{ alignItems: 'center', flexShrink: 0 }}>
    <Tooltip overlay="Manage tokens" placement="top">
      <span>
        <Button variant="secondary" size="inline" icon={<i className="fas fa-key" />} aria-label="Manage tokens" onClick={() => {}} />
      </span>
    </Tooltip>
    <Tooltip overlay="Remove deployment" placement="top">
      <span>
        <Button variant="danger" size="inline" icon={<i className="fas fa-trash" />} aria-label="Remove deployment" onClick={() => {}} />
      </span>
    </Tooltip>
  </Stack>
);

// ── V4 — Kebab menu ───────────────────────────────────────────────────────────

const KebabWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const KebabBtn = styled.button`
  background: transparent;
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 3px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${getThemePropSelector('textSecondary')};
  font-size: 14px;
  letter-spacing: 1px;
  transition: color 0.1s, border-color 0.1s;
  &:hover {
    color: ${getThemePropSelector('textPrimary')};
    border-color: ${getThemePropSelector('textSecondary')};
  }
`;

const KebabMenu = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 4px);
  background: ${getThemePropSelector('backgroundLevel4')};
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 3px;
  min-width: 168px;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
`;

const KebabItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  width: 100%;
  padding: ${spacing.r8} ${spacing.r12};
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-family: 'Lato', sans-serif;
  color: ${({ $danger, theme }) =>
    $danger ? (theme as CoreUITheme).statusWarning : (theme as CoreUITheme).textPrimary};
  text-align: left;
  &:hover {
    background: ${getThemePropSelector('backgroundLevel3')};
  }
`;

const V4Section = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <CardList>
      {ITEMS.map((item) => (
        <DeploymentCard
          key={item.id}
          item={item}
          actions={
            <KebabWrapper>
              <KebabBtn
                aria-label="Actions"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenId(openId === item.id ? null : item.id);
                }}
              >
                <i className="fas fa-ellipsis-v" />
              </KebabBtn>
              {openId === item.id && (
                <KebabMenu onClick={(e) => e.stopPropagation()}>
                  <KebabItem onClick={() => setOpenId(null)}>
                    <i className="fas fa-key" style={{ width: 14, textAlign: 'center' }} />
                    Manage tokens
                  </KebabItem>
                  <KebabItem $danger onClick={() => setOpenId(null)}>
                    <i className="fas fa-trash" style={{ width: 14, textAlign: 'center' }} />
                    Remove deployment
                  </KebabItem>
                </KebabMenu>
              )}
            </KebabWrapper>
          }
        />
      ))}
    </CardList>
  );
};

// ── V5 — Checkbox selection + collective action bar ────────────────────────────

const SelectionBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r12};
  padding: ${spacing.r8} ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel4')};
  border: 1px solid ${getThemePropSelector('selectedActive')};
  border-radius: 3px;
  margin-bottom: ${spacing.r8};
`;

const SelectableCard = styled(CardShell)<{ $selected: boolean }>`
  cursor: pointer;
  outline: ${({ $selected, theme }) =>
    $selected ? `1px solid ${(theme as CoreUITheme).selectedActive}` : 'none'};
  transition: outline 0.1s;
`;

const V5Section = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const theme = useTheme() as CoreUITheme;

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <>
      {selected.size > 0 && (
        <SelectionBar>
          <Text variant="Smaller">
            {selected.size} deployment{selected.size > 1 ? 's' : ''} selected
          </Text>
          <Button
            variant="secondary"
            size="inline"
            label="Manage tokens"
            icon={<i className="fas fa-key" />}
            onClick={() => {}}
          />
          <Button
            variant="danger"
            size="inline"
            label="Remove selected"
            icon={<i className="fas fa-trash" />}
            onClick={() => {}}
          />
          <div style={{ flex: 1 }} />
          <Button
            variant="outline"
            size="inline"
            label="Clear selection"
            onClick={() => setSelected(new Set())}
          />
        </SelectionBar>
      )}
      <CardList>
        {ITEMS.map((item) => {
          const meta = STATUS_META[item.status];
          const isSelected = selected.has(item.id);
          return (
            <SelectableCard
              key={item.id}
              $selected={isSelected}
              onClick={() => toggle(item.id)}
            >
              <CardHeader>
                <CardHeaderLeft>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggle(item.id)}
                    onClick={(e) => e.stopPropagation()}
                    style={{ flexShrink: 0, cursor: 'pointer', accentColor: theme.selectedActive }}
                  />
                  <i
                    className={`fas ${meta.icon}`}
                    style={{ fontSize: 16, color: meta.color(theme), flexShrink: 0 }}
                  />
                  <DeploymentLink href="#" onClick={(e) => e.stopPropagation()}>
                    {item.name} ↗
                  </DeploymentLink>
                </CardHeaderLeft>
                <CardHeaderRight>
                  <i className="fas fa-link" style={{ fontSize: 13, color: meta.color(theme) }} />
                  <Text variant="Smaller" color="textSecondary">{meta.label}</Text>
                </CardHeaderRight>
              </CardHeader>
              <CardBody>
                <Stack gap="r16" style={{ alignItems: 'center' }}>
                  <Text isEmphazed style={{ minWidth: '3.8rem' }}>
                    {item.nodes} {item.nodes === 1 ? 'Node' : 'Nodes'}
                  </Text>
                  <Text color="textSecondary">{item.volumes} Volumes</Text>
                  <Text color="textSecondary">v {item.version}</Text>
                </Stack>
              </CardBody>
            </SelectableCard>
          );
        })}
      </CardList>
    </>
  );
};

// ── Main exploration component ─────────────────────────────────────────────────

const ActionButtonExploration = () => (
  <PageWrapper>
    <Text variant="Large" isEmphazed>Action button patterns — card list context</Text>

    <ChallengeBanner>
      <Text isEmphazed>Challenge : la répétition des boutons est-elle vraiment un problème ?</Text>
      <Text color="textSecondary">
        Dans un outil ops B2B, répéter les actions sur chaque ligne est un pattern intentionnel.
        Les admins qui gèrent quotidiennement les deployments apprécient l'accès direct sans étape préalable.
        Réduire la visibilité des boutons améliore l'esthétique mais peut dégrader l'ergonomie réelle.
        Les 5 variants couvrent le spectre — de la visibilité maximale (V1) à l'action collective (V5).
      </Text>
    </ChallengeBanner>

    {/* V1 */}
    <SectionWrapper>
      <SectionTitle>
        <Text variant="Large" isEmphazed>V1 — Toujours visibles (baseline)</Text>
        <Text color="textSecondary">Pattern actuel</Text>
      </SectionTitle>
      <NoteGrid>
        <Note $type="pro">
          <Text variant="Smaller">Accès immédiat, zéro coût d'interaction. Idéal pour les admins qui agissent fréquemment sur les deployments.</Text>
        </Note>
        <Note $type="con">
          <Text variant="Smaller">Charge visuelle répétée sur chaque ligne — les boutons "parlent" même quand l'utilisateur ne veut pas agir.</Text>
        </Note>
        <Note $type="pro">
          <Text variant="Smaller">La répétition est un pattern attendu dans les outils de gestion. Ce n'est pas un bug, c'est une feature.</Text>
        </Note>
        <Note $type="con">
          <Text variant="Smaller">"Manage tokens" est une action secondaire peu fréquente — lui donner autant de poids qu'une action primaire écrase la hiérarchie visuelle.</Text>
        </Note>
      </NoteGrid>
      <CardList>
        {ITEMS.map((item) => (
          <DeploymentCard key={item.id} item={item} actions={<V1Actions />} />
        ))}
      </CardList>
    </SectionWrapper>

    <SectionDivider />

    {/* V2 */}
    <SectionWrapper>
      <SectionTitle>
        <Text variant="Large" isEmphazed>V2 — Révélés au survol de ligne</Text>
      </SectionTitle>
      <NoteGrid>
        <Note $type="pro">
          <Text variant="Smaller">Supprime le bruit visuel au repos — la liste est plus aérée et les informations métier plus lisibles.</Text>
        </Note>
        <Note $type="con">
          <Text variant="Smaller">Zéro discoverability sur écran tactile ou navigation clavier. L'utilisateur ne sait pas qu'il peut agir tant qu'il ne survole pas.</Text>
        </Note>
        <Note $type="neutral">
          <Text variant="Smaller">Survole une carte pour faire apparaître les actions.</Text>
        </Note>
        <Note $type="con">
          <Text variant="Smaller">Crée une asymétrie : les lignes semblent identiques au repos alors qu'elles sont toutes interactives.</Text>
        </Note>
      </NoteGrid>
      <CardList>
        {ITEMS.map((item) => (
          <DeploymentCard key={item.id} item={item} actions={<V2Actions />} />
        ))}
      </CardList>
    </SectionWrapper>

    <SectionDivider />

    {/* V3 */}
    <SectionWrapper>
      <SectionTitle>
        <Text variant="Large" isEmphazed>V3 — Icônes sans libellé</Text>
      </SectionTitle>
      <NoteGrid>
        <Note $type="pro">
          <Text variant="Smaller">Même discoverability que V1 (toujours visible), empreinte visuelle 2x plus petite. Bon équilibre entre les deux.</Text>
        </Note>
        <Note $type="pro">
          <Text variant="Smaller">La clé (tokens) et la poubelle (suppression) sont deux icônes universellement reconnues dans un contexte ops.</Text>
        </Note>
        <Note $type="con">
          <Text variant="Smaller">Charge cognitive légèrement plus haute pour les nouveaux utilisateurs qui ne connaissent pas encore les icônes.</Text>
        </Note>
        <Note $type="neutral">
          <Text variant="Smaller">Tooltip au survol pour lever toute ambiguïté.</Text>
        </Note>
      </NoteGrid>
      <CardList>
        {ITEMS.map((item) => (
          <DeploymentCard key={item.id} item={item} actions={<V3Actions />} />
        ))}
      </CardList>
    </SectionWrapper>

    <SectionDivider />

    {/* V4 */}
    <SectionWrapper>
      <SectionTitle>
        <Text variant="Large" isEmphazed>V4 — Menu contextuel</Text>
      </SectionTitle>
      <NoteGrid>
        <Note $type="pro">
          <Text variant="Smaller">Empreinte minimale : une seule icône par ligne. Adapté si les actions sont nombreuses ou varient selon le deployment.</Text>
        </Note>
        <Note $type="con">
          <Text variant="Smaller">+1 clic pour toute action. Pénalise les utilisateurs fréquents qui connaissent les actions par cœur.</Text>
        </Note>
        <Note $type="con">
          <Text variant="Smaller">Dissimuler "Remove" derrière un menu le rend moins visible — l'absence de friction visuelle sur une action destructive est un anti-pattern.</Text>
        </Note>
        <Note $type="neutral">
          <Text variant="Smaller">Cliquer sur l'icône ouvre le menu contextuel.</Text>
        </Note>
      </NoteGrid>
      <V4Section />
    </SectionWrapper>

    <SectionDivider />

    {/* V5 */}
    <SectionWrapper>
      <SectionTitle>
        <Text variant="Large" isEmphazed>V5 — Sélection + barre d'actions collective</Text>
      </SectionTitle>
      <NoteGrid>
        <Note $type="pro">
          <Text variant="Smaller">Seul pattern qui permet les opérations en masse — supprimer plusieurs deployments, bulk token refresh. Ouvre un champ fonctionnel nouveau.</Text>
        </Note>
        <Note $type="pro">
          <Text variant="Smaller">Cartes très propres au repos — les actions sont centralisées dans une barre unique, pas répétées sur chaque ligne.</Text>
        </Note>
        <Note $type="con">
          <Text variant="Smaller">Complexité d'interaction significativement plus haute. Sur-ingéniéré si les opérations bulk ne sont pas un besoin réel des utilisateurs.</Text>
        </Note>
        <Note $type="con">
          <Text variant="Smaller">Ne convient pas si les actions disponibles varient selon le deployment (certains ont des tokens, d'autres non).</Text>
        </Note>
      </NoteGrid>
      <V5Section />
    </SectionWrapper>
  </PageWrapper>
);

// ── Storybook meta ─────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Action Button Patterns',
  parameters: {
    layout: 'fullscreen',
    fullPage: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
      <ScrollbarWrapper>
        <ActionButtonExploration />
      </ScrollbarWrapper>
    </CoreUiThemeProvider>
  ),
};
