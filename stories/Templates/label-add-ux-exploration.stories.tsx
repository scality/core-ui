/**
 * Exploration of 6 UX approaches for adding a label to a deployment card.
 * Each variant shows the same card in two states: with labels and without.
 * The current implementation (V1) is the baseline.
 */
import React, { useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled, { useTheme } from 'styled-components';
import { CoreUiThemeProvider, Button } from '../../src/lib/next';
import { Tooltip } from '../../src/lib/components/tooltip/Tooltip.component';
import { spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { getThemePropSelector } from '../../src/lib/utils';
import { CoreUITheme, coreUIAvailableThemes } from '../../src/lib/style/theme';

// ── Shared label color logic (same as Maestro Deployments) ────────────────────

type LabelColor = { bg: string; text: string };
const LABEL_COLOR_PALETTE: LabelColor[] = [
  { bg: 'hsla(  0, 35%, 55%, 0.15)', text: 'hsl(  0, 50%, 68%)' },
  { bg: 'hsla( 30, 40%, 52%, 0.15)', text: 'hsl( 30, 55%, 65%)' },
  { bg: 'hsla( 60, 38%, 48%, 0.15)', text: 'hsl( 60, 45%, 62%)' },
  { bg: 'hsla( 90, 35%, 50%, 0.15)', text: 'hsl( 90, 45%, 63%)' },
  { bg: 'hsla(120, 32%, 50%, 0.15)', text: 'hsl(120, 40%, 63%)' },
  { bg: 'hsla(150, 35%, 50%, 0.15)', text: 'hsl(150, 45%, 62%)' },
  { bg: 'hsla(180, 38%, 50%, 0.15)', text: 'hsl(180, 48%, 60%)' },
  { bg: 'hsla(210, 40%, 55%, 0.15)', text: 'hsl(210, 52%, 68%)' },
  { bg: 'hsla(240, 38%, 58%, 0.15)', text: 'hsl(240, 48%, 70%)' },
  { bg: 'hsla(270, 35%, 55%, 0.15)', text: 'hsl(270, 45%, 70%)' },
  { bg: 'hsla(300, 32%, 52%, 0.15)', text: 'hsl(300, 40%, 68%)' },
  { bg: 'hsla(330, 35%, 54%, 0.15)', text: 'hsl(330, 48%, 68%)' },
];
const getLabelColor = (label: string): LabelColor => {
  let hash = 0;
  for (let i = 0; i < label.length; i++) hash = label.charCodeAt(i) + ((hash << 5) - hash);
  return LABEL_COLOR_PALETTE[Math.abs(hash) % LABEL_COLOR_PALETTE.length];
};

const PRESET_LABELS = ['production', 'staging', 'eu-west', 'us-east', 'critical-client'];

// ── Shared card structure ─────────────────────────────────────────────────────

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
  flex-shrink: 0;
  &:hover { text-decoration: underline; }
`;

const LabelPill = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-size: 12px;
  font-weight: 600;
  font-family: 'Lato', sans-serif;
  line-height: 1.4;
  white-space: nowrap;
`;

const LabelPickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: ${spacing.r8} ${spacing.r16};
  background: ${getThemePropSelector('backgroundLevel4')};
  border-top: 1px solid ${getThemePropSelector('border')};
  flex-wrap: wrap;
`;

const LabelInput = styled.input`
  height: 24px;
  padding: 0 ${spacing.r8};
  background: ${getThemePropSelector('backgroundLevel2')};
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 3px;
  color: ${getThemePropSelector('textPrimary')};
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  outline: none;
  width: 120px;
  &:focus { border-color: ${getThemePropSelector('selectedActive')}; }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: 3px;
`;

// ── Page shell ────────────────────────────────────────────────────────────────

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

const CardStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  max-width: 640px;
`;

const PageDivider = styled.div`
  height: 1px;
  background: ${getThemePropSelector('backgroundLevel3')};
`;

// ── Shared label picker logic ─────────────────────────────────────────────────

function LabelPicker({
  labels,
  onAdd,
  onClose,
}: {
  labels: string[];
  onAdd: (l: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const available = PRESET_LABELS.filter((l) => !labels.includes(l));

  React.useEffect(() => { inputRef.current?.focus(); }, []);

  const commit = (val: string) => {
    const trimmed = val.trim();
    if (trimmed) { onAdd(trimmed); setText(''); }
  };

  return (
    <LabelPickerRow onClick={(e) => e.stopPropagation()}>
      {available.length > 0 && (
        <>
          <Text variant="Smaller" color="textSecondary">Suggestions:</Text>
          {available.map((l) => {
            const c = getLabelColor(l);
            return (
              <button key={l} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => onAdd(l)}>
                <LabelPill $bg={c.bg} $color={c.text}>{l}</LabelPill>
              </button>
            );
          })}
          <Text variant="Smaller" color="textSecondary">or</Text>
        </>
      )}
      <LabelInput
        ref={inputRef}
        placeholder="New label..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit(text);
          if (e.key === 'Escape') onClose();
        }}
      />
      {text.trim() && (
        <Button variant="outline" size="inline" label="Add" onClick={() => commit(text)} />
      )}
    </LabelPickerRow>
  );
}

// ── Sample deployments ────────────────────────────────────────────────────────

const SAMPLES = [
  { id: 'a', name: 'artesca-acme-prod',  initLabels: ['production', 'eu-west'] },
  { id: 'b', name: 'vandelay-primary',   initLabels: ['staging'] },
  { id: 'c', name: 'dev-lab-internal',   initLabels: [] },
];

// ── V1 — Always visible outline button (current baseline) ─────────────────────

function Variant1() {
  const [cards, setCards] = useState(SAMPLES.map((s) => ({ ...s, labels: [...s.initLabels] })));
  const [open, setOpen] = useState<string | null>(null);

  const addLabel = (id: string, label: string) =>
    setCards((prev) => prev.map((c) => c.id === id && !c.labels.includes(label) ? { ...c, labels: [...c.labels, label] } : c));

  return (
    <CardStack>
      {cards.map((card) => (
        <Card key={card.id}>
          <CardHeader>
            <CardHeaderLeft>
              <i className="fas fa-check-circle" style={{ fontSize: 16, color: '#7aaa86', flexShrink: 0 }} />
              <DeploymentLink href="#">{card.name} ↗</DeploymentLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8, marginLeft: spacing.r8 }}>
                {card.labels.map((l) => { const c = getLabelColor(l); return <LabelPill key={l} $bg={c.bg} $color={c.text}>{l}</LabelPill>; })}
                <Button variant="outline" size="inline" label={open === card.id ? 'Cancel' : '+ Label'} onClick={() => setOpen(open === card.id ? null : card.id)} />
              </div>
            </CardHeaderLeft>
            <CardHeaderRight>
              <Text variant="Smaller" color="textSecondary">Connected</Text>
            </CardHeaderRight>
          </CardHeader>
          {open === card.id && <LabelPicker labels={card.labels} onAdd={(l) => addLabel(card.id, l)} onClose={() => setOpen(null)} />}
        </Card>
      ))}
    </CardStack>
  );
}

