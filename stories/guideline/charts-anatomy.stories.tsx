import { Meta, StoryObj } from '@storybook/react-webpack5';
import { ReactNode, useState } from 'react';

/**
 * Annotation diagrams for the Charts guideline.
 *
 * These are schematics, not live charts. They use a neutral wireframe palette
 * on purpose, so the reader never mistakes the diagram for the real UI, and
 * they are drawn in SVG so every callout lands on an exact pixel.
 *
 * Hovering a numbered bullet highlights the part it names and spells it out
 * under the diagram. The numbers match the list in `chart-guideline.mdx`, so
 * keep the two in sync.
 *
 * The geometry follows the real components: the value axis sits on the RIGHT
 * (`orientation="right"` in Barchart and LineTimeSerieChart) and the unit lives
 * in the title, since the ticks carry bare numbers.
 */

const WIREFRAME = {
  page: '#13131c',
  panel: '#1d1d2c',
  surface: '#252538',
  border: '#2e2e42',
  tooltipBorder: '#5f5f7e',
  ink: '#e8e8f0',
  inkMuted: '#8a8aa3',
  serieA: '#6f9dd9',
  serieB: '#c99a6b',
  callout: '#f0b429',
};

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

type Zone = { x: number; y: number; width: number; height: number };

type Part = {
  n: number;
  key: string;
  label: string;
  bullet: { x: number; y: number };
  /** Highlighted rectangle. Parts drawn as lines highlight the line instead. */
  zone?: Zone;
};

/* -------------------------------------------------------------------------- */
/*                               Shared pieces                                */
/* -------------------------------------------------------------------------- */

