import {
  CSSProperties,
  forwardRef,
  TextareaHTMLAttributes,
  ForwardedRef,
  useEffect,
  useRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';

type TextAreaVariant = 'code' | 'text';
type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: TextAreaVariant;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  /**
   * Automatically adjust height to fit content
   * When enabled, the textarea will grow/shrink to show all content
   * It disables the resize property
   */
  autoGrow?: boolean;
};
type RefType = HTMLTextAreaElement | null;

const TextAreaContainer = styled.textarea<{
  variant: TextAreaVariant;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  autoGrow?: boolean;
}>`
  padding: ${spacing.r12} ${spacing.r8};
  border-radius: 4px;
  resize: vertical;
  font-family: ${(props) =>
    props.variant === 'code' ? 'Courier New' : 'Lato'};
  font-size: ${spacing.f14};

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}

  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `}

  ${(props) =>
    props.autoGrow &&
    css`
      resize: none;
      overflow: hidden;
    `}

  &:placeholder-shown {
    font-style: italic;
  }
  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.5;
  }
  &:hover {
    ${(props) =>
      !props.disabled &&
      `border: ${spacing.r1} solid ${props.theme.infoPrimary};`}
  }
  &:focus {
    border: ${spacing.r1} solid ${(props) => props.theme.infoPrimary};
  }
  ${(props) => {
    const { border, textSecondary, backgroundLevel1, selectedActive } =
      props.theme;
    return css`
      border-color: ${border};
      color: ${textSecondary};
      background: ${backgroundLevel1};
      &:focus {
        border-color: ${selectedActive};
        outline: none;
      }
    `;
  }}
`;

function TextAreaElement(
  {
    rows = 3,
    cols = 20,
    width,
    height,
    variant = 'code',
    autoGrow = false,
    value,
    defaultValue,
    onChange,
    ...rest
  }: Props,
  ref: ForwardedRef<RefType>,
) {
  const internalRef = useRef<HTMLTextAreaElement>(null);

  // Expose the textarea element to parent components via forwarded ref
  useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

  const adjustHeight = useCallback(() => {
    const textarea = internalRef.current;
    if (!textarea || !autoGrow) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';

    // Set the height to match the content
    const newHeight = textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`;
  }, [autoGrow]);

  // Adjust height on mount to fit initial content
  useEffect(() => {
    adjustHeight();
  }, []);

  if (width || height) {
    return (
      <TextAreaContainer
        className="sc-textarea"
        width={width}
        height={height}
        variant={variant}
        autoGrow={autoGrow}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
        ref={internalRef}
      />
    );
  }

  return (
    <TextAreaContainer
      className="sc-textarea"
      rows={rows}
      cols={cols}
      variant={variant}
      autoGrow={autoGrow}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      {...rest}
      ref={internalRef}
    />
  );
}

export const TextArea = forwardRef<RefType, Props>(TextAreaElement);