// ── V2 — Ghost pill (always visible, styled like a label pill with dashed border) ─

const GhostPill = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 10px;
  background: transparent;
  border: 1px dashed ${getThemePropSelector('textSecondary')};
  color: ${getThemePropSelector('textSecondary')};
  font-size: 12px;
  font-weight: 400;
  font-family: 'Lato', sans-serif;
  line-height: 1.4;
  white-space: nowrap;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.15s;
  &:hover { opacity: 1; }
`;

function Variant2() {
  const [cards, setCards] = useState(SAMPLES.map((s) => ({ ...s, labels: [...s.initLabels] })));
  const [open, setOpen] = useState<string | null>(null);

  const addLabel = (id: string, label: string) =>
    setCards((prev) => prev.map((c) => c.id === id && !c.labels.includes(label) ? { ...c, labels: [...c.labels, label] } : c));

  return (
    <CardStack>
      {cards.map((card) => (
        <Card key={card.id}>
          <CardHeader>
            <CardHeaderLeft>
              <i className="fas fa-check-circle" style={{ fontSize: 16, color: '#7aaa86', flexShrink: 0 }} />
              <DeploymentLink href="#">{card.name} ↗</DeploymentLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8, marginLeft: spacing.r8 }}>
                {card.labels.map((l) => { const c = getLabelColor(l); return <LabelPill key={l} $bg={c.bg} $color={c.text}>{l}</LabelPill>; })}
                {open === card.id
                  ? <Button variant="outline" size="inline" label="Cancel" onClick={() => setOpen(null)} />
                  : <GhostPill onClick={() => setOpen(card.id)}>+ label</GhostPill>
                }
              </div>
            </CardHeaderLeft>
            <CardHeaderRight>
              <Text variant="Smaller" color="textSecondary">Connected</Text>
            </CardHeaderRight>
          </CardHeader>
          {open === card.id && <LabelPicker labels={card.labels} onAdd={(l) => addLabel(card.id, l)} onClose={() => setOpen(null)} />}
        </Card>
      ))}
    </CardStack>
  );
}

// ── V3 — Hover reveal: text button appears only on row hover ──────────────────

const HoverCard = styled(Card)`
  &:hover .add-label-btn { opacity: 1; pointer-events: auto; }
