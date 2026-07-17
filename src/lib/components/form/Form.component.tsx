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
   * Makes contained fields fluid: their `size`-derived width becomes a
   * preferred width that shrinks to fit the column (capped at `max-width: 100%`)
   * instead of overflowing. Note: only `Input` currently honors this — `Select`,
   * `SearchInput`, `TextArea` and other size-driven field content keep their
   * fixed width for now (tracked in CUI-36). Flex ancestors between the Form and
   * the field must allow shrinking (`min-width: 0`) for this to take effect.
   */
  responsive?: boolean;
  /**
   * Below this width (px), horizontal field rows flip to a stacked column
   * layout via a `@container` query. Vertical `FormGroup`s are left untouched.
   */
  flipAt?: number;
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

const StyledForm = styled.form<{
  $layout: PageFormProps['layout'] | TabFormProps['layout'];
  $flipAt?: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  background-color: ${(props) =>
    props.$layout.kind === 'page' && props.theme.backgroundLevel4};
  ${({ $flipAt }) =>
    $flipAt &&
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

const FieldRow = styled.div<{
  $direction: 'vertical' | 'horizontal';
  $responsive?: boolean;
  $flipAt?: number;
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
  ${({ $responsive }) =>
    $responsive &&
    css`
      min-width: 0;
    `}
  ${({ $flipAt }) =>
    $flipAt &&
    css`
      @container responsive (max-width: ${$flipAt}px) {
        flex-direction: column;
        align-items: stretch;
        gap: ${spacing.r4};
      }
    `}
`;

const FieldLabelBox = styled.div<{ $width: string; $flipAt?: number }>`
  width: ${({ $width }) => $width};
  flex: none;
  ${({ $flipAt }) =>
    $flipAt &&
    css`
      @container responsive (max-width: ${$flipAt}px) {
        width: auto;
        flex: initial;
      }
    `}
`;

const LabelContext = createContext<{
  maxLabelWidth: number;
  setMaxLabelWidth: (setter: (value: number) => number) => void;
} | null>(null);

const RequireModeContext = createContext<'all' | 'partial'>('partial');

const FormResponsiveContext = createContext<{
  responsive: boolean;
  flipAt?: number;
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

  const { maxLabelWidth, setMaxLabelWidth } = ctxt;
  const requireMode = useContext(RequireModeContext);
  const { responsive, flipAt } = useContext(FormResponsiveContext);
  // The row→column flip only makes sense for horizontal rows; a vertical
  // FormGroup is already stacked and must keep its label-column alignment.
  const rowFlipAt = direction === 'horizontal' ? flipAt : undefined;
  const labelRef = useRef<HTMLLabelElement | null>(null);
  useEffect(() => {
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
  }, [labelRef, labelHelpTooltip, setMaxLabelWidth]);

  const value = {
    disabled: disabled || false,
    error: error || undefined,
    responsive,
  };

  return (
    <FieldContext.Provider value={value}>
      <FieldRow
        $direction={direction}
        $responsive={responsive}
        $flipAt={rowFlipAt}
      >
        <FieldLabelBox
          $width={maxLabelWidth === 0 ? 'max-content' : `${maxLabelWidth}px`}
          $flipAt={rowFlipAt}
        >
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
        </FieldLabelBox>
        <Stack
          direction={helpErrorPosition === 'right' ? 'horizontal' : 'vertical'}
          gap={helpErrorPosition === 'right' ? 'r8' : 'r4'}
          style={responsive ? { minWidth: 0 } : undefined}
        >
          {content}
          {error ? (
            <HelperText color="statusCritical" id={`${DESCRIPTION_PREFIX}${id}`}>{error}</HelperText>
          ) : help ? (
            <div
              style={{
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <HelperText color="textSecondary" id={`${DESCRIPTION_PREFIX}${id}`}>{help}</HelperText>
            </div>
          ) : (
            <HelperText>
              &nbsp;
            </HelperText>
          )}
        </Stack>
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
  const [maxLabelWidth, setMaxLabelWidth] = useState<number>(
    forceLabelWidth || 0,
  );
  //If all the formgroup are not required, add `(optional)` next to form section title.
  const groupNotOptional = Children.toArray(children).find((child) =>
    isValidElement(child) ? child.props.required === true : false,
  );

  return (
    <LabelContext.Provider value={{ maxLabelWidth, setMaxLabelWidth }}>
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
        {children}
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
    const { flipAt } = useContext(FormResponsiveContext);
    return (
      <ScrollbarWrapper>
        <StyledForm
          {...formProps}
          noValidate
          ref={ref}
          $layout={layout}
          $flipAt={flipAt}
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
  ({ layout, leftActions, rightActions, children, banner, ...formProps }, ref) => {
    const { flipAt } = useContext(FormResponsiveContext);
    return (
      <ScrollbarWrapper>
        <StyledForm
          {...formProps}
          noValidate
          ref={ref}
          $layout={layout}
          $flipAt={flipAt}
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
  ({ layout, requireMode, responsive, flipAt, ...formProps }, ref) => {
    return (
      <RequireModeContext.Provider value={requireMode || 'partial'}>
        <FormResponsiveContext.Provider
          value={{ responsive: !!responsive, flipAt }}
        >
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
