import {
  Children,
  createContext,
  FormHTMLAttributes,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import { spacing, Stack, Wrap } from '../../spacing';
import { convertRemToPixels } from '../../utils';
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

// Non-responsive layout: a flex row (horizontal) or column (vertical). The label
// column width comes from measurement (see FormGroup / LabelContext).
const FieldRow = styled.div<{
  $direction: 'vertical' | 'horizontal';
}>`
  display: flex;
  align-items: baseline;
  ${({ $direction }) =>
    $direction === 'horizontal'
      ? css`
          flex-direction: row;
          gap: ${spacing.r32};
        `
      : css`
          flex-direction: column;
          gap: ${spacing.r4};
        `}
`;

const FieldLabelBox = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  flex: none;
  overflow-wrap: break-word;
`;

// Responsive layout: the FormSection grid. Every FormGroup subgrid row borrows
// these two tracks, so labels align across the section with no measurement. The
// label track hugs its content (or is frozen by `forceLabelWidth`); the field
// track carries the field floor. Below STACK_BELOW the whole section stacks.
const SectionGrid = styled.div<{ $labelTrack: string }>`
  display: grid;
  grid-template-columns:
    ${({ $labelTrack }) => $labelTrack}
    minmax(${FIELD_MIN_REM}rem, 1fr);
  column-gap: ${spacing.r32};
  row-gap: ${spacing.r12};

  @container responsive (max-width: ${STACK_BELOW}) {
    grid-template-columns: 1fr;
    /* Stacked groups need more separation than side-by-side rows: each group is
       now two lines (label over field), so widen the gap between groups. */
    row-gap: ${spacing.r20};
  }
`;

// A FormGroup as a subgrid row. Horizontal rows inherit the section's two tracks
// and flip to a single column at STACK_BELOW; vertical rows are always a single
// column (label stacked above its field).
const FieldSubgridRow = styled.div<{
  $direction: 'vertical' | 'horizontal';
}>`
  display: grid;
  grid-column: 1 / -1;
  row-gap: ${spacing.r4};
  ${({ $direction }) =>
    $direction === 'horizontal'
      ? css`
          grid-template-columns: subgrid;
          align-items: baseline;

          @container responsive (max-width: ${STACK_BELOW}) {
            grid-template-columns: 1fr;
            align-items: stretch;
          }
        `
      : css`
          grid-template-columns: 1fr;
        `}
`;

const GridLabelCell = styled.div<{ $hasHelpTooltip: boolean }>`
  min-width: 0;
  overflow-wrap: break-word;
  ${({ $hasHelpTooltip }) =>
    $hasHelpTooltip &&
    css`
      /* The non-responsive column reserves 2rem beyond the label for the help
         icon affordance; reserve the same here so the label column is identical
         in both layouts. */
      padding-right: ${spacing.r32};
    `}
`;

const LabelContext = createContext<{
  maxLabelWidth: number;
  setMaxLabelWidth: (setter: (value: number) => number) => void;
  isLabelWidthFixed: boolean;
} | null>(null);

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
  const ctxt = useContext(LabelContext);
  if (!ctxt) {
    //intentionaly breaking rules of hooks here
    throw new Error('FormGroup cannot be used outside of FormSection');
  }

  const { maxLabelWidth, setMaxLabelWidth, isLabelWidthFixed } = ctxt;
  const requireMode = useContext(RequireModeContext);
  const { responsive } = useContext(FormResponsiveContext);
  const labelRef = useRef<HTMLLabelElement | null>(null);
  useEffect(() => {
    // The responsive grid sizes the label column from content (no measurement),
    // and a fixed (forced) label width never grows to the label either.
    if (responsive || isLabelWidthFixed) return;
    if (labelRef.current) {
      const width = labelRef.current.getBoundingClientRect().width;
      setMaxLabelWidth((currentMaxLabelWidth) => {
        const additionalWdth = labelHelpTooltip ? convertRemToPixels(2) : 0;
        if (width + additionalWdth > currentMaxLabelWidth) {
          return width + additionalWdth;
        }
        return currentMaxLabelWidth;
      });
    }
  }, [
    labelRef,
    labelHelpTooltip,
    setMaxLabelWidth,
    isLabelWidthFixed,
    responsive,
  ]);

  const value = {
    disabled: disabled || false,
    error: error || undefined,
    responsive,
  };

  const labelContent = (
    <label
      htmlFor={id}
      id={`${LABEL_PREFIX}${id}`}
      ref={labelRef}
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

  if (responsive) {
    return (
      <FieldContext.Provider value={value}>
        <FieldSubgridRow $direction={direction}>
          <GridLabelCell $hasHelpTooltip={!!labelHelpTooltip}>
            {labelContent}
          </GridLabelCell>
          {fieldContent}
        </FieldSubgridRow>
      </FieldContext.Provider>
    );
  }

  return (
    <FieldContext.Provider value={value}>
      <FieldRow $direction={direction}>
        <FieldLabelBox
          $width={maxLabelWidth === 0 ? 'max-content' : `${maxLabelWidth}px`}
        >
          {labelContent}
        </FieldLabelBox>
        {fieldContent}
      </FieldRow>
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
  // `forceLabelWidth` is a hard cap: when set, the label column stays exactly
  // that wide and label measurement never grows it (long labels wrap), mirroring
  // how `Input`'s `size` fixes the field width. When unset, the column auto-sizes
  // to the widest measured label.
  const isLabelWidthFixed = forceLabelWidth != null;
  const [measuredLabelWidth, setMaxLabelWidth] = useState<number>(0);
  const maxLabelWidth = isLabelWidthFixed
    ? forceLabelWidth
    : measuredLabelWidth;
  const { responsive } = useContext(FormResponsiveContext);
  //If all the formgroup are not required, add `(optional)` next to form section title.
  const groupNotOptional = Children.toArray(children).find((child) =>
    isValidElement(child) ? child.props.required === true : false,
  );

  // In responsive mode the label column is a grid track, sized from content or
  // frozen by `forceLabelWidth` (the hard cap).
  const labelTrack = isLabelWidthFixed
    ? `${forceLabelWidth}px`
    : 'minmax(min-content, max-content)';

  return (
    <LabelContext.Provider
      value={{ maxLabelWidth, setMaxLabelWidth, isLabelWidthFixed }}
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
        {responsive ? (
          <SectionGrid $labelTrack={labelTrack}>{children}</SectionGrid>
        ) : (
          children
        )}
      </Stack>
    </LabelContext.Provider>
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