const Frame = ({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) => (
  <div style={{ width: '100%', maxWidth: width, margin: '0 auto' }}>
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      role="img"
      style={{ display: 'block' }}
    >
      <rect width={width} height={height} fill={WIREFRAME.page} />
      {children}
    </svg>
  </div>
);

const Highlight = ({ zone }: { zone: Zone }) => (
  <rect
    x={zone.x}
    y={zone.y}
    width={zone.width}
    height={zone.height}
    rx={2}
    fill={WIREFRAME.callout}
    fillOpacity={0.14}
    stroke={WIREFRAME.callout}
    strokeOpacity={0.8}
  />
);

const Bullet = ({
  part,
  active,
  onHover,
}: {
  part: Part;
  active: boolean;
  onHover: (key: string | null) => void;
}) => (
  <g
    onMouseEnter={() => onHover(part.key)}
    onMouseLeave={() => onHover(null)}
    style={{ cursor: 'pointer' }}
  >
    <circle
      cx={part.bullet.x}
      cy={part.bullet.y}
      r={active ? 11 : 9}
      fill={WIREFRAME.callout}
      stroke={active ? WIREFRAME.ink : 'none'}
    />
    <text
      x={part.bullet.x}
      y={part.bullet.y + 4}
      textAnchor="middle"
      fontFamily={FONT}
      fontSize={11}
      fontWeight={700}
      fill={WIREFRAME.page}
      style={{ pointerEvents: 'none' }}
    >
      {String(part.n)}
    </text>
  </g>
);

const Caption = ({
  y,
  width,
  part,
}: {
  y: number;
  width: number;
  part?: Part;
}) => (
  <text
    x={width / 2}
    y={y}
    textAnchor="middle"
    fontFamily={FONT}
    fontSize={11}
    fill={part ? WIREFRAME.ink : WIREFRAME.inkMuted}
  >
    {part ? `${part.n} · ${part.label}` : 'Hover a number to name the part'}
  </text>
);

/* -------------------------------------------------------------------------- */
/*                              Diagram: the frame                            */
/* -------------------------------------------------------------------------- */

const PLOT = { left: 60, right: 500, top: 92, bottom: 300 };

const Y_TICKS = [
  { y: 300, label: '0' },
  { y: 248, label: '25' },
  { y: 196, label: '50' },
  { y: 144, label: '75' },
  { y: 92, label: '100' },
];

const X_TICKS = [
  { x: 60, label: '12:00' },
  { x: 170, label: '12:15' },
  { x: 280, label: '12:30' },
  { x: 390, label: '12:45' },
  { x: 500, label: '13:00' },
];

const SERIE_A =
  '60,250 100,235 140,245 180,210 220,195 260,215 300,180 340,160 380,175 420,140 460,150 500,125';
const SERIE_B =
  '60,285 100,275 140,280 180,265 220,270 260,255 300,262 340,245 380,255 420,238 460,246 500,230';

const FRAME_PARTS: Part[] = [
  {
    n: 1,
    key: 'header',
    label: 'Header, carrying the title and the unit',
    bullet: { x: 52, y: 51 },
    zone: { x: 42, y: 32, width: 516, height: 42 },
  },
  {
    n: 2,
    key: 'plot',
    label: 'Plot area',
    bullet: { x: 80, y: 106 },
    zone: {
      x: PLOT.left,
      y: PLOT.top,
      width: PLOT.right - PLOT.left,
      height: PLOT.bottom - PLOT.top,
    },
  },
  {
    n: 3,
    key: 'yaxis',
    label: 'Y axis, on the right',
    bullet: { x: 500, y: 170 },
    zone: { x: 494, y: PLOT.top, width: 12, height: PLOT.bottom - PLOT.top },
  },
  {
    n: 4,
    key: 'xaxis',
    label: 'X axis',
    bullet: { x: 280, y: 332 },
    zone: { x: PLOT.left, y: 296, width: PLOT.right - PLOT.left, height: 28 },
  },
  {
    n: 5,
    key: 'ticks',
    label: 'Tick, tick label and tick step',
    bullet: { x: 540, y: 248 },
    zone: { x: 506, y: 84, width: 40, height: 224 },
  },
  {
    n: 6,
    key: 'mark',
    label: 'Mark',
    bullet: { x: 420, y: 124 },
  },
  {
    n: 7,
    key: 'baseline',
    label: 'Baseline',
    bullet: { x: 160, y: 300 },
  },
  {
    n: 8,
    key: 'legend',
    label: 'Legend',
    bullet: { x: 52, y: 350 },
  },
  {
    n: 9,
    key: 'grid',
    label: 'Grid line',
    bullet: { x: 240, y: 144 },
  },
];

const ChartFrameDiagram = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = FRAME_PARTS.find((p) => p.key === hovered);
  const on = (key: string) => hovered === key;

  return (
    <Frame width={600} height={420}>
      <rect
        x={40}
        y={28}
        width={520}
        height={350}
        rx={4}
        fill={WIREFRAME.panel}
        stroke={WIREFRAME.border}
      />

      {active?.zone && <Highlight zone={active.zone} />}

      {/* header: the unit lives in the title, not on the axis */}
      <text
        x={72}
        y={56}
        fontFamily={FONT}
        fontSize={13}
        fontWeight={600}
        fill={WIREFRAME.ink}
      >
        Network throughput (MB/s)
      </text>
      <circle cx={252} cy={51} r={7} fill="none" stroke={WIREFRAME.inkMuted} />
      <text
        x={252}
        y={55}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={9}
        fill={WIREFRAME.inkMuted}
      >
        ?
      </text>

      {/* grid lines */}
      {Y_TICKS.filter((t) => t.y !== PLOT.bottom).map((t) => (
        <line
          key={`grid-${t.label}`}
          x1={PLOT.left}
          y1={t.y}
          x2={PLOT.right}
          y2={t.y}
          stroke={on('grid') ? WIREFRAME.callout : WIREFRAME.border}
          strokeWidth={on('grid') ? 1.5 : 1}
          strokeDasharray="3 4"
        />
      ))}

      {/* y axis, on the right */}
      <line
        x1={PLOT.right}
        y1={PLOT.top}
        x2={PLOT.right}
        y2={PLOT.bottom}
        stroke={WIREFRAME.inkMuted}
      />
      {Y_TICKS.map((t) => (
        <g key={`ytick-${t.label}`}>
          <line
            x1={PLOT.right}
            y1={t.y}
            x2={PLOT.right + 4}
            y2={t.y}
            stroke={WIREFRAME.inkMuted}
          />
          <text
            x={PLOT.right + 10}
            y={t.y + 4}
            fontFamily={FONT}
            fontSize={10}
            fill={WIREFRAME.inkMuted}
          >
            {t.label}
          </text>
        </g>
      ))}

      {/* x axis, which is also the baseline here */}
      <line
        x1={PLOT.left}
        y1={PLOT.bottom}
        x2={PLOT.right}
        y2={PLOT.bottom}
        stroke={on('baseline') ? WIREFRAME.callout : WIREFRAME.inkMuted}
        strokeWidth={on('baseline') ? 2.5 : 1}
      />
      {X_TICKS.map((t) => (
        <g key={`xtick-${t.label}`}>
          <line
            x1={t.x}
            y1={PLOT.bottom}
            x2={t.x}
            y2={PLOT.bottom + 4}
            stroke={WIREFRAME.inkMuted}
          />
          <text
            x={t.x}
            y={PLOT.bottom + 18}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={10}
            fill={WIREFRAME.inkMuted}
          >
            {t.label}
          </text>
        </g>
      ))}

      {/* series */}
      <polyline
        points={SERIE_A}
        fill="none"
        stroke={on('mark') ? WIREFRAME.callout : WIREFRAME.serieA}
        strokeWidth={on('mark') ? 3.5 : 2}
      />
      <polyline
        points={SERIE_B}
        fill="none"
        stroke={WIREFRAME.serieB}
        strokeWidth={2}
      />

      {/* legend */}
      {on('legend') && (
        <Highlight zone={{ x: 62, y: 340, width: 150, height: 22 }} />
      )}
      <rect x={70} y={346} width={8} height={8} rx={1} fill={WIREFRAME.serieA} />
      <text
        x={84}
        y={354}
        fontFamily={FONT}
        fontSize={10}
        fill={WIREFRAME.inkMuted}
      >
        Read
      </text>
      <rect
        x={140}
        y={346}
        width={8}
        height={8}
        rx={1}
        fill={WIREFRAME.serieB}
      />
      <text
        x={154}
        y={354}
        fontFamily={FONT}
        fontSize={10}
        fill={WIREFRAME.inkMuted}
      >
        Write
      </text>

      {FRAME_PARTS.map((p) => (
        <Bullet
          key={p.key}
          part={p}
          active={hovered === p.key}
          onHover={setHovered}
        />
      ))}

      <Caption y={404} width={600} part={active} />
    </Frame>
  );
};

