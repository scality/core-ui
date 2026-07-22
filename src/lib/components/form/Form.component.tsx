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

// A FormSection is always a two-column CSS grid (label track + field track), and
// each FormGroup is a `subgrid` row — so labels align across the section from
// content alone, no measurement in either mode. The two modes differ only in the
// field track and whether the section can flip:
//   - responsive: field track is fluid (minmax(10rem, 1fr)) and the section flips
//     to a single stacked column below STACK_BELOW via an `@container` query.
//   - non-responsive: field track hugs its content (max-content) and never flips.
const SectionGrid = styled.div<{ $labelTrack: string; $responsive: boolean }>`
  display: grid;
  column-gap: ${spacing.r32};
  row-gap: ${spacing.r12};
  ${({ $labelTrack, $responsive }) =>
    $responsive
      ? css`
          grid-template-columns: ${$labelTrack} minmax(
              ${FIELD_MIN_REM}rem,
              1fr
            );

          @container responsive (max-width: ${STACK_BELOW}) {
            grid-template-columns: 1fr;
            /* Stacked groups need more separation than side-by-side rows: each
               group is now two lines (label over field), so widen the gap. */
            row-gap: ${spacing.r20};
          }
        `
      : css`
          grid-template-columns: ${$labelTrack} max-content;
        `}
`;

// A FormGroup as a subgrid row. Horizontal rows inherit the section's two tracks
// (and, when responsive, flip to a single column at STACK_BELOW); vertical rows
// are always a single column (label stacked above its field).
const FieldSubgridRow = styled.div<{
  $direction: 'vertical' | 'horizontal';
  $responsive: boolean;
}>`
  display: grid;
  grid-column: 1 / -1;
  row-gap: ${spacing.r4};
  ${({ $direction, $responsive }) =>
    $direction === 'horizontal'
      ? css`
          grid-template-columns: subgrid;
          align-items: baseline;
          ${
            $responsive &&
            css`
              @container responsive (max-width: ${STACK_BELOW}) {
                grid-template-columns: 1fr;
                align-items: stretch;
              }
            `
          }
        `
      : css`
          grid-template-columns: 1fr;
        `}
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

// Presence marker so a FormGroup can assert it is rendered inside a FormSection
// (its `subgrid` row is meaningless without the section grid as its parent).
const FormSectionContext = createContext<boolean>(false);

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
  const insideSection = useContext(FormSectionContext);
  const requireMode = useContext(RequireModeContext);
  const { responsive } = useContext(FormResponsiveContext);
  if (!insideSection) {
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
      style={responsive ? { minWidth: 0 } : undefined}
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
      <FieldSubgridRow $direction={direction} $responsive={responsive}>
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

  // The label column is a grid track. `forceLabelWidth` is a hard cap that freezes
  // it (long labels then wrap, mirroring how `Input`'s `size` fixes the field
  // width). Otherwise it auto-sizes to the widest label from content — the grid
  // aligns labels across the section, so no measurement is needed. Responsive
  // lets the track shrink to its longest word (min-content) before the section
  // flips; non-responsive hugs the widest label (max-content).
  const labelTrack =
    forceLabelWidth != null
      ? `${forceLabelWidth}px`
      : responsive
        ? 'minmax(min-content, max-content)'
        : 'max-content';

  return (
    <FormSectionContext.Provider value={true}>
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
        <SectionGrid $labelTrack={labelTrack} $responsive={responsive}>
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
