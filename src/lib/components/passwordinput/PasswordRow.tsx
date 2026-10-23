import styled from 'styled-components';
import { spacing } from '../../spacing';
import { convertSizeToRem } from '../inputv2/inputv2';

const FIELD_MIN_WIDTH = convertSizeToRem('1/3');

/**
 * `min-width: 0` overrides the row's automatic grid/flex minimum so it can shrink
 * below its own content; without it the field's `max-width: 100%` has nothing to
 * resolve against and the row refuses to give ground.
 */
export const PasswordRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  width: 100%;
  min-width: 0;
`;

export const PasswordFieldSlot = styled.div`
  flex: 0 1 auto;
  min-width: ${FIELD_MIN_WIDTH};
`;
