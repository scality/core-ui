import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
export const InputContainer = styled.div<{
  disabled: boolean;
  error: string;
  type: string;
}>`
  display: inline-flex;
  ${(props) => {
    if (props.disabled) {
      return css`
        opacity: 0.3;
        input,
        textarea,
        select,
        i {
          cursor: not-allowed;
        }
      `;
    }
  }}
  .sc-checkbox {
    margin: ${spacing.r4} 0;
  }

  &.sc-select {
    width: 200px;
  }

  input.sc-input-type {
    ${(props) => {
      const { backgroundLevel1, statusCritical, textSecondary, border } =
        props.theme;
      return css`
        background-color: ${backgroundLevel1};
        color: ${textSecondary};
        border: 1px solid ${props.error ? statusCritical : border};
      `;
    }};
    padding: 8px ${spacing.r8};
    font-size: ${fontSize.base};
    display: block;
    border-radius: 4px;
  }

  input.sc-input-type:focus {
    border-color: ${getThemePropSelector('selectedActive')};
    outline: none;
  }

  input[type='number'] {
    /* Adding a padding to make room for the custom absolute postionned arrows */
    padding-right: 20px;
    -moz-appearance: textfield; /*For FireFox*/

    &::-webkit-inner-spin-button {
      /*For Webkits like Chrome and Safari*/
      -webkit-appearance: none;
      margin: 0;
    }
  }

  ${(props) => {
    if (props.type === 'number')
      return css`
        .sc-input-wrapper {
          .sc-number-input-wrapper {
            position: relative;
          }
          align-items: baseline;
          .carets-wrapper {
            display: flex;
            flex-direction: column;
            ${(props) => {
              const { textSecondary } = props.theme;
              return css`
                color: ${textSecondary};
              `;
            }};
            position: absolute;
            right: ${spacing.r4};
            top: 50%;
            transform: translate(-50%, -50%);

            i {
              font-size: 0.8em;
              cursor: pointer;
            }
          }
        }
      `;
  }}

  ${(props) => {
    if (props.error) {
      return css`
        @keyframes shake {
          from,
          to {
            transform: translate3d(0, 0, 0);
          }

          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translate3d(-5px, 0, 0);
          }

          20%,
          40%,
          60%,
          80% {
            transform: translate3d(5px, 0, 0);
          }
        }
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-name: shake;
      `;
    }
  }};
`;
export const LabelStyle = styled.label`
  align-self: flex-start;
  padding: ${spacing.r8};
  font-size: ${fontSize.base};
  color: ${getThemePropSelector('textPrimary')};
`;
export const InputErrorMessage = styled.span`
  color: ${getThemePropSelector('statusCritical')};
  margin: ${spacing.r4} 0;
  font-size: ${fontSize.small};
`;
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
