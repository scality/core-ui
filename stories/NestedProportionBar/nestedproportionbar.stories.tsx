import { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Box } from '../../src/lib/next';
import { spacing, Stack } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { Tooltip } from '../../src/lib/components/tooltip/Tooltip.component';
import { chartColors, CoreUITheme } from '../../src/lib/style/theme';

/**
 * NestedProportionBar built by composing existing core-ui primitives — no new component.
 *
 * A hierarchical breakdown of one total: each node is a box whose width is proportional to its
 * parent and which *contains* its children. That containment is the point, and it is what
 * `Barchart` stacked loses — side by side, segments only say "these add up"; nested, they say
 * "this one is part of that one".
 *
 * Two pieces are reusable beyond this recipe, and both are candidates for `charts/`:
 *  - `resolveChartColor` : theme token → `chartColors` palette → raw CSS colour, so a caller
 *                          writes `color: 'statusHealthy'` without reaching for `useTheme()`.
 *  - `ProportionBox`     : the recursive box itself.
 */

/* -------------------------------------------------------------------------- */
/*                             SHARED — chart colour                          */
/* -------------------------------------------------------------------------- */

/**
 * Today `GlobalHealthBar` hardcodes `theme.statusX`, `Sparkline` wants a hex and `LegendShape`
 * does `chartColors[c] || c`: three conventions for one question. This is the single answer.
 */
const resolveChartColor = (
  color: string | undefined,
  theme: CoreUITheme,
  fallback: string,
): string => {
  if (!color) return fallback;
  const token = (theme as unknown as Record<string, unknown>)[color];
  if (typeof token === 'string') return token;
  const palette = chartColors[color as keyof typeof chartColors];
  return typeof palette === 'string' ? palette : color;
};

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

type ProportionNode = {
  key: string;
  /** Single line, truncated rather than wrapped: keep it short. */
  label: string;
  value: number;
  /** Theme token, `chartColors` key, or raw CSS colour. */
  color?: string;
  children?: ProportionNode[];
};

/**
 * The reference breakdown: 71 % used, of which 56 points are stored and 32 of those unique.
 * Used + Available is 99, not 100 — the missing point is unattributed, and showing it is the
 * point. Nothing here is normalised up to a full parent.
 */
const CAPACITY: ProportionNode = {
  key: 'total',
  label: 'Total',
  value: 100,
  children: [
    {
      key: 'used',
      label: 'Used',
      value: 71,
      color: 'selectedActive',
      children: [
        {
          key: 'stored',
          label: 'Stored',
          value: 56,
          color: 'lineColor3',
          children: [
            { key: 'unique', label: 'Unique', value: 32, color: 'lineColor1' },
          ],
        },
      ],
    },
    { key: 'available', label: 'Available', value: 28, color: 'statusHealthy' },
  ],
};

/** A tree `depth` levels deep, each level keeping `share` of its parent. */
const deepTree = (depth: number, share: number): ProportionNode => {
  const build = (level: number, value: number): ProportionNode => ({
    key: `level-${level}`,
    label: level === 0 ? 'Total' : `Level ${level}`,
    value,
    color: level === 0 ? undefined : `lineColor${((level - 1) % 8) + 1}`,
    children:
      level >= depth
        ? undefined
        : [build(level + 1, Math.round(value * share))],
  });
  return build(0, 100);
};

/* -------------------------------------------------------------------------- */
/*                         RECIPE — nested Box + Tooltip                      */
/* -------------------------------------------------------------------------- */

const clamp01 = (value: number) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

const percentage = (ratio: number) => `${Math.round(ratio * 100)}%`;

/**
 * Owns a box's width.
 *
 * The parent's row is a flex row spanning the parent's *inner* width, so a child claims its share
 * with flex-basis: a percentage width would resolve against a shrink-to-fit container and collapse
 * to its content's size, which on a bar of text is a bar the size of its text.
 */
const NodeSlot = styled.div<{ $isRoot: boolean; $share: number }>`
  min-width: 0;
  ${({ $isRoot, $share }) =>
    $isRoot ? 'width: 100%;' : `flex: 0 0 ${($share * 100).toFixed(4)}%;`}
`;