`;

const HoverRevealBtn = styled.button`
  background: transparent;
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 3px;
  color: ${getThemePropSelector('textSecondary')};
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  padding: 1px 6px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  white-space: nowrap;
  &:hover { color: ${getThemePropSelector('textPrimary')}; border-color: ${getThemePropSelector('textSecondary')}; }
`;

function Variant3() {
  const [cards, setCards] = useState(SAMPLES.map((s) => ({ ...s, labels: [...s.initLabels] })));
  const [open, setOpen] = useState<string | null>(null);

  const addLabel = (id: string, label: string) =>
    setCards((prev) => prev.map((c) => c.id === id && !c.labels.includes(label) ? { ...c, labels: [...c.labels, label] } : c));

  return (
    <CardStack>
      {cards.map((card) => (
        <HoverCard key={card.id}>
          <CardHeader>
            <CardHeaderLeft>
              <i className="fas fa-check-circle" style={{ fontSize: 16, color: '#7aaa86', flexShrink: 0 }} />
              <DeploymentLink href="#">{card.name} ↗</DeploymentLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8, marginLeft: spacing.r8 }}>
                {card.labels.map((l) => { const c = getLabelColor(l); return <LabelPill key={l} $bg={c.bg} $color={c.text}>{l}</LabelPill>; })}
                {open === card.id
                  ? <Button variant="outline" size="inline" label="Cancel" onClick={() => setOpen(null)} />
                  : <HoverRevealBtn className="add-label-btn" onClick={() => setOpen(card.id)}>+ Label</HoverRevealBtn>
                }
              </div>
            </CardHeaderLeft>
            <CardHeaderRight>
              <Text variant="Smaller" color="textSecondary">Connected</Text>
            </CardHeaderRight>
          </CardHeader>
          {open === card.id && <LabelPicker labels={card.labels} onAdd={(l) => addLabel(card.id, l)} onClose={() => setOpen(null)} />}
        </HoverCard>
      ))}
    </CardStack>
  );
}

// ── V4 — Hover reveal: icon only (+ icon after labels) ───────────────────────

const HoverIconCard = styled(Card)`
  &:hover .add-label-icon { opacity: 1; pointer-events: auto; }
`;

const AddIconBtn = styled.button`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid ${getThemePropSelector('border')};
  border-radius: 50%;
  color: ${getThemePropSelector('textSecondary')};
  font-size: 11px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  flex-shrink: 0;
  &:hover { color: ${getThemePropSelector('textPrimary')}; border-color: ${getThemePropSelector('textSecondary')}; }
