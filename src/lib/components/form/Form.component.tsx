import {
  Children,
  createContext,
  forwardRef,
  HTMLProps,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { spacing, Stack, Wrap } from '../../spacing';
import { convertRemToPixels, getTheme } from '../../utils';
import { Box } from '../box/Box';
import { Icon, IconName } from '../icon/Icon.component';
import { IconHelp } from '../IconHelper';
import { ScrollbarWrapper } from '../scrollbarwrapper/ScrollbarWrapper.component';
import { Text } from '../text/Text.component';

const DESCRIPTION_PREFIX = 'describe-';
const maxWidthTooltip = { maxWidth: '20rem' };

type FormProps = Omit<
  HTMLProps<HTMLFormElement>,
  'ref' | 'as' | 'noValidate' | 'formNoValidate'
> & {
  children: ReactNode | ReactNode[];
  requireMode?: 'all' | 'partial';
  leftActions?: ReactNode;
  rightActions?: ReactNode;
  banner?: ReactNode;
};

type PageFormProps = {
  layout: { kind: 'page'; title: string; subTitle?: string };
} & FormProps;
type TabFormProps = { layout: { kind: 'tab' } } & FormProps;

const PageFormWrapper = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
`;

const BasicPageLayout = styled.div<{ layoutKind: 'page' | 'tab' }>`
  margin: 0 auto;
  ${(props) =>
    props.layoutKind === 'page'
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
    props.layoutKind === 'page'
      ? `
  border-bottom: 1px solid ${getTheme(props).border};
  `
      : ``}
`;

const FixedFooter = styled(BasicPageLayout)`
  border-top: 1px solid ${(props) => getTheme(props).border};
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

const LabelContext =
  createContext<{
    maxLabelWidth: number;
    setMaxLabelWidth: (setter: (value: number) => number) => void;
  } | null>(null);

const RequireModeContext = createContext<'all' | 'partial'>('partial');

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
  const { maxLabelWidth, setMaxLabelWidth } = useContext(LabelContext);
  const requireMode = useContext(RequireModeContext);

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
  }, [labelRef]);

  const value = {
    disabled: disabled || false,
    error: error || null,
  };

  return (
    <FieldContext.Provider value={value}>
      <Box
        display="flex"
        flexDirection={direction === 'horizontal' ? 'row' : 'column'}
        alignItems="baseline"
        gap={direction === 'horizontal' ? spacing['r32'] : spacing['r4']}
      >
        <div
          style={{
            width: maxLabelWidth === 0 ? 'max-content' : `${maxLabelWidth}px`,
          }}
        >
          <Stack>
            <label
              htmlFor={id}
              ref={labelRef}
              style={{ opacity: disabled ? 0.5 : 1 }}
            >
              <Text>
                {label}
                {requireMode !== 'all' && required && ' *'}
                {requireMode === 'all' && !required && ' (optional)'}
              </Text>
            </label>
            {labelHelpTooltip && (
              <IconHelp
                tooltipMessage={labelHelpTooltip}
                overlayStyle={maxWidthTooltip}
              />
            )}
          </Stack>
        </div>
        <Stack
          direction={helpErrorPosition === 'right' ? 'horizontal' : 'vertical'}
          gap={helpErrorPosition === 'right' ? 'r8' : 'r4'}
        >
          {content}
          {error ? (
            <Text
              variant="Smaller"
              color="statusCritical"
              isEmphazed
              id={`${DESCRIPTION_PREFIX}${id}`}
            >
              {error}
            </Text>
          ) : help ? (
            <div
              style={{
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <Text
                variant="Smaller"
                color="textSecondary"
                isEmphazed
                id={`${DESCRIPTION_PREFIX}${id}`}
              >
                {help}
              </Text>
            </div>
          ) : (
            <Text variant="Smaller" isEmphazed>
              &nbsp;
            </Text>
          )}
        </Stack>
      </Box>
    </FieldContext.Provider>
  );
};

type FormSectionProps = {
  children: ReactElement<FormGroupProps> | ReactElement<FormGroupProps>[];
  title?: { name: string; icon?: IconName; helpTooltip?: string };
  forceLabelWidth?: number;
};

const FormSection = ({
  children,
  title,
  forceLabelWidth,
}: FormSectionProps) => {
  const [maxLabelWidth, setMaxLabelWidth] = useState<number>(
    forceLabelWidth || 0,
  );
  //If all the formgroup are not required, add `(optional)` next to form section title.
  const groupNotOptional = Children.toArray(children).find(
    (child: ReactElement<FormGroupProps>) => child.props.required === true,
  );

  return (
    <LabelContext.Provider value={{ maxLabelWidth, setMaxLabelWidth }}>
      <Stack direction="vertical" gap="r12">
        {title && (
          <Stack direction="horizontal" gap="r8">
            {title.icon && <Icon name={title.icon} color="textPrimary" />}
            <Text isEmphazed>
              {groupNotOptional ? `${title.name}` : `${title.name} (optional)`}
            </Text>
            {title.helpTooltip && (
              <IconHelp
                tooltipMessage={title.helpTooltip}
                overlayStyle={maxWidthTooltip}
              />
            )}
          </Stack>
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
    return (
      <ScrollbarWrapper>
        <PageFormWrapper {...formProps} noValidate ref={ref}>
          <FixedHeader layoutKind="page">
            <PaddedForHeaderAndFooterContent>
              <Wrap>
                <Stack direction="vertical">
                  <Text variant="Larger">{layout.title}</Text>
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

          <ScrollArea layoutKind="page">
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

          <FixedFooter layoutKind="page">
            <PaddedForHeaderAndFooterContent>
              <Wrap>
                <div>{leftActions}</div>
                <div>{rightActions}</div>
              </Wrap>
            </PaddedForHeaderAndFooterContent>
          </FixedFooter>
        </PageFormWrapper>
      </ScrollbarWrapper>
    );
  },
);

const TabForm = forwardRef<HTMLFormElement, TabFormProps>(
  ({ leftActions, rightActions, children, banner, ...formProps }, ref) => {
    return (
      <ScrollbarWrapper>
        <PageFormWrapper {...formProps} noValidate ref={ref}>
          <FixedHeader layoutKind="tab">
            <Wrap>
              <div>{leftActions}</div>
              <div>{rightActions}</div>
            </Wrap>
          </FixedHeader>

          <ScrollArea layoutKind="tab">
            <Stack direction="vertical" gap="r24">
              {banner}
              <Stack direction="vertical" withSeparators gap="r24">
                {Children.toArray(children)}
              </Stack>
            </Stack>
          </ScrollArea>
        </PageFormWrapper>
      </ScrollbarWrapper>
    );
  },
);

const Form = forwardRef<HTMLFormElement, TabFormProps | PageFormProps>(
  ({ layout, requireMode, ...formProps }, ref) => {
    return (
      <RequireModeContext.Provider value={requireMode}>
        {layout.kind === 'page' ? (
          <PageForm layout={layout} {...formProps} ref={ref}></PageForm>
        ) : (
          <TabForm layout={layout} {...formProps} ref={ref}></TabForm>
        )}
      </RequireModeContext.Provider>
    );
  },
);

type FieldState = {
  error?: string;
  disabled?: boolean;
  required?: boolean;
};
const FieldContext = createContext<null | FieldState>(null);

const useFieldContext = () => {
  const fieldContext = useContext(FieldContext);
  if (!fieldContext) {
    return { isContextAvailable: false };
  }

  return { ...fieldContext, isContextAvailable: true };
};

export { Form, FormSection, FormGroup, useFieldContext, DESCRIPTION_PREFIX };
