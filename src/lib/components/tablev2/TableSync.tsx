import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Button } from '../buttonv2/Buttonv2.component';
import { Icon } from '../icon/Icon.component';

export type TableSyncProps = {
  onSync: () => void;
  tooltipOverlay?: string;
  loading?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

const TableSyncContainer = styled.div`
  display: flex;
  align-items: center;
`;

export function TableSync({
  onSync,
  tooltipOverlay,
  loading = false,
  ...rest
}: TableSyncProps) {
  return (
    <TableSyncContainer>
      <Button
        icon={<Icon name="Sync" />}
        tooltip={tooltipOverlay ? { overlay: tooltipOverlay } : {overlay: "Synchronize table data"}}
        onClick={onSync}
        role="button"
        isLoading={loading}
        {...rest}
      />
    </TableSyncContainer>
  );
}
