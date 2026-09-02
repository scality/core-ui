import {
  Children,
  createContext,
  FormHTMLAttributes,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
} from 'react';
import styled, { css } from 'styled-components';
import { spacing, Stack, Wrap } from '../../spacing';
import { Icon, IconName } from '../icon/Icon.component';
import { HELP_ICON_SIZE, IconHelp } from '../iconhelper/IconHelper';
import { ScrollbarWrapper } from '../scrollbarwrapper/ScrollbarWrapper.component';
import { HelperText, Text } from '../text/Text.component';

const DESCRIPTION_PREFIX = 'describe-';
const LABEL_PREFIX = 'label-';
const maxWidthTooltip = { maxWidth: '20rem' };

type FormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'noValidate' | 'formNoValidate'
> & {
  children: ReactNode | ReactNode[];
  requireMode?: 'all' | 'partial';
  leftActions?: ReactNode;
  rightActions?: ReactNode;
  banner?: ReactNode;
  /**
   * Makes contained fields fluid: their `size`-derived width becomes a preferred
   * width that shrinks to fit the column (capped at `max-width: 100%`) instead of
   * overflowing. It also lays each `FormSection` out as a two-column grid that
   * auto-flips to a stacked single column on narrow widths — there is no
   * breakpoint prop; the flip point is derived from the layout (see below).
   * Note: `Input` and `Select` currently honor the fluid width — `SearchInput`,
   * `TextArea` and other size-driven content keep their fixed width for now.
   *
   * It also declares the Form the `responsive` container, so any
   * `@container responsive` query inside it — `Button iconOnly={number}`, for
   * one — resolves against the Form's width. See the "Responsive" guideline.
   */
  responsive?: boolean;
};

type PageFormProps = {
  layout: {
    kind: 'page';
    title: string;
    subTitle?: string;
    icon?: IconName;
  };
} & FormProps;
type TabFormProps = { layout: { kind: 'tab' } } & FormProps;

// In a `responsive` Form a FormSection lays its FormGroups out as a two-column
// CSS grid (label track + field track) and each FormGroup is a `subgrid` row, so
// labels align per section from content alone — no measurement. Below the section's
// own stacking width the grid collapses to a single column (fields stack under
// their labels) via a `@container` query, so a field never shrinks small enough to
// truncate.
// Both floors are a readability policy, not component-derived: fluid fields carry
// `min-width: 0`, so there is no intrinsic minimum to read.
// - field floor: the `1/2` Input size (10rem) — below this a field stacks.
// - label floor: ~24ch — long labels wrap to about two lines before stacking.
const FIELD_MIN_REM = 10;
const LABEL_MIN_CH = 24;
// Share of the container the label column may claim once there is not enough room
// for its full cap. A grid track satisfies its max before the flexible field track
// flexes, so a constant cap makes the label take its full width while the field
// walks down to FIELD_MIN_REM and the row stacks earlier than it needs to. Capping
// the label as a fraction of the container instead makes the two give ground
// together; above ~2.5x the cap the fraction is the larger of the two and the
// column is sized exactly as before.
const LABEL_MAX_CQI = 40;
// The width below which a section stacks: its own label column plus the field
// floor plus the column gap. Derived per section rather than fixed, or a section
// with a label cap wider than LABEL_MIN_CH overflows in the band between the two.
const stackBelow = (labelFloor: string) =>
  `calc(${labelFloor} + ${FIELD_MIN_REM}rem + ${spacing.r32})`;