const NodeBox = styled.div<{ $color: string; $filled: boolean }>`
  border: 1px solid ${({ $color }) => $color};
  border-radius: ${spacing.f8};
  padding: ${spacing.f4};
  min-width: 0;
  overflow: hidden;

  /* color-mix takes any CSS colour, so a token, a palette hex and an rgba() all tint alike —
     no hex parsing, and no need for the theme's hand-picked *RGB companions. */
  background: ${({ $filled, $color }) =>
    $filled ? `color-mix(in srgb, ${$color} 15%, transparent)` : 'transparent'};

  &:focus-visible {
    outline: ${spacing.f2} solid ${({ theme }) => theme.selectedActive};
    outline-offset: ${spacing.f1};
  }
`;

/**
 * Holds the label, and the Tooltip wrapper around it.
 *
 * The tooltip belongs to the label, not to the box: `Tooltip` opens on pointer-enter, which reaches
 * every ancestor of the pointer, and a box *contains* its children — so a tooltip there stacks one
 * overlay per level on a single hover. Labels never nest, so exactly one can be under the pointer.
 */
const LabelSlot = styled.div`
  flex: 1 1 auto;
  min-width: 0;

  /* Tooltip wraps its child in a shrink-to-fit inline-block; let it fill the slot so the label
     inside still has a width to ellipsise against. */
  > * {
    display: block;
    min-width: 0;
    max-width: 100%;
  }
`;

const NodeLabel = styled.div`
  padding: 0 ${spacing.f4};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NodeValue = styled.div`
  padding: 0 ${spacing.f4};
  overflow: hidden;
  white-space: nowrap;
  /* Digits of equal width: a value ticking 9% → 10% must not shift the boxes beside it. */
  font-variant-numeric: tabular-nums;
`;

const Row = styled.div<{ $height: string; $gap: string }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap};
  min-width: 0;
  min-height: ${({ $height }) => $height};
`;

type BoxOptions = {
  total: number;
  /** Which share the printed value states. Widths always follow the parent. */
  percentageBase: 'total' | 'parent';
  variant: 'outline' | 'filled';
  valuePosition: 'auto' | 'header';
  /** How much width the unattributed remainder must leave for `auto` to inline the value. */
  minInlineValueShare: number;
  levelHeight: string;
};

const ProportionBox = ({
  node,
  parentValue,
  basisShare,
  depth,
  options,
}: {
  node: ProportionNode;
  parentValue: number;
  /**
   * The box's width as a share of its parent's inner width. Normally the same as its share of
   * the parent's *value* — the two come apart only when a payload's children sum past it.
   */
  basisShare: number;
  depth: number;
  options: BoxOptions;
}) => {
  const theme = useTheme();
  const ratioOfParent = parentValue > 0 ? clamp01(node.value / parentValue) : 0;
  const ratioOfTotal =
    options.total > 0 ? clamp01(node.value / options.total) : 0;
  const color = resolveChartColor(node.color, theme, theme.border);
  const valueText = percentage(
    options.percentageBase === 'total' ? ratioOfTotal : ratioOfParent,
  );

  const children = node.children ?? [];

  // Children that sum past their parent would overflow the row — the flex bases do not shrink —
  // so the row, not the numbers, gives way: they share the parent's full inner width in
  // proportion to each other, while every label keeps stating the share the payload sent.
  const childrenSum = children.reduce(
    (sum, child) => sum + Math.max(0, child.value),
    0,
  );
  const childrenBasis = Math.max(node.value, childrenSum);
  const remainderShare =
    1 - (node.value > 0 ? clamp01(childrenSum / node.value) : 0);

  const label = (
    <LabelSlot>
      <Tooltip
        placement="top"
        overlay={
          <Stack direction="vertical" gap="r2">
            <Text variant="Smaller" isEmphazed>
              {node.label}
            </Text>
            <Text variant="Smaller" color="textSecondary">
              {`${percentage(ratioOfTotal)} of the total`}
            </Text>
            <Text variant="Smaller" color="textSecondary">
              {`${percentage(ratioOfParent)} of its parent`}
            </Text>
          </Stack>
        }
      >
        <NodeLabel>
          <Text variant="Smaller" color="textSecondary">
            {node.label}
          </Text>
        </NodeLabel>
      </Tooltip>
    </LabelSlot>
  );
  const value = (
    <NodeValue>
      <Text>{valueText}</Text>
    </NodeValue>
  );
  const childBoxes = children.map((child) => (
    <ProportionBox
      key={child.key}
      node={child}
      parentValue={node.value}
      basisShare={
        childrenBasis > 0
          ? clamp01(Math.max(0, child.value) / childrenBasis)
          : 0
      }
      depth={depth + 1}
      options={options}
    />
  ));

  /* auto: the value sits beside the children while the remainder leaves room for it, and climbs
     onto the label row otherwise — which reproduces the reference mock without ever overflowing. */
  const inlineValue =
    children.length > 0 &&
    options.valuePosition === 'auto' &&
    remainderShare >= options.minInlineValueShare;

  return (
    <NodeSlot $isRoot={depth === 0} $share={basisShare}>
      <NodeBox
        $color={color}
        $filled={options.variant === 'filled'}
        role="group"
        aria-label={`${node.label} ${valueText}`}
        tabIndex={0}
      >
        {inlineValue ? (
          <>
            {label}
            <Row $height={options.levelHeight} $gap={spacing.f2}>
              {childBoxes}
              {/* Takes the leftover, so the value sits in the unattributed remainder rather
                  than widening the row past its parent. */}
              <Box flex="1 1 0" minWidth="0">
                {value}
              </Box>
            </Row>
          </>
        ) : (
          <>
            <Row $height={options.levelHeight} $gap={spacing.f8}>
              {label}
              <Box flex="0 0 auto">{value}</Box>
            </Row>
            {children.length > 0 && (
              <Row $height={options.levelHeight} $gap={spacing.f2}>
                {childBoxes}
              </Row>
            )}
          </>
        )}
      </NodeBox>
    </NodeSlot>
  );
};

