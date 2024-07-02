import styled from 'styled-components';
import { Icon } from './icon/Icon.component';
import { Loader } from './loader/Loader.component';
import {
  TableHeightKeyType,
  TableLocalType,
  tableRowHeight,
  translatedMessages,
} from './tablev2/TableUtils';
import { Text } from './text/Text.component';
import { Box } from './box/Box';
import { spacing } from '../spacing';

export const NoResult = styled(Box)<{ height: number | string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textSecondary};
  height: ${(props) => props.height}rem;
  gap: ${spacing.r8};
`;

export type UnsuccessfulResultProps = {
  name?: {
    en: { singular: string; plural: string };
    fr?: { singular: string; plural: string };
  };
  locale?: TableLocalType;
  status: 'error' | 'loading' | 'idle' | 'noResult';
} & (
  | { rowHeight: TableHeightKeyType; heightInRem?: never }
  | { rowHeight?: never; heightInRem?: number | string }
);

export const UnsuccessfulResult = (props: UnsuccessfulResultProps) => {
  const { heightInRem = 5, name, locale, status, rowHeight } = props;
  const height = rowHeight ? tableRowHeight[rowHeight] : heightInRem;
  return (
    <NoResult height={height}>
      {(status === 'loading' || status === 'idle') && <Loader />}
      {status === 'error' && (
        <Icon name="Exclamation-circle" color="statusWarning" />
      )}

      <Text color="textSecondary">
        {translatedMessages(status, name, locale)}
      </Text>
    </NoResult>
  );
};