/* -------------------------------------------------------------------------- */
/*                             Diagram: the hover                             */
/* -------------------------------------------------------------------------- */

const HOVER_PLOT = { left: 60, right: 560, top: 40, bottom: 250 };
const CROSSHAIR_X = 180;
const HOVERED_A = 110;
const HOVERED_B = 200;
const TOOLTIP = { x: 210, y: 60, width: 200, height: 110 };

const HOVER_SERIE_A =
  '60,150 110,130 160,120 180,110 230,125 280,105 330,115 380,140 430,160 480,150 530,165 560,155';
const HOVER_SERIE_B =
  '60,215 110,225 160,205 180,200 230,210 280,220 330,205 380,215 430,220 480,210 530,225 560,215';

const HOVER_PARTS: Part[] = [
  { n: 10, key: 'crosshair', label: 'Crosshair', bullet: { x: 180, y: 272 } },
  {
    n: 11,
    key: 'point',
    label: 'Hovered data point',
    bullet: { x: 152, y: 110 },
  },
  {
    n: 12,
    key: 'tooltipHeader',
    label: 'Tooltip header',
    bullet: { x: 428, y: 86 },
    zone: { x: TOOLTIP.x, y: TOOLTIP.y, width: TOOLTIP.width, height: 38 },
  },
  {
    n: 13,
    key: 'tooltipItem',
    label: 'Tooltip item',
    bullet: { x: 428, y: 120 },
    zone: { x: TOOLTIP.x, y: 106, width: TOOLTIP.width, height: 26 },
  },
];