`;

function Variant4() {
  const [cards, setCards] = useState(SAMPLES.map((s) => ({ ...s, labels: [...s.initLabels] })));
  const [open, setOpen] = useState<string | null>(null);

  const addLabel = (id: string, label: string) =>
    setCards((prev) => prev.map((c) => c.id === id && !c.labels.includes(label) ? { ...c, labels: [...c.labels, label] } : c));

  return (
    <CardStack>
      {cards.map((card) => (
        <HoverIconCard key={card.id}>
          <CardHeader>
            <CardHeaderLeft>
              <i className="fas fa-check-circle" style={{ fontSize: 16, color: '#7aaa86', flexShrink: 0 }} />
              <DeploymentLink href="#">{card.name} ↗</DeploymentLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8, marginLeft: spacing.r8 }}>
                {card.labels.map((l) => { const c = getLabelColor(l); return <LabelPill key={l} $bg={c.bg} $color={c.text}>{l}</LabelPill>; })}
                {open === card.id
                  ? <Button variant="outline" size="inline" label="Cancel" onClick={() => setOpen(null)} />
                  : <AddIconBtn className="add-label-icon" onClick={() => setOpen(card.id)} title="Add label"><i className="fas fa-plus" /></AddIconBtn>
                }
              </div>
            </CardHeaderLeft>
            <CardHeaderRight>
              <Text variant="Smaller" color="textSecondary">Connected</Text>
            </CardHeaderRight>
          </CardHeader>
          {open === card.id && <LabelPicker labels={card.labels} onAdd={(l) => addLabel(card.id, l)} onClose={() => setOpen(null)} />}
        </HoverIconCard>
      ))}
    </CardStack>
  );
}

// ── V5 — Empty placeholder: clickable "Add a label..." text when no labels ────
// When labels exist: hover-reveal icon only (same as V4)

const EmptyLabelZone = styled.button`
  background: transparent;
  border: none;
  color: ${getThemePropSelector('textSecondary')};
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  font-style: italic;
  cursor: pointer;
  padding: 0;
  opacity: 0.5;
  white-space: nowrap;
  transition: opacity 0.15s;
  &:hover { opacity: 1; }
`;

const HoverIconCard5 = styled(Card)`
  &:hover .add-label-icon5 { opacity: 1; pointer-events: auto; }
`;

function Variant5() {
  const [cards, setCards] = useState(SAMPLES.map((s) => ({ ...s, labels: [...s.initLabels] })));
  const [open, setOpen] = useState<string | null>(null);

  const addLabel = (id: string, label: string) =>
    setCards((prev) => prev.map((c) => c.id === id && !c.labels.includes(label) ? { ...c, labels: [...c.labels, label] } : c));

  return (
    <CardStack>
      {cards.map((card) => (
        <HoverIconCard5 key={card.id}>
          <CardHeader>
            <CardHeaderLeft>
              <i className="fas fa-check-circle" style={{ fontSize: 16, color: '#7aaa86', flexShrink: 0 }} />
              <DeploymentLink href="#">{card.name} ↗</DeploymentLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8, marginLeft: spacing.r8 }}>
                {card.labels.map((l) => { const c = getLabelColor(l); return <LabelPill key={l} $bg={c.bg} $color={c.text}>{l}</LabelPill>; })}
                {open === card.id
                  ? <Button variant="outline" size="inline" label="Cancel" onClick={() => setOpen(null)} />
                  : card.labels.length === 0
                    ? <EmptyLabelZone onClick={() => setOpen(card.id)}>Add a label…</EmptyLabelZone>
                    : <AddIconBtn className="add-label-icon5" onClick={() => setOpen(card.id)} title="Add label"><i className="fas fa-plus" /></AddIconBtn>
                }
              </div>
            </CardHeaderLeft>
            <CardHeaderRight>
              <Text variant="Smaller" color="textSecondary">Connected</Text>
            </CardHeaderRight>
          </CardHeader>
          {open === card.id && <LabelPicker labels={card.labels} onAdd={(l) => addLabel(card.id, l)} onClose={() => setOpen(null)} />}
        </HoverIconCard5>
      ))}
    </CardStack>
  );
}

// ── V6 — Tag icon in the right actions area (no affordance in label zone) ─────

const TagActionBtn = styled.button`
  background: transparent;
  border: none;
  color: ${getThemePropSelector('textSecondary')};
  font-size: 13px;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  transition: color 0.15s, background 0.15s;
  &:hover {
    color: ${getThemePropSelector('textPrimary')};
    background: ${getThemePropSelector('backgroundLevel3')};
  }