const NestedProportionBar = ({
  title,
  root,
  percentageBase = 'total',
  variant = 'outline',
  valuePosition = 'auto',
  minInlineValueShare = 0.08,
  levelHeight = spacing.f24,
}: {
  title: string;
  root: ProportionNode;
} & Partial<Omit<BoxOptions, 'total'>>) => (
  <Stack direction="vertical" gap="r16">
    <Text variant="Large" isEmphazed>
      {title}
    </Text>
    {root.value <= 0 ? (
      <Text color="textSecondary">Nothing to break down over this range.</Text>
    ) : (
      <Box role="figure" aria-label={`Breakdown of ${root.label}`}>
        <ProportionBox
          node={root}
          parentValue={root.value}
          basisShare={1}
          depth={0}
          options={{
            total: root.value,
            percentageBase,
            variant,
            valuePosition,
            minInlineValueShare,
            levelHeight,
          }}
        />
      </Box>
    )}
  </Stack>
);

/* -------------------------------------------------------------------------- */
/*                                  STORIES                                   */
/* -------------------------------------------------------------------------- */

type NpbArgs = Omit<BoxOptions, 'total' | 'levelHeight'> & {
  /** Level height in px — the component takes a CSS length. */
  levelHeight: number;
  /** NestingDepth only. */
  depth: number;
  /** NestingDepth only: share of its parent each level keeps. */
  shareOfParent: number;
};

const meta: Meta<NpbArgs> = {
  title: 'Components/Data Display/Charts/NestedProportionBar (composition)',
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['outline', 'filled'],
      description:
        'filled tints each box with its own colour on top of the outline',
    },
    valuePosition: {
      control: { type: 'radio' },
      options: ['auto', 'header'],
      description:
        'auto keeps the value beside the children while the remainder leaves room, and moves it onto the label row otherwise. header always uses the label row',
    },
    percentageBase: {
      control: { type: 'radio' },
      options: ['total', 'parent'],
      description:
        'Which share the printed value states. Widths always follow the parent, so total prints a number that does not match the box width — on purpose',
    },
    minInlineValueShare: {
      control: { type: 'range', min: 0, max: 0.4, step: 0.01 },
      description:
        'How much width the unattributed remainder must leave for auto to inline the value',
    },
    levelHeight: {
      control: { type: 'range', min: 12, max: 48, step: 1 },
      description: 'Minimum height of one nesting level, in px',
    },
    depth: {
      control: { type: 'range', min: 1, max: 8, step: 1 },
      description: 'NestingDepth only',
    },
    shareOfParent: {
      control: { type: 'range', min: 0.2, max: 0.95, step: 0.05 },
      description: 'NestingDepth only',
    },
  },
};
export default meta;

type Story = StoryObj<NpbArgs>;

/** The option props, so one control governs every bar in a story. */
const npbProps = (args: NpbArgs) => ({
  variant: args.variant,
  valuePosition: args.valuePosition,
  percentageBase: args.percentageBase,
  minInlineValueShare: args.minInlineValueShare,
  levelHeight: `${args.levelHeight}px`,
});