const StyledForm = styled.form<{
  $layout: PageFormProps['layout'] | TabFormProps['layout'];
  $containerize?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  background-color: ${(props) =>
    props.$layout.kind === 'page' && props.theme.backgroundLevel4};
  ${({ $containerize }) =>
    $containerize &&
    css`
      /* Containment takes the contents out of the intrinsic width, so the width
         has to come from the parent: as a content-sized flex item the form would
         otherwise resolve to 0 and every child would overflow it. Same pairing as
         LeftPanel/RightPanel in layout/v2/panels.tsx. */
      flex: 1 1 auto;
      min-width: 0;
      container-type: inline-size;
      container-name: responsive;
    `}
`;

// The header, the scroll area and the footer all extend this, so it decides how
// wide a form's content is. 45rem is the page layout's *cap*, not its width — a
// pinned width leaves the fields, the section actions and the fixed footer
// outside the page, unreachable, as soon as there is less room than that.
// `width: 100%` needs `box-sizing: border-box`, or the content-box padding
// overflows the parent by exactly that padding. The cap then has to include the
// padding to keep the same 45rem of *content* the pinned width gave.
const PAGE_CONTENT_MAX_WIDTH = '45rem';
const BasicPageLayout = styled.div<{ $layoutKind: 'page' | 'tab' }>`
  box-sizing: border-box;
  margin: 0 auto;
  ${(props) =>
    props.$layoutKind === 'page'
      ? `
  width: 100%;
  max-width: calc(${PAGE_CONTENT_MAX_WIDTH} + ${spacing.f16});
  padding-right: ${spacing.f16};
  `
      : `
  width: 100%;
  padding-bottom: ${spacing.r24};`}
`;

const FixedHeader = styled(BasicPageLayout)`
  ${(props) =>
    props.$layoutKind === 'page'
      ? `
  border-bottom: 1px solid ${props.theme.border};
  `
      : ``}
`;

const FixedFooter = styled(BasicPageLayout)`
  border-top: 1px solid ${(props) => props.theme.border};
`;

const PaddedContent = styled.div`
  padding: ${spacing.f16} 0 ${spacing.f16} ${spacing.f16};
`;
const PaddedForHeaderAndFooterContent = styled.div`
  padding: ${spacing.f16};
`;

const ScrollArea = styled(BasicPageLayout)`
  flex-grow: 1;
  align-self: stretch;
  overflow-y: auto;
`;

// A FormSection lays its FormGroups out so labels align across the section from
// content alone — no JS measurement. It picks one of two mechanisms based on
// whether the label column is a fixed width (`forceLabelWidth`):
//   - fixed label width: the section is a plain vertical stack and each FormGroup
//     row is a *self-sufficient* two-column grid (see FieldSubgridRow). Every row
//     uses the same fixed label track, so labels align — and because a row needs
//     no parent grid, it keeps its layout even when nested inside another element
//     (a div/Stack/Accordion).
//   - auto label width: the section is a two-column grid and each FormGroup row is
//     a `subgrid` row, so the auto-sized label column is shared across rows. This
//     requires each row to be a direct grid item.
// Either way, non-FormGroup children (an InfoMessage, a Banner) stack full-width.
// `responsive` makes the field track fluid (minmax(10rem, 1fr)) and lets each row
// flip to a stacked single column below the section's stacking width via an
// `@container` query.
const SectionGrid = styled.div<{
  $labelTrack: string;
  $responsive: boolean;
  $fixedLabel: boolean;
  $stackBelow: string;
}>`
  ${({ $labelTrack, $responsive, $fixedLabel, $stackBelow }) =>
    $fixedLabel
      ? css`
          display: flex;
          flex-direction: column;
          gap: ${spacing.r12};
          ${
            $responsive &&
            css`
              @container responsive (max-width: ${$stackBelow}) {
                gap: ${spacing.r20};
              }
            `
          }
        `
      : css`
          display: grid;
          column-gap: ${spacing.r32};
          row-gap: ${spacing.r12};
          /* The field track fills the remaining width (its floor keeps fields from
             shrinking below content — 10rem when responsive, their own size when
             not) so the grid reaches the container edge. That is what lets a
             full-width child actually span it — with a content-sized track the
             grid would stop at its content and a 1 / -1 span with it. */
          grid-template-columns:
            ${$labelTrack}
            ${
              $responsive
                ? `minmax(${FIELD_MIN_REM}rem, 1fr)`
                : 'minmax(max-content, 1fr)'
            };
          /* Non-FormGroup children (InfoMessage, Banner, …) span the full width
             instead of being auto-placed into the label column. */
          & > * {
            grid-column: 1 / -1;
          }
          ${
            $responsive &&
            css`
              @container responsive (max-width: ${$stackBelow}) {
                grid-template-columns: 1fr;
                /* Stacked groups need more separation than side-by-side rows: each
                 group is now two lines (label over field), so widen the gap. */
                row-gap: ${spacing.r20};
              }
            `
          }
        `}
`;

// A FormGroup row. A horizontal row lays label + field on one line; a vertical row
// stacks them. How a horizontal row gets its two columns depends on the label
// width:
//   - fixed (`forceLabelWidth`): the row is a *self-sufficient* two-column grid, so
//     it keeps its layout anywhere in the DOM — including nested inside a div,
//     Stack or Accordion — and all rows align because they share $labelTrack.
//   - auto: the row is a `subgrid` of the SectionGrid so the auto-sized label
//     column is shared across rows. NOTE: `subgrid` only works when this row is a
//     *direct grid item* of a SectionGrid. A FormGroup nested inside another
//     element breaks that chain and the row loses its columns — either set
//     `forceLabelWidth` on the section, or wrap the nested groups in their own
//     FormSection.
const FieldSubgridRow = styled.div<{
  $direction: 'vertical' | 'horizontal';
  $responsive: boolean;
  $labelTrack: string;
  $fixedLabel: boolean;
  $stackBelow: string;
}>`
  display: grid;
  grid-column: 1 / -1;
  row-gap: ${spacing.r4};
  ${({ $direction, $responsive, $labelTrack, $fixedLabel, $stackBelow }) => {
    if ($direction === 'vertical') {
      return css`
        grid-template-columns: 1fr;
      `;
    }
    const fieldTrack = $responsive
      ? `minmax(${FIELD_MIN_REM}rem, 1fr)`
      : 'max-content';
    return css`
      column-gap: ${spacing.r32};
      align-items: baseline;
      grid-template-columns: ${
        $fixedLabel ? `${$labelTrack} ${fieldTrack}` : 'subgrid'
      };
      ${
        $responsive &&
        css`
          @container responsive (max-width: ${$stackBelow}) {
            grid-template-columns: 1fr;
            align-items: stretch;
          }
        `
      }
    `;
  }}
`;

const GridLabelCell = styled.div`
  min-width: 0;
`;

// The help icon's own footprint, taken from the icon rather than restated, and
// the gap that keeps it off the label.
const HELP_ICON_RESERVE = `calc(${HELP_ICON_SIZE} + ${spacing.r8})`;

/**
 * The label, holding the room its help icon will sit in.
 *
 * The icon is an atomic inline, so there is a soft-wrap opportunity in front of it
 * that nothing inside it can suppress, and it used to land alone on the next line.
 * End padding on the label's own inline box lands at the end of its *last* line --
 * exactly where the icon goes -- and counts toward its min-content width, so a
 * column sized to its text is sized to the icon too.
 */
const LabelText = styled(Text)<{ $reserveHelpIcon: boolean }>`
  ${({ $reserveHelpIcon }) =>
    $reserveHelpIcon &&
    css`
      padding-right: ${HELP_ICON_RESERVE};
    `}
`;

/**
 * Pulled back onto the room `LabelText` reserved, by exactly its own width, so
 * placing it costs the line nothing and no break is needed to fit it.
 */
const HelpIconSlot = styled.span`
  display: inline-block;
  margin-left: -${HELP_ICON_SIZE};
`;

// Carries the section's label-column config down to each FormGroup so a row can
// build its own layout. Null outside a FormSection — a FormGroup then throws.
type SectionLabelConfig = {
  labelTrack: string;
  fixedLabel: boolean;
  stackBelow: string;
};
const FormSectionContext = createContext<SectionLabelConfig | null>(null);

const RequireModeContext = createContext<'all' | 'partial'>('partial');

const FormResponsiveContext = createContext<{
  responsive: boolean;
}>({ responsive: false });

type ContentProps = {
  helper: string;
  error: string;
};

type FormGroupProps = {
  label: string;
  id: string;
  content: ReactElement<ContentProps>;
  direction?: 'vertical' | 'horizontal';
  labelHelpTooltip?: ReactNode;
  help?: string;
  error?: string;
  required?: boolean;
  helpErrorPosition?: 'right' | 'bottom';
  disabled?: boolean;
};

const FormGroup = ({
  direction = 'horizontal',
  label,
  id,
  labelHelpTooltip,
  content,
  help,
  error,
  required,
  helpErrorPosition = 'right',
  disabled,
}: FormGroupProps) => {
  const sectionLabel = useContext(FormSectionContext);
  const requireMode = useContext(RequireModeContext);
  const { responsive } = useContext(FormResponsiveContext);
  if (!sectionLabel) {
    throw new Error('FormGroup cannot be used outside of FormSection');
  }

  const value = {
    disabled: disabled || false,
    error: error || undefined,
    responsive,
  };

  const labelContent = (
    <label
      htmlFor={id}
      id={`${LABEL_PREFIX}${id}`}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <LabelText $reserveHelpIcon={!!labelHelpTooltip}>
        {label}
        {requireMode !== 'all' && required && ' *'}
        {requireMode === 'all' && !required && ' (optional)'}
      </LabelText>
      {labelHelpTooltip && (
        <HelpIconSlot>
          <IconHelp
            tooltipMessage={labelHelpTooltip}
            overlayStyle={maxWidthTooltip}
          />
        </HelpIconSlot>
      )}
    </label>
  );

  const fieldContent = (
    <Stack
      direction={helpErrorPosition === 'right' ? 'horizontal' : 'vertical'}
      gap={helpErrorPosition === 'right' ? 'r8' : 'r4'}
      style={
        responsive
          ? {
              minWidth: 0,
              // Left-align rather than stretch, so a width-less control (a
              // TextArea sized only by its `cols`) keeps its intrinsic size in
              // the fluid `1fr` field column instead of growing to fill it.
              // Input is unaffected — it caps itself via `max-width: 100%`.
              ...(helpErrorPosition === 'right'
                ? {}
                : { alignItems: 'flex-start' }),
            }
          : undefined
      }
    >
      {content}
      {error ? (
        <HelperText color="statusCritical" id={`${DESCRIPTION_PREFIX}${id}`}>
          {error}
        </HelperText>
      ) : help ? (
        <div style={{ opacity: disabled ? 0.5 : 1 }}>
          <HelperText color="textSecondary" id={`${DESCRIPTION_PREFIX}${id}`}>
            {help}
          </HelperText>
        </div>
      ) : (
        <HelperText>&nbsp;</HelperText>
      )}
    </Stack>
  );

  return (
    <FieldContext.Provider value={value}>
      <FieldSubgridRow
        $direction={direction}
        $responsive={responsive}
        $labelTrack={sectionLabel.labelTrack}
        $fixedLabel={sectionLabel.fixedLabel}
        $stackBelow={sectionLabel.stackBelow}
      >
        <GridLabelCell>{labelContent}</GridLabelCell>
        {fieldContent}
      </FieldSubgridRow>
    </FieldContext.Provider>
  );
};

type FormSectionProps = {
  children: ReactElement<FormGroupProps> | ReactElement<FormGroupProps>[];
  title?: { name: string; icon?: IconName; helpTooltip?: string };
  /**
   * Caps the label column at this width: labels wider than it wrap rather than
   * widening the column. A number is pixels; a string is an **absolute** length
   * (`px`, `rem`, `em`, `ch`), so `'15rem'` follows the document's root font size
   * where a px value computed once cannot. A percentage or a keyword such as
   * `max-content` is not usable: the width is also fed to the container query
   * that decides when the section stacks, and neither is valid there, so the rule
   * is dropped whole and the section silently stops stacking. In a `responsive`
   * Form the column keeps this width while there is room but shrinks below it
   * (down to the longest word) as the field track is squeezed, so rows stay
   * aligned; otherwise it is pinned to this exact width. When unset, the column
   * auto-sizes to the widest label.
   */
  forceLabelWidth?: number | string;
  rightActions?: ReactNode;
};

const FormSection = ({
  children,
  title,
  forceLabelWidth,
  rightActions,
}: FormSectionProps) => {
  const { responsive } = useContext(FormResponsiveContext);
  //If all the formgroup are not required, add `(optional)` next to form section title.
  const groupNotOptional = Children.toArray(children).find((child) =>
    isValidElement(child) ? child.props.required === true : false,
  );

  // The label column. `forceLabelWidth` sets the column's upper bound to an exact
  // pixel width (labels wider than it wrap, mirroring how `Input`'s `size` fixes
  // the field width); it also makes every FormGroup row self-sufficient, so nesting
  // a group inside another element no longer breaks its layout. When unset, the
  // column's cap is its widest label (`max-content`), shared across rows via
  // `subgrid` — no measurement. Responsive then lets the column shrink from its
  // longest word (`min-content`) up to that cap before the section flips;
  // non-responsive pins it to the cap.
  const fixedLabel = forceLabelWidth != null;
  const labelWidth =
    typeof forceLabelWidth === 'number'
      ? `${forceLabelWidth}px`
      : forceLabelWidth;
  const labelWidthCap = labelWidth ?? 'max-content';
  // Responsive clamps the cap to a share of the container so the label and the
  // field give ground together (see LABEL_MAX_CQI). `min()` needs two lengths, so
  // the clamp only applies to an explicit cap; an auto column's cap is its own
  // text, which is its own limit.
  const labelTrack = responsive
    ? `minmax(min-content, ${
        labelWidth ? `min(${labelWidth}, ${LABEL_MAX_CQI}cqi)` : labelWidthCap
      })`
    : labelWidthCap;
  // The auto column has no length to derive from, so it keeps the readability
  // floor it has always used.
  const sectionStackBelow = stackBelow(labelWidth ?? `${LABEL_MIN_CH}ch`);

  return (
    <FormSectionContext.Provider
      value={{ labelTrack, fixedLabel, stackBelow: sectionStackBelow }}
    >
      <Stack direction="vertical" gap="r12">
        {title && (
          <Wrap>
            <Stack direction="horizontal" gap="r8">
              {title.icon && <Icon name={title.icon} color="textPrimary" />}
              <Text isEmphazed>
                {groupNotOptional
                  ? `${title.name}`
                  : `${title.name} (optional)`}
              </Text>
              {title.helpTooltip && (
                <IconHelp
                  tooltipMessage={title.helpTooltip}
                  overlayStyle={maxWidthTooltip}
                />
              )}
            </Stack>
            <div>{rightActions}</div>
          </Wrap>
        )}
        <SectionGrid
          $labelTrack={labelTrack}
          $responsive={responsive}
          $fixedLabel={fixedLabel}
          $stackBelow={sectionStackBelow}
        >
          {children}
        </SectionGrid>
      </Stack>
    </FormSectionContext.Provider>
  );
};

const PageForm = forwardRef<HTMLFormElement, PageFormProps>(
  (
    { layout, leftActions, rightActions, children, banner, ...formProps },
    ref,
  ) => {
    const requireMode = useContext(RequireModeContext);
    const { responsive } = useContext(FormResponsiveContext);
    return (
      <ScrollbarWrapper>
        <StyledForm
          {...formProps}
          noValidate
          ref={ref}
          $layout={layout}
          $containerize={responsive}
        >
          <FixedHeader $layoutKind="page">
            <PaddedForHeaderAndFooterContent>
              <Wrap>
                <Stack direction="vertical">
                  <Text variant="Larger">
                    {layout.icon && (
                      <Icon name={layout.icon} color="textSecondary" />
                    )}{' '}
                    {layout.title}
                  </Text>
                  {layout.subTitle && (
                    <Text variant="Large" isEmphazed>
                      {layout.subTitle}
                    </Text>
                  )}
                </Stack>
                {requireMode === 'partial' && (
                  <Text
                    color="textSecondary"
                    variant="Smaller"
                    style={{ alignSelf: 'flex-end' }}
                    isGentleEmphazed
                  >
                    * are required fields
                  </Text>
                )}
              </Wrap>
            </PaddedForHeaderAndFooterContent>
          </FixedHeader>

          <ScrollArea $layoutKind="page">
            <PaddedContent>
              <div
                style={{
                  paddingBottom: `${spacing.r16}`,
                }}
              >
                {banner}
              </div>
              <Stack direction="vertical" withSeparators gap="r24">
                {Children.toArray(children)}
              </Stack>
            </PaddedContent>
          </ScrollArea>

          <FixedFooter $layoutKind="page">
            <PaddedForHeaderAndFooterContent>
              <Wrap>
                <div>{leftActions}</div>
                <div>{rightActions}</div>
              </Wrap>
            </PaddedForHeaderAndFooterContent>
          </FixedFooter>
        </StyledForm>
      </ScrollbarWrapper>
    );
  },
);

const TabForm = forwardRef<HTMLFormElement, TabFormProps>(
  (
    { layout, leftActions, rightActions, children, banner, ...formProps },
    ref,
  ) => {
    const { responsive } = useContext(FormResponsiveContext);
    return (
      <ScrollbarWrapper>
        <StyledForm
          {...formProps}
          noValidate
          ref={ref}
          $layout={layout}
          $containerize={responsive}
        >
          <FixedHeader $layoutKind="tab">
            <Wrap>
              <div>{leftActions}</div>
              <div>{rightActions}</div>
            </Wrap>
          </FixedHeader>

          <ScrollArea $layoutKind="tab">
            <Stack direction="vertical" gap="r24">
              {banner}
              <Stack direction="vertical" withSeparators gap="r24">
                {Children.toArray(children)}
              </Stack>
            </Stack>
          </ScrollArea>
        </StyledForm>
      </ScrollbarWrapper>
    );
  },
);

const Form = forwardRef<HTMLFormElement, TabFormProps | PageFormProps>(
  ({ layout, requireMode, responsive, ...formProps }, ref) => {
    return (
      <RequireModeContext.Provider value={requireMode || 'partial'}>
        <FormResponsiveContext.Provider value={{ responsive: !!responsive }}>
          {layout.kind === 'page' ? (
            <PageForm layout={layout} {...formProps} ref={ref}></PageForm>
          ) : (
            <TabForm layout={layout} {...formProps} ref={ref}></TabForm>
          )}
        </FormResponsiveContext.Provider>
      </RequireModeContext.Provider>
    );
  },
);

type FieldState = {
  error?: string;
  disabled?: boolean;
  required?: boolean;
  responsive?: boolean;
};
const FieldContext = createContext<null | FieldState>(null);

const useFieldContext = () => {
  const fieldContext = useContext(FieldContext);
  if (!fieldContext) {
    return { isContextAvailable: false };
  }

  return { ...fieldContext, isContextAvailable: true };
};

export {
  Form,
  FormSection,
  FormGroup,
  useFieldContext,
  DESCRIPTION_PREFIX,
  LABEL_PREFIX,
};