`;

function Variant6() {
  const [cards, setCards] = useState(SAMPLES.map((s) => ({ ...s, labels: [...s.initLabels] })));
  const [open, setOpen] = useState<string | null>(null);

  const addLabel = (id: string, label: string) =>
    setCards((prev) => prev.map((c) => c.id === id && !c.labels.includes(label) ? { ...c, labels: [...c.labels, label] } : c));

  return (
    <CardStack>
      {cards.map((card) => (
        <Card key={card.id}>
          <CardHeader>
            <CardHeaderLeft>
              <i className="fas fa-check-circle" style={{ fontSize: 16, color: '#7aaa86', flexShrink: 0 }} />
              <DeploymentLink href="#">{card.name} ↗</DeploymentLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8, marginLeft: spacing.r8 }}>
                {card.labels.map((l) => { const c = getLabelColor(l); return <LabelPill key={l} $bg={c.bg} $color={c.text}>{l}</LabelPill>; })}
              </div>
            </CardHeaderLeft>
            <CardHeaderRight>
              <Text variant="Smaller" color="textSecondary">Connected</Text>
              <TagActionBtn
                title="Manage labels"
                onClick={() => setOpen(open === card.id ? null : card.id)}
                style={{ color: open === card.id ? 'var(--selectedActive)' : undefined }}
              >
                <i className="fas fa-tag" />
              </TagActionBtn>
            </CardHeaderRight>
          </CardHeader>
          {open === card.id && <LabelPicker labels={card.labels} onAdd={(l) => addLabel(card.id, l)} onClose={() => setOpen(null)} />}
        </Card>
      ))}
    </CardStack>
  );
}

// ── V7 — Subtle tag icon in label zone, toujours visible à faible opacité ────
// Règle : toujours quelque chose à voir, mais quasi-invisible au repos.
// Au hover de la card : l'icône devient perceptible. Au hover de l'icône : pleine opacité.

const SubtleTagCard = styled(Card)`
  &:hover .tag-icon-subtle { opacity: 0.5; }
`;

const SubtleTagBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px 3px;
  display: inline-flex;
  align-items: center;
  color: ${getThemePropSelector('textSecondary')};
  font-size: 12px;
  opacity: 0.15;
  transition: opacity 0.15s;
  flex-shrink: 0;
  &:hover { opacity: 1 !important; }
`;

function Variant7() {
  const [cards, setCards] = useState(SAMPLES.map((s) => ({ ...s, labels: [...s.initLabels] })));
  const [open, setOpen] = useState<string | null>(null);

  const addLabel = (id: string, label: string) =>
    setCards((prev) => prev.map((c) => c.id === id && !c.labels.includes(label) ? { ...c, labels: [...c.labels, label] } : c));

  return (
    <CardStack>
      {cards.map((card) => (
        <SubtleTagCard key={card.id}>
          <CardHeader>
            <CardHeaderLeft>
              <i className="fas fa-check-circle" style={{ fontSize: 16, color: '#7aaa86', flexShrink: 0 }} />
              <DeploymentLink href="#">{card.name} ↗</DeploymentLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8, marginLeft: spacing.r8 }}>
                {card.labels.map((l) => { const c = getLabelColor(l); return <LabelPill key={l} $bg={c.bg} $color={c.text}>{l}</LabelPill>; })}
                {open === card.id
                  ? <Button variant="outline" size="inline" label="Cancel" onClick={() => setOpen(null)} />
                  : (
                    <Tooltip overlay="Add label" placement="top">
                      <SubtleTagBtn className="tag-icon-subtle" onClick={() => setOpen(card.id)}><i className="fas fa-tag" /></SubtleTagBtn>
                    </Tooltip>
                  )
                }
              </div>
            </CardHeaderLeft>
            <CardHeaderRight>
              <Text variant="Smaller" color="textSecondary">Connected</Text>
            </CardHeaderRight>
          </CardHeader>
          {open === card.id && <LabelPicker labels={card.labels} onAdd={(l) => addLabel(card.id, l)} onClose={() => setOpen(null)} />}
        </SubtleTagCard>
      ))}
    </CardStack>
  );
}

