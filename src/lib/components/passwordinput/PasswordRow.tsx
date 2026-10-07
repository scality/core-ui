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

export const PasswordFieldSlot = styled.div`
  flex: 1 1 auto;
  min-width: ${INPUT_MIN_WIDTH};
`;
