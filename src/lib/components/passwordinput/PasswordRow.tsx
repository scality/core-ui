import styled from 'styled-components';
import { spacing } from '../../spacing';
import { INPUT_MIN_WIDTH } from '../inputv2/inputv2';

/**
 * `width: 100%` and `min-width: 0` are what give the field's own `max-width: 100%`
 * something to resolve against. Without them the row sizes to its content, and the
 * field cannot give ground however it is configured.
 */
export const PasswordRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  width: 100%;
  min-width: 0;
`;

/**
 * `flex-grow: 0` on purpose. `Input` caps itself at `max-width: 100%` but never grows
 * past the width its `size` asks for, so a growing slot would stretch away from the
 * field and leave the gap between the field and its buttons rather than after them.
 */
export const PasswordFieldSlot = styled.div`
  flex: 0 1 auto;
  min-width: ${INPUT_MIN_WIDTH};
`;