const HoverLayerDiagram = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = HOVER_PARTS.find((p) => p.key === hovered);
  const on = (key: string) => hovered === key;

  return (
    <Frame width={600} height={320}>
      <rect
        x={HOVER_PLOT.left}
        y={HOVER_PLOT.top}
        width={HOVER_PLOT.right - HOVER_PLOT.left}
        height={HOVER_PLOT.bottom - HOVER_PLOT.top}
        fill={WIREFRAME.panel}
        stroke={WIREFRAME.border}
      />

      <polyline
        points={HOVER_SERIE_A}
        fill="none"
        stroke={WIREFRAME.serieA}
        strokeWidth={2}
      />
      <polyline
        points={HOVER_SERIE_B}
        fill="none"
        stroke={WIREFRAME.serieB}
        strokeWidth={2}
      />

      <line
        x1={CROSSHAIR_X}
        y1={HOVER_PLOT.top}
        x2={CROSSHAIR_X}
        y2={HOVER_PLOT.bottom}
        stroke={on('crosshair') ? WIREFRAME.callout : WIREFRAME.inkMuted}
        strokeWidth={on('crosshair') ? 2.5 : 1}
        strokeDasharray="4 4"
      />

      {[
        { cy: HOVERED_A, fill: WIREFRAME.serieA },
        { cy: HOVERED_B, fill: WIREFRAME.serieB },
      ].map((p) => (
        <circle
          key={p.cy}
          cx={CROSSHAIR_X}
          cy={p.cy}
          r={on('point') ? 7 : 5}
          fill={p.fill}
          stroke={on('point') ? WIREFRAME.callout : WIREFRAME.panel}
          strokeWidth={2}
        />
      ))}

      {/* tooltip: a lighter border, so it reads as a panel above the plot */}
      <rect
        x={TOOLTIP.x}
        y={TOOLTIP.y}
        width={TOOLTIP.width}
        height={TOOLTIP.height}
        rx={4}
        fill={WIREFRAME.surface}
        stroke={WIREFRAME.tooltipBorder}
        strokeWidth={1.5}
      />

      {active?.zone && <Highlight zone={active.zone} />}

      <text
        x={226}
        y={86}
        fontFamily={FONT}
        fontSize={11}
        fontWeight={600}
        fill={WIREFRAME.ink}
      >
        12:32
      </text>
      <line
        x1={TOOLTIP.x}
        y1={98}
        x2={TOOLTIP.x + TOOLTIP.width}
        y2={98}
        stroke={WIREFRAME.tooltipBorder}
      />
      <rect
        x={226}
        y={112}
        width={8}
        height={8}
        rx={1}
        fill={WIREFRAME.serieA}
      />
      <text
        x={242}
        y={120}
        fontFamily={FONT}
        fontSize={11}
        fill={WIREFRAME.inkMuted}
      >
        Read
      </text>
      <text
        x={394}
        y={120}
        textAnchor="end"
        fontFamily={FONT}
        fontSize={11}
        fill={WIREFRAME.ink}
      >
        42 MB/s
      </text>
      <rect
        x={226}
        y={138}
        width={8}
        height={8}
        rx={1}
        fill={WIREFRAME.serieB}
      />
      <text
        x={242}
        y={146}
        fontFamily={FONT}
        fontSize={11}
        fill={WIREFRAME.inkMuted}
      >
        Write
      </text>
      <text
        x={394}
        y={146}
        textAnchor="end"
        fontFamily={FONT}
        fontSize={11}
        fill={WIREFRAME.ink}
      >
        18 MB/s
      </text>

      {HOVER_PARTS.map((p) => (
        <Bullet
          key={p.key}
          part={p}
          active={hovered === p.key}
          onHover={setHovered}
        />
      ))}

      <Caption y={304} width={600} part={active} />
    </Frame>
  );
};

const meta: Meta = {
  title: 'Guidelines/ChartsAnatomy',
  tags: ['!dev', '!autodocs'],
};

export default meta;

export const ChartFrame: StoryObj = {
  render: () => <ChartFrameDiagram />,
};

export const HoverLayer: StoryObj = {
  render: () => <HoverLayerDiagram />,
};
