import { useState } from 'react';
import { Hooks, Row } from 'react-table';
import styled from 'styled-components';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { spacing } from '../../spacing';
import { zIndex } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Icon } from '../icon/Icon.component';
import { Text } from '../text/Text.component';
import { useTableContext } from './Tablev2.component';

/**
 * Id of the synthetic trailing column injected by {@link useDroppedColumns}. It
 * starts hidden (listed in the table's `initialState.hiddenColumns`) and is
 * revealed by the responsive effect only while at least one `dropAt` column is
 * currently dropped and `revealDroppedColumns` is enabled.
 */
export const DROPPED_COLUMNS_COLUMN_ID = 'droppedColumns';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const TriggerButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.r4};
  height: 100%;
  padding: 0 ${spacing.r8};
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${getThemePropSelector('textPrimary')};
  &:hover {
    background-color: ${getThemePropSelector('highlight')};
  }
`;

const Panel = styled.div`
  min-width: 14rem;
  max-width: 24rem;
  padding: ${spacing.r4} 0;
  background-color: ${getThemePropSelector('backgroundLevel1')};
  border: 1px solid ${getThemePropSelector('border')};
  z-index: ${zIndex.dropdown};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r2};
  padding: ${spacing.r8} ${spacing.r16};
  color: ${getThemePropSelector('textPrimary')};
`;

const DroppedColumnsCell = ({ row }: { row: Row<object> }) => {
  const { droppedColumnIds } = useTableContext();
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-end',
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, { role: 'dialog' }),
  ]);

  // react-table keeps hidden columns' cells on `row.allCells`, so the dropped
  // values stay reachable here even though they are not rendered inline.
  const dropped = row.allCells.filter((cell) =>
    droppedColumnIds.has(cell.column.id),
  );

  if (dropped.length === 0) {
    return null;
  }

  return (
    <Container>
      <TriggerButton
        type="button"
        ref={refs.setReference}
        aria-label={`Show ${dropped.length} hidden ${
          dropped.length > 1 ? 'columns' : 'column'
        }`}
        {...getReferenceProps()}
      >
        <span>{`+${dropped.length}`}</span>
        <Icon name="Chevron-down" />
      </TriggerButton>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <Panel
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {dropped.map((cell) => (
                <Field key={cell.column.id}>
                  <Text variant="Small" color="textSecondary">
                    {cell.column.render('Header')}
                  </Text>
                  <Text>{cell.render('Cell')}</Text>
                </Field>
              ))}
            </Panel>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </Container>
  );
};

/**
 * Appends a trailing column whose per-row trigger opens a popover listing the
 * `Header: value` pairs of any column currently dropped for responsiveness, so
 * the data stays reachable on narrow viewports. Mirrors {@link useCheckbox}:
 * the column is injected through `hooks.visibleColumns` and its visibility is
 * driven by the table's existing responsive effect via `setHiddenColumns`.
 */
export const useDroppedColumns = (hooks: Hooks<object>) => {
  hooks.visibleColumns.push((columns, { instance }) =>
    instance.revealDroppedColumns
      ? [
          ...columns,
          {
            id: DROPPED_COLUMNS_COLUMN_ID,
            Header: () => null,
            Cell: DroppedColumnsCell,
            disableSortBy: true,
            cellStyle: { width: '60px', justifyContent: 'center' },
          },
        ]
      : columns,
  );
  // Re-run the visibleColumns memo when the feature is toggled at runtime, so
  // the synthetic column is added or removed accordingly.
  hooks.visibleColumnsDeps.push((deps, { instance }) => [
    ...deps,
    instance.revealDroppedColumns,
  ]);
};

useDroppedColumns.pluginName = 'useDroppedColumns';