/** Defaults matching the component's own, so a story starts where the code does. */
const defaultArgs: NpbArgs = {
  variant: 'outline',
  valuePosition: 'auto',
  percentageBase: 'total',
  minInlineValueShare: 0.08,
  levelHeight: 24,
  depth: 4,
  shareOfParent: 0.7,
};

/** 1:1 with the reference mock: four levels, the value beside the children where it fits. */
export const ScreenshotEquivalent: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <Box maxWidth="60rem">
      <NestedProportionBar
        title="True Reality"
        root={CAPACITY}
        {...npbProps(args)}
      />
    </Box>
  ),
};

/**
 * `filled` tints every box with its own colour — precisely what the theme's alpha-capable
 * tokens are for. `outline` is what the mock shows.
 */
export const FilledVariant: Story = {
  args: { ...defaultArgs, variant: 'filled' },
  render: (args) => (
    <Box maxWidth="60rem">
      <NestedProportionBar
        title="True Reality"
        root={CAPACITY}
        {...npbProps(args)}
      />
    </Box>
  ),
};

/**
 * `header` puts every value on its own label row: uniform and predictable, one line taller per
 * level. Compare the total height with `ScreenshotEquivalent`.
 */
export const ValueInHeader: Story = {
  args: { ...defaultArgs, valuePosition: 'header' },
  render: (args) => (
    <Box maxWidth="60rem">
      <NestedProportionBar
        title="True Reality"
        root={CAPACITY}
        {...npbProps(args)}
      />
    </Box>
  ),
};

/**
 * The same tree with percentages of the *parent* instead of the total: Stored reads 79 % rather
 * than 56 %. The widths do not move — they always follow the parent.
 */
export const PercentageOfParent: Story = {
  args: { ...defaultArgs, percentageBase: 'parent' },
  render: (args) => (
    <Box maxWidth="60rem">
      <NestedProportionBar
        title="True Reality"
        root={CAPACITY}
        {...npbProps(args)}
      />
    </Box>
  ),
};

/**
 * Where the recommended four-level limit comes from: each level spends a border and a padding on
 * its own frame, so a box is exact against its parent's inner width and only approximate against
 * the root — and the labels run out of room before the widths do.
 */
export const NestingDepth: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <Stack direction="vertical" gap="r24">
      {[2, args.depth, 6].map((depth, index) => (
        <Box key={`${depth}-${index}`} maxWidth="60rem">
          <NestedProportionBar
            title={`${depth} levels`}
            root={deepTree(depth, args.shareOfParent)}
            {...npbProps(args)}
          />
        </Box>
      ))}
    </Stack>
  ),
};

/** The payloads that break a proportional layout — every one of them is a real answer. */
export const EdgeCases: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <Stack direction="vertical" gap="r24">
      <Box maxWidth="60rem">
        <NestedProportionBar
          title="Unattributed remainder — 40 + 35 of 100"
          root={{
            key: 'total',
            label: 'Total',
            value: 100,
            children: [
              {
                key: 'used',
                label: 'Used',
                value: 40,
                color: 'selectedActive',
              },
              {
                key: 'available',
                label: 'Available',
                value: 35,
                color: 'statusHealthy',
              },
            ],
          }}
          {...npbProps(args)}
        />
      </Box>
      <Box maxWidth="60rem">
        <NestedProportionBar
          title="Children summing past their parent — 80 + 60 of 100"
          root={{
            key: 'total',
            label: 'Total',
            value: 100,
            children: [
              {
                key: 'a',
                label: 'Reported 80',
                value: 80,
                color: 'selectedActive',
              },
              {
                key: 'b',
                label: 'Reported 60',
                value: 60,
                color: 'statusCritical',
              },
            ],
          }}
          {...npbProps(args)}
        />
      </Box>
      <Box maxWidth="60rem">
        <NestedProportionBar
          title="Labels wider than their box"
          root={{
            key: 'total',
            label: 'Total capacity across every selected deployment',
            value: 100,
            children: [
              {
                key: 'used',
                label: 'Used by object storage, including replicas',
                value: 60,
                color: 'selectedActive',
                children: [
                  {
                    key: 'unique',
                    label: 'Unique, deduplicated payload bytes',
                    value: 30,
                    color: 'lineColor1',
                  },
                ],
              },
            ],
          }}
          {...npbProps(args)}
        />
      </Box>
      <Box maxWidth="60rem">
        <NestedProportionBar
          title="A total of zero"
          root={{ key: 'total', label: 'Total', value: 0 }}
          {...npbProps(args)}
        />
      </Box>
    </Stack>
  ),
};