// ── V8 — Tag icon qui s'étend en texte au hover de la card ───────────────────
// L'icône est toujours là (faible opacité). Au hover de la card, elle révèle
// "Add label" à côté d'elle via une transition max-width.

const ExpandingTagCard = styled(Card)`
  &:hover .tag-expand-icon { opacity: 0.7; }
  &:hover .tag-expand-text { max-width: 60px; opacity: 0.7; }
  &:hover .tag-expand-wrap:hover .tag-expand-icon { opacity: 1; }
  &:hover .tag-expand-wrap:hover .tag-expand-text { opacity: 1; }
`;

const ExpandingTagWrap = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 3px;
  flex-shrink: 0;
  transition: background 0.15s;
  &:hover { background: ${getThemePropSelector('backgroundLevel3')}; }
`;

const ExpandingTagIcon = styled.i`
  font-size: 12px;
  color: ${getThemePropSelector('textSecondary')};
  opacity: 0.15;
  transition: opacity 0.2s;
  flex-shrink: 0;
`;

const ExpandingTagText = styled.span`
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  color: ${getThemePropSelector('textSecondary')};
  white-space: nowrap;
  overflow: hidden;
  max-width: 0;
  opacity: 0;
  transition: max-width 0.2s ease, opacity 0.2s ease;
`;

function Variant8() {
  const [cards, setCards] = useState(SAMPLES.map((s) => ({ ...s, labels: [...s.initLabels] })));
  const [open, setOpen] = useState<string | null>(null);

  const addLabel = (id: string, label: string) =>
    setCards((prev) => prev.map((c) => c.id === id && !c.labels.includes(label) ? { ...c, labels: [...c.labels, label] } : c));

  return (
    <CardStack>
      {cards.map((card) => (
        <ExpandingTagCard key={card.id}>
          <CardHeader>
            <CardHeaderLeft>
              <i className="fas fa-check-circle" style={{ fontSize: 16, color: '#7aaa86', flexShrink: 0 }} />
              <DeploymentLink href="#">{card.name} ↗</DeploymentLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8, marginLeft: spacing.r8 }}>
                {card.labels.map((l) => { const c = getLabelColor(l); return <LabelPill key={l} $bg={c.bg} $color={c.text}>{l}</LabelPill>; })}
                {open === card.id
                  ? <Button variant="outline" size="inline" label="Cancel" onClick={() => setOpen(null)} />
                  : (
                    <ExpandingTagWrap className="tag-expand-wrap" title="Add label" onClick={() => setOpen(card.id)}>
                      <ExpandingTagIcon className="fas fa-tag tag-expand-icon" />
                      <ExpandingTagText className="tag-expand-text">Add label</ExpandingTagText>
                    </ExpandingTagWrap>
                  )
                }
              </div>
            </CardHeaderLeft>
            <CardHeaderRight>
              <Text variant="Smaller" color="textSecondary">Connected</Text>
            </CardHeaderRight>
          </CardHeader>
          {open === card.id && <LabelPicker labels={card.labels} onAdd={(l) => addLabel(card.id, l)} onClose={() => setOpen(null)} />}
        </ExpandingTagCard>
      ))}
    </CardStack>
  );
}

// ── V9 — Tag icon à droite (zone actions), toujours visible mais très discret ─
// Comme V6, mais l'icône est permanente à faible opacité au lieu d'être un
// bouton normal. La zone droite donne une discoverabilité cohérente (même endroit
// sur toutes les cards) sans encombrer la zone labels.

const DimTagCard = styled(Card)`
  &:hover .dim-tag-btn { opacity: 0.6; }
`;

const DimTagBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  color: ${getThemePropSelector('textSecondary')};
  font-size: 13px;
  opacity: 0.2;
  transition: opacity 0.15s, background 0.15s;
  &:hover {
    opacity: 1 !important;
    background: ${getThemePropSelector('backgroundLevel3')};
  }
`;

