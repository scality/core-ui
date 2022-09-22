import {
  Children,
  createContext,
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

type FormProps = HTMLProps<HTMLFormElement> & {
  layout: 'page' | 'tab';
  children: ReactNode | ReactNode[];
  requireMode?: 'all' | 'partial';
  leftActions?: ReactNode;
  rightActions?: ReactNode;
  title?: string;
  banner?: ReactNode;
};

const PageFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
`;

const BasicPageLayout = styled.div`
  margin: 0 auto;
  width: 45rem;
`;

const FixedHeader = styled(BasicPageLayout)`
  border-bottom: 1px solid ${(props) => getTheme(props).border};
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

type ContentProps = {
  helper: string;
  error: string;
};

type FormGroupProps = {
  direction: 'vertical' | 'horizontal';
  label: string;
  id: string;
  content: ReactElement<ContentProps>;
  labelHelpTooltip?: string;
  help?: string;
  error?: string;
  required?: boolean;
  helpErrorPosition?: 'right' | 'bottom';
  disabled?: boolean;
};

const LabelContext = createContext({
  maxLabelWidth: 0,
  setMaxLabelWidth: (setter: (value: number) => number) => {},
});

const RequireModeContext = createContext<'all' | 'partial'>('partial');

const FormGroup = ({
  direction,
  label,
  id,
  labelHelpTooltip,
  content,
  help,
  error,
  required,
  helpErrorPosition,
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
    [id]: {
      disabled: disabled || false,
      error: error || null,
    },
  };

  return (
    <FieldContext.Provider value={value}>
      <Box
        display={'flex'}
        flexDirection={direction === 'horizontal' ? 'row' : 'column'}
        alignItems={'baseline'}
        gap={direction === 'horizontal' ? spacing['r32'] : spacing['r4']}
      >
        <div
          style={{
            width: `${
              maxLabelWidth === 0 ? 'max-content' : `${maxLabelWidth}px`
            }`,
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <Stack>
            <label htmlFor={id} ref={labelRef}>
              <Text>
                {label}
                {requireMode !== 'all' && required && ' *'}
                {requireMode === 'all' && !required && ' (optional)'}
              </Text>
            </label>
            {labelHelpTooltip && (
              <IconHelp
                tooltipMessage={labelHelpTooltip}
                overlayStyle={{ maxWidth: '20rem' }}
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
            <Text variant="Smaller" isEmphazed={true}>
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
  title?: string;
  icon?: IconName;
  helpTooltip?: string;
};

const FormSection = ({
  children,
  title,
  icon,
  helpTooltip,
}: FormSectionProps) => {
  const [maxLabelWidth, setMaxLabelWidth] = useState(0);
  //If all the formgroup are not required, add `(optional)` next to form section title.
  const groupNotOptional = Children.toArray(children).find(
    (child: ReactElement<FormGroupProps>) => child.props.required === true,
  );

  return (
    <LabelContext.Provider value={{ maxLabelWidth, setMaxLabelWidth }}>
      <Stack direction="vertical" gap="r12">
        {title && (
          <Stack direction="horizontal" gap="r8">
            {icon && <Icon name={icon}></Icon>}
            <Text isEmphazed>
              {groupNotOptional ? `${title}` : `${title} (optional)`}
            </Text>
            {helpTooltip && (
              <IconHelp
                tooltipMessage={helpTooltip}
                overlayStyle={{ maxWidth: '20rem' }}
              />
            )}
          </Stack>
        )}
        {children}
      </Stack>
    </LabelContext.Provider>
  );
};

const PageForm = ({
  title,
  leftActions,
  rightActions,
  children,
  banner,
}: Omit<FormProps, 'layout'>) => {
  const requireMode = useContext(RequireModeContext);
  return (
    <ScrollbarWrapper>
      <PageFormWrapper>
        <FixedHeader>
          <PaddedForHeaderAndFooterContent>
            <Text variant="Larger">{title}</Text>
          </PaddedForHeaderAndFooterContent>
        </FixedHeader>

        <ScrollArea>
          <PaddedContent>
            {banner}
            {requireMode === 'partial' && (
              <div style={{ paddingBottom: `${spacing.r24}` }}>
                <Text isEmphazed color="textSecondary">
                  * are required fields
                </Text>
              </div>
            )}
            <Stack direction="vertical" withSeparators gap="r24">
              {Children.toArray(children)}
            </Stack>
          </PaddedContent>
        </ScrollArea>

        <FixedFooter>
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
};

const TabForm = ({
  leftActions,
  rightActions,
  children,
  banner,
}: Omit<FormProps, 'layout'>) => {
  return (
    <ScrollbarWrapper>
      <PageFormWrapper>
        <FixedHeader>
          <PaddedForHeaderAndFooterContent>
            <Wrap>
              <div>{leftActions}</div>
              <div>{rightActions}</div>
            </Wrap>
          </PaddedForHeaderAndFooterContent>
        </FixedHeader>

        <ScrollArea>
          {banner}
          <PaddedContent>
            <Stack direction="vertical" withSeparators gap="r24">
              {Children.toArray(children)}
            </Stack>
          </PaddedContent>
        </ScrollArea>
      </PageFormWrapper>
    </ScrollbarWrapper>
  );
};

const Form = ({ layout, requireMode, ...formProps }: FormProps) => {
  return (
    <RequireModeContext.Provider value={requireMode}>
      {layout === 'page' ? (
        <PageForm {...formProps}></PageForm>
      ) : (
        <TabForm {...formProps}></TabForm>
      )}
    </RequireModeContext.Provider>
  );
};

type FieldState = {
  error?: string;
  disabled?: boolean;
  required?: boolean;
};
const FieldContext = createContext<null | Record<string, FieldState>>(null);

const useFieldContext = (id: string) => {
  const fieldContext = useContext(FieldContext);
  if (!fieldContext || !fieldContext[id]) {
    return { isContextAvailable: false };
  }

  return { ...fieldContext[id], isContextAvailable: true };
};

export { Form, FormSection, FormGroup, useFieldContext, DESCRIPTION_PREFIX };
