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
import { Box } from '../box/Box';
import { Icon, IconName } from '../icon/Icon.component';
import { IconHelp } from '../iconhelper/IconHelper';
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
   * Note: only `Input` currently honors the fluid width — `Select`, `SearchInput`,
   * `TextArea` and other size-driven content keep their fixed width for now
   * (tracked in CUI-36).
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
// labels align per section from content alone — no measurement. Below STACK_BELOW
// the grid collapses to a single column (fields stack under their labels) via a
// `@container` query, so a field never shrinks small enough to truncate.
// Both floors are a readability policy, not component-derived: fluid fields carry
// `min-width: 0`, so there is no intrinsic minimum to read.
// - field floor: the `1/2` Input size (10rem) — below this a field stacks.
// - label floor: ~24ch — long labels wrap to about two lines before stacking.
const FIELD_MIN_REM = 10;
const LABEL_MIN_CH = 24;
const STACK_BELOW = `calc(${LABEL_MIN_CH}ch + ${FIELD_MIN_REM}rem + ${spacing.r32})`;

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
      container-type: inline-size;
      container-name: responsive;
    `}
`;

const BasicPageLayout = styled.div<{ $layoutKind: 'page' | 'tab' }>`
  margin: 0 auto;
  ${(props) =>
    props.$layoutKind === 'page'
      ? `
  width: 45rem;
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
// flip to a stacked single column below STACK_BELOW via an `@container` query.
const SectionGrid = styled.div<{
  $labelTrack: string;
  $responsive: boolean;
  $fixedLabel: boolean;
}>`
  ${({ $labelTrack, $responsive, $fixedLabel }) =>
    $fixedLabel
      ? css`
          display: flex;
          flex-direction: column;
          gap: ${spacing.r12};
          ${
            $responsive &&
            css`
              @container responsive (max-width: ${STACK_BELOW}) {
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
              @container responsive (max-width: ${STACK_BELOW}) {
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
}>`
  display: grid;
  grid-column: 1 / -1;
  row-gap: ${spacing.r4};
  ${({ $direction, $responsive, $labelTrack, $fixedLabel }) => {
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
          @container responsive (max-width: ${STACK_BELOW}) {
            grid-template-columns: 1fr;
            align-items: stretch;
          }
        `
      }
    `;
  }}
`;

const GridLabelCell = styled.div<{ $hasHelpTooltip: boolean }>`
  min-width: 0;
  ${({ $hasHelpTooltip }) =>
    $hasHelpTooltip &&
    css`
      /* The non-responsive column reserves 2rem beyond the label for the help
         icon affordance; reserve the same here so the label column is identical
         in both layouts. */
      padding-right: ${spacing.r32};
    `}
`;

// Carries the section's label-column config down to each FormGroup so a row can
// build its own layout. Null outside a FormSection — a FormGroup then throws.
type SectionLabelConfig = {
  labelTrack: string;
  fixedLabel: boolean;
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
      <Text>
        {label}
        {requireMode !== 'all' && required && ' *'}
        {requireMode === 'all' && !required && ' (optional)'}
      </Text>
      {labelHelpTooltip && (
        <Box
          display="inline-block"
          marginLeft={spacing.r8}
          style={{ whiteSpace: 'nowrap' }}
        >
          <IconHelp
            tooltipMessage={labelHelpTooltip}
            overlayStyle={maxWidthTooltip}
          />
        </Box>
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
      >
        <GridLabelCell $hasHelpTooltip={!!labelHelpTooltip}>
          {labelContent}
        </GridLabelCell>
        {fieldContent}
      </FieldSubgridRow>
    </FieldContext.Provider>
  );
};

type FormSectionProps = {
  children: ReactElement<FormGroupProps> | ReactElement<FormGroupProps>[];
  title?: { name: string; icon?: IconName; helpTooltip?: string };
  /**
   * Freezes the label column to exactly this pixel width — a hard cap: labels
   * wider than it wrap rather than widening the column. When unset, the column
   * auto-sizes to the widest label in the section.
   */
  forceLabelWidth?: number;
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

  // The label column. `forceLabelWidth` is a hard cap that freezes it to an exact
  // pixel width (long labels then wrap, mirroring how `Input`'s `size` fixes the
  // field width); it also makes every FormGroup row self-sufficient, so nesting a
  // group inside another element no longer breaks its layout. When unset, the
  // column auto-sizes to the widest label from content, shared across rows via
  // `subgrid` — no measurement. Responsive lets the track shrink to its longest
  // word (min-content) before the section flips; non-responsive hugs it
  // (max-content).
  const fixedLabel = forceLabelWidth != null;
  const labelTrack = fixedLabel
    ? `${forceLabelWidth}px`
    : responsive
      ? 'minmax(min-content, max-content)'
      : 'max-content';

  return (
    <FormSectionContext.Provider value={{ labelTrack, fixedLabel }}>
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