function Variant9() {
  const [cards, setCards] = useState(SAMPLES.map((s) => ({ ...s, labels: [...s.initLabels] })));
  const [open, setOpen] = useState<string | null>(null);

  const addLabel = (id: string, label: string) =>
    setCards((prev) => prev.map((c) => c.id === id && !c.labels.includes(label) ? { ...c, labels: [...c.labels, label] } : c));

  return (
    <CardStack>
      {cards.map((card) => (
        <DimTagCard key={card.id}>
          <CardHeader>
            <CardHeaderLeft>
              <i className="fas fa-check-circle" style={{ fontSize: 16, color: '#7aaa86', flexShrink: 0 }} />
              <DeploymentLink href="#">{card.name} ↗</DeploymentLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.r8, marginLeft: spacing.r8 }}>
                {card.labels.map((l) => { const c = getLabelColor(l); return <LabelPill key={l} $bg={c.bg} $color={c.text}>{l}</LabelPill>; })}
              </div>
            </CardHeaderLeft>
            <CardHeaderRight>
              <Text variant="Smaller" color="textSecondary">Connected</Text>
              <DimTagBtn
                className="dim-tag-btn"
                title="Add label"
                onClick={() => setOpen(open === card.id ? null : card.id)}
              >
                <i className="fas fa-tag" />
              </DimTagBtn>
            </CardHeaderRight>
          </CardHeader>
          {open === card.id && <LabelPicker labels={card.labels} onAdd={(l) => addLabel(card.id, l)} onClose={() => setOpen(null)} />}
        </DimTagCard>
      ))}
    </CardStack>
  );
}

// ── Story shell ───────────────────────────────────────────────────────────────

function ExplorationPage() {
  const variants: { num: number; label: string; desc: string; component: React.ReactNode }[] = [
    { num: 1, label: 'Always visible — outline button', desc: 'Current baseline. Visible at all times, high affordance, high visual weight.', component: <Variant1 /> },
    { num: 2, label: 'Always visible — ghost pill', desc: 'Dashed pill, always present after labels. Same shape as label pills, much lower visual weight. Fades to full opacity on hover.', component: <Variant2 /> },
    { num: 3, label: 'Hover reveal — text button', desc: 'Button hidden until the row is hovered. Zero visual noise in default state; requires discovery.', component: <Variant3 /> },
    { num: 4, label: 'Hover reveal — icon only', desc: 'Circular + icon appears on hover. Most minimal of the hover variants; relies on icon recognition.', component: <Variant4 /> },
    { num: 5, label: 'Context-sensitive affordance', desc: 'No labels: shows "Add a label…" placeholder text. Labels present: hover-reveal icon only. Adapts to card state.', component: <Variant5 /> },
    { num: 6, label: 'Tag icon in actions area', desc: 'No affordance in the label zone at all. Label management is a secondary action, consistent with other card actions on the right.', component: <Variant6 /> },
    { num: 7, label: 'Tag icon subtle — label zone', desc: 'Icône tag toujours présente dans la zone labels, à 15% d\'opacité. Au hover de la card : 50%. Au hover direct de l\'icône : 100%. Toujours quelque chose à voir.', component: <Variant7 /> },
    { num: 8, label: 'Tag icon qui s\'étend au hover', desc: 'Icône tag à 15% d\'opacité. Au hover de la card, l\'icône révèle "Add label" via une transition max-width. Découvrabilité progressive sans bruit visuel.', component: <Variant8 /> },
    { num: 9, label: 'Tag icon subtle — zone actions (droite)', desc: 'Comme V6, mais l\'icône est permanente à 20% d\'opacité. Même endroit sur toutes les cards → cohérence. Au hover card : 60%. Au hover direct : 100%.', component: <Variant9 /> },
  ];

  return (
    <Page>
      {variants.map((v, i) => (
        <React.Fragment key={v.num}>
          {i > 0 && <PageDivider />}
          <VariantShell>
            <VariantLabel>V{v.num} — {v.label}</VariantLabel>
            <Text variant="Smaller" color="textSecondary">{v.desc}</Text>
            {v.component}
          </VariantShell>
        </React.Fragment>
      ))}
    </Page>
  );
}

const Wrapper = () => (
  <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
    <ExplorationPage />
  </CoreUiThemeProvider>
);

const meta: Meta = {
  title: 'Templates/Label Add UX Exploration',
  component: Wrapper,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Wrapper>;
export const Default: Story = {};
