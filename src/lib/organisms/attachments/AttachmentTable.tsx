import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useCombobox, UseComboboxStateChange } from 'downshift';
import { Box, Button, Table } from '../../next';

import {
  ConstrainedText,
  Icon,
  Loader,
  SearchInput,
  SecondaryText,
  Text,
  Tooltip,
} from '../../index';
import styled from 'styled-components';
import { spacing, Stack, Wrap } from '../../spacing';
import {
  AttachableEntity,
  AttachmentOperation,
  AttachmentAction,
} from './AttachmentTypes';
import { useQuery, UseQueryOptions } from 'react-query';
import { EmptyCell } from '../../components/tablev2/Tablev2.component';
import { tableRowHeight } from '../../components/tablev2/TableUtils';

type AttachableEntityWithPendingStatus<ENTITY_TYPE> = {
  isPending?: boolean;
} & AttachableEntity<ENTITY_TYPE>;

export type AttachmentTableProps<
  ENTITY_TYPE,
  ENTITY extends Record<string, unknown> = Record<string, unknown>,
> = {
  initiallyAttachedEntities: AttachableEntity<ENTITY_TYPE, ENTITY>[];
  initiallyAttachedEntitiesStatus: 'idle' | 'loading' | 'success' | 'error';
  initialAttachmentOperations: AttachmentOperation<ENTITY_TYPE, ENTITY>[];
  entityName: { plural: string; singular: string };
  getNameQuery?: (
    entity: AttachableEntity<ENTITY_TYPE, ENTITY>,
  ) => UseQueryOptions<unknown, unknown, string>;
  searchEntityPlaceholder: string;
  onAttachmentsOperationsChanged: (
    attachmentOperations: AttachmentOperation<ENTITY_TYPE, ENTITY>[],
  ) => void;
  filteredEntities:
    | { status: 'idle' }
    | {
        status: 'loading' | 'error';
        data?: {
          number: number;
          entities: AttachableEntity<ENTITY_TYPE, ENTITY>[];
        };
      }
    | {
        status: 'success';
        data: {
          number: number;
          entities: AttachableEntity<ENTITY_TYPE, ENTITY>[];
        };
      };
  onEntitySearchChange: (search?: string) => void;
};

const rowHeight = 'h48';

const MenuContainer = styled.ul<{
  width: string;
  isOpen: boolean;
  searchInputIsFocused: boolean;
}>`
  background-color: ${(props) => props.theme.backgroundLevel1};
  background-clip: content-box;
  padding: 0;
  list-style: none;
  position: absolute;
  width: ${(props) => props.width};
  z-index: 1;
  margin: 0;
  ${(props) =>
    props.isOpen
      ? `
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
      border: 1px solid ${props.theme.selectedActive};
  `
      : props.searchInputIsFocused
      ? `border-bottom: 1px solid ${props.theme.selectedActive};`
      : ''}
  border-top: 0;
  li {
    padding: ${spacing.r8};
    cursor: pointer;
    border-top: 1px solid ${(props) => props.theme.backgroundLevel2};
    &[aria-selected='true'] {
      background: ${(props) => props.theme.highlight};
    }
  }
`;

const SearchBoxContainer = styled.div`
  position: relative;
  padding: ${spacing.r16};
`;

const StyledSearchInput = styled(SearchInput)<{ searchInputIsFocused }>`
  flex-grow: 1;

  & > div:focus-within {
    border-color: ${(props) => props.theme.selectedActive};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 0;
  }
`;

const AttachmentTableContainer = styled.div`
  height: 100%;
`;

const CenterredSecondaryText = styled(SecondaryText)`
  display: block;
  text-align: center;
  line-height: ${tableRowHeight[rowHeight]}rem;
`;

const PrivateAttachmentContext = createContext<{
  setResetAttachementTable: Dispatch<
    SetStateAction<
      (
        initiallyAttachedEntities: AttachableEntity<any, any>[], //Deliberately using any here because we can't use generics
        initialAttachmentOperations: AttachmentOperation<any, any>[],
      ) => void
    >
  >;
} | null>(null);
const AttachmentContext = createContext<{
  resetAttachmentTable: (
    initiallyAttachedEntities: AttachableEntity<any, any>[], //Deliberately using any here because we can't use generics
    initialAttachmentOperations: AttachmentOperation<any, any>[],
  ) => void;
} | null>(null);

export const AttachmentProvider = <
  ENTITY_TYPE extends unknown,
  ENTITY extends Record<string, unknown> = Record<string, unknown>,
>({
  children,
}: PropsWithChildren<{}>) => {
  const [resetAttachmentTable, setResetAttachementTable] = useState<
    (
      initiallyAttachedEntities: AttachableEntity<ENTITY_TYPE, ENTITY>[],
      initialAttachmentOperations: AttachmentOperation<ENTITY_TYPE, ENTITY>[],
    ) => void
  >(
    (
      _: AttachableEntity<ENTITY_TYPE, ENTITY>[],
      __: AttachmentOperation<ENTITY_TYPE, ENTITY>[],
    ) => {},
  );
  return (
    <PrivateAttachmentContext.Provider value={{ setResetAttachementTable }}>
      <AttachmentContext.Provider value={{ resetAttachmentTable }}>
        {children}
      </AttachmentContext.Provider>
    </PrivateAttachmentContext.Provider>
  );
};

export const useAttachmentOperations = () => {
  const ctx = useContext(AttachmentContext);
  if (ctx === null) {
    throw new Error(
      "useAttachmentOperations can't be used outside AttachmentProvider",
    );
  }
  return ctx;
};

export const AttachmentTable = <
  ENTITY_TYPE,
  ENTITY extends Record<string, unknown> = Record<string, unknown>,
>({
  initiallyAttachedEntities,
  initiallyAttachedEntitiesStatus,
  initialAttachmentOperations,
  onAttachmentsOperationsChanged,
  entityName,
  searchEntityPlaceholder,
  getNameQuery,
  filteredEntities,
  onEntitySearchChange,
}: AttachmentTableProps<ENTITY_TYPE, ENTITY>) => {
  const privateAttachmentContext = useContext(PrivateAttachmentContext);
  const exposedAttachmentContext = useContext(AttachmentContext);

  if (!privateAttachmentContext || !exposedAttachmentContext) {
    throw new Error('Cannot use AttachmentTable outside AttachmentProvider');
  }

  //Desired attached entities and onAttachmentsOperationsChanged handling
  const convertInitiallyAttachedEntitiesToDesiredAttachedEntities = useCallback(
    (
      initiallyAttachedEntities: AttachableEntity<ENTITY_TYPE, ENTITY>[],
      operations: AttachmentOperation<
        ENTITY_TYPE,
        ENTITY
      >[] = initialAttachmentOperations,
    ) => {
      return initiallyAttachedEntities
        .filter(
          (attachedEntities) =>
            !operations.find((op) => op.entity.id === attachedEntities.id),
        )
        .map((entity) => ({
          ...entity,
          isPending: false,
          action: null,
        }));
    },
    [initialAttachmentOperations],
  );
  const convertInitiallyAttachementOperationsToDesiredAttachedEntities =
    useCallback(
      (
        initialAttachmentOperations: AttachmentOperation<ENTITY_TYPE, ENTITY>[],
      ) => {
        return initialAttachmentOperations
          .filter((op) => op.action !== AttachmentAction.REMOVE)
          .map((op) => ({
            ...op.entity,
            isPending: true,
            action: op.action,
          }));
      },
      [],
    );
  const [{ desiredAttachedEntities, attachmentsOperations }, dispatch] =
    useReducer(
      (
        state: {
          desiredAttachedEntities: AttachableEntityWithPendingStatus<ENTITY_TYPE>[];
          attachmentsOperations: AttachmentOperation<ENTITY_TYPE, ENTITY>[];
        },
        action:
          | {
              action: AttachmentAction.ADD;
              entity: AttachableEntity<ENTITY_TYPE, ENTITY>;
            }
          | {
              action: AttachmentAction.REMOVE;
              entity: AttachableEntity<ENTITY_TYPE, ENTITY>;
            }
          | {
              action: 'RESET_DESIRED_ATTACHED_ENTITIES';
              entities: AttachableEntityWithPendingStatus<ENTITY_TYPE>[];
              operations: AttachmentOperation<ENTITY_TYPE, ENTITY>[];
            },
      ) => {
        switch (action.action) {
          case 'RESET_DESIRED_ATTACHED_ENTITIES':
            return {
              desiredAttachedEntities: action.entities,
              attachmentsOperations: action.operations,
            };
          case AttachmentAction.ADD:
            if (
              !state.desiredAttachedEntities.find(
                (entity) => entity.id === action.entity.id,
              )
            ) {
              const newAttachmentsOperations = [...state.attachmentsOperations];
              const existingOperationIndexOnThisEntity =
                state.attachmentsOperations.findIndex(
                  (operation) => operation.entity.id === action.entity.id,
                );
              //When ADD, we check if it's already exist in operations. If so, we delete the previous operation and not proceed to the ADD.
              if (
                existingOperationIndexOnThisEntity !== -1 &&
                state.attachmentsOperations[existingOperationIndexOnThisEntity]
                  .action === AttachmentAction.REMOVE
              ) {
                newAttachmentsOperations.splice(
                  existingOperationIndexOnThisEntity,
                  1,
                );
                const newState = {
                  ...state,
                  desiredAttachedEntities: [
                    { ...action.entity },
                    ...state.desiredAttachedEntities,
                  ],
                  attachmentsOperations: [...newAttachmentsOperations],
                };
                return newState;
              } else {
                const newState = {
                  ...state,
                  desiredAttachedEntities: [
                    { ...action.entity, isPending: true },
                    ...state.desiredAttachedEntities,
                  ],
                  attachmentsOperations: [...newAttachmentsOperations, action],
                };
                return newState;
              }
            }
            break;
          case AttachmentAction.REMOVE:
            if (
              state.desiredAttachedEntities.find(
                (entity) => entity.id === action.entity.id,
              )
            ) {
              const newDesiredAttachedEntities = [
                ...state.desiredAttachedEntities,
              ];
              newDesiredAttachedEntities.splice(
                state.desiredAttachedEntities.findIndex(
                  (entity) => entity.id === action.entity.id,
                ),
                1,
              );
              const newAttachmentsOperations = [...state.attachmentsOperations];
              const existingOperationIndexOnThisEntity =
                state.attachmentsOperations.findIndex(
                  (operation) => operation.entity.id === action.entity.id,
                );
              if (
                existingOperationIndexOnThisEntity !== -1 &&
                state.attachmentsOperations[existingOperationIndexOnThisEntity]
                  .action === AttachmentAction.ADD
              ) {
                newAttachmentsOperations.splice(
                  existingOperationIndexOnThisEntity,
                  1,
                );
              } else if (
                existingOperationIndexOnThisEntity !== -1 &&
                state.attachmentsOperations[existingOperationIndexOnThisEntity]
                  .action === AttachmentAction.REMOVE
              ) {
                return state;
              } else {
                newAttachmentsOperations.push(action);
              }
              const newState = {
                ...state,
                desiredAttachedEntities: newDesiredAttachedEntities,
                attachmentsOperations: newAttachmentsOperations,
              };
              return newState;
            }
            break;
        }
        return state;
      },
      {
        desiredAttachedEntities: [
          ...convertInitiallyAttachedEntitiesToDesiredAttachedEntities(
            initiallyAttachedEntities,
          ),
          ...convertInitiallyAttachementOperationsToDesiredAttachedEntities(
            initialAttachmentOperations,
          ),
        ],
        attachmentsOperations: initialAttachmentOperations,
      },
    );

  useEffect(() => {
    onAttachmentsOperationsChanged(attachmentsOperations);
  }, [onAttachmentsOperationsChanged, attachmentsOperations]);

  const previousInitiallyAttachedEntitiesStatus = useRef(
    initiallyAttachedEntitiesStatus,
  );
  useMemo(() => {
    if (
      initiallyAttachedEntitiesStatus === 'success' &&
      previousInitiallyAttachedEntitiesStatus.current !==
        initiallyAttachedEntitiesStatus
    ) {
      previousInitiallyAttachedEntitiesStatus.current = 'success';
      dispatch({
        action: 'RESET_DESIRED_ATTACHED_ENTITIES',
        entities: [
          ...convertInitiallyAttachedEntitiesToDesiredAttachedEntities(
            initiallyAttachedEntities,
          ),
          ...convertInitiallyAttachementOperationsToDesiredAttachedEntities(
            initialAttachmentOperations,
          ),
        ],
        operations: initialAttachmentOperations,
      });
    } else {
      previousInitiallyAttachedEntitiesStatus.current =
        initiallyAttachedEntitiesStatus;
    }
  }, [
    initiallyAttachedEntitiesStatus,
    initiallyAttachedEntities,
    initialAttachmentOperations,
    convertInitiallyAttachedEntitiesToDesiredAttachedEntities,
    convertInitiallyAttachementOperationsToDesiredAttachedEntities,
  ]);

  useEffect(() => {
    privateAttachmentContext.setResetAttachementTable(() => {
      return (
        newlyAttachedEntities: AttachableEntity<ENTITY_TYPE, ENTITY>[],
        newAttachmentOperations: AttachmentOperation<ENTITY_TYPE, ENTITY>[],
      ) => {
        dispatch({
          action: 'RESET_DESIRED_ATTACHED_ENTITIES',
          entities: [
            ...convertInitiallyAttachedEntitiesToDesiredAttachedEntities(
              newlyAttachedEntities,
              newAttachmentOperations,
            ),
            ...convertInitiallyAttachementOperationsToDesiredAttachedEntities(
              newAttachmentOperations,
            ),
          ],
          operations: newAttachmentOperations,
        });
      };
    });
  }, [
    convertInitiallyAttachedEntitiesToDesiredAttachedEntities,
    convertInitiallyAttachementOperationsToDesiredAttachedEntities,
    dispatch,
  ]);

  const resetRef = useRef<() => void | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const onSelectedItemChange = useCallback(
    (
      onChangeParams: UseComboboxStateChange<
        AttachableEntity<ENTITY_TYPE, ENTITY>
      >,
    ) => {
      if (onChangeParams.selectedItem) {
        dispatch({
          action: AttachmentAction.ADD,
          entity: onChangeParams.selectedItem,
        });
        if (resetRef.current) resetRef.current();
        if (searchInputRef.current) searchInputRef.current.blur();
      }
    },
    [resetRef],
  );

  const { isOpen, getMenuProps, getInputProps, openMenu, getItemProps, reset } =
    useCombobox({
      items:
        filteredEntities.status === 'success'
          ? filteredEntities.data.entities
          : [],
      onSelectedItemChange,
      onInputValueChange: ({ inputValue }) => {
        onEntitySearchChange(inputValue);
      },
    });

  useMemo(() => {
    //@ts-expect-error assigning to the ref is expected here
    resetRef.current = reset;
  }, [reset]);

  // UI styling states
  const [searchWidth, setSearchWidth] = useState('0px');
  const [searchInputIsFocused, setSearchInputIsFocused] = useState(false);

  return (
    <Table
      columns={[
        {
          Header: 'Name',
          accessor: 'name',
          cellStyle: {
            flex: 1.5,
            marginRight: '1.5rem',
          },
          Cell: ({
            value,
            row: { original: entity },
          }: {
            value: string;
            row: { original: AttachableEntity<ENTITY_TYPE, ENTITY> };
          }) => {
            const { data: asyncName, status } = useQuery({
              ...(getNameQuery
                ? getNameQuery(entity)
                : { queryKey: ['fakeQuery'], queryFn: () => value }),
              enabled: !value,
            });

            if (value) {
              return <ConstrainedText text={value} lineClamp={2} />;
            }
            if (status === 'error') {
              return (
                <>An error occured while loading {entityName.singular} name</>
              );
            }
            if (status === 'loading' || status === 'idle') {
              return <>Loading...</>;
            }
            if (status === 'success') {
              if (!asyncName) {
                return <EmptyCell />;
              }
              return <ConstrainedText text={asyncName} lineClamp={2} />;
            }

            return <EmptyCell />;
          },
        },
        {
          Header: 'Attachment',
          accessor: 'isPending',
          cellStyle: {
            flex: 0.5,
          },
          Cell: ({ value }: { value?: boolean }) => {
            return value ? <>Pending</> : <>Attached</>;
          },
        },
        {
          Header: <Box flex={0.5} />,
          accessor: 'action',
          cellStyle: {
            textAlign: 'right',
            flex: 0.5,
            marginLeft: 'auto',
            marginRight: '0.5rem',
          },
          Cell: ({
            row: { original: entity },
          }: {
            row: { original: AttachableEntity<ENTITY_TYPE> };
          }) => (
            <Button
              size="inline"
              onClick={() => {
                dispatch({
                  action: AttachmentAction.REMOVE,
                  entity: {
                    name: entity.name,
                    id: entity.id,
                    type: entity.type,
                  },
                });
              }}
              icon={<Icon name="Close" />}
              label="Remove"
              variant="danger"
              disabled={!!entity.disableDetach}
            />
          ),
        },
      ]}
      data={desiredAttachedEntities.map((entity) => ({
        ...entity,
        isPending: entity.isPending || false,
        action: null,
      }))}
      defaultSortingKey="name"
    >
      <SearchBoxContainer
        {...{
          ref: (element) => {
            if (element?.firstElementChild) {
              setSearchWidth(
                element.firstElementChild.getBoundingClientRect().width -
                  2 +
                  'px',
              );
            }
          },
        }}
      >
        {filteredEntities.status === 'error' ? (
          <Tooltip
            overlay={
              <>We failed to load the entities, hence search is disabled</>
            }
          >
            <Stack>
              <StyledSearchInput
                autoComplete="off"
                placeholder={searchEntityPlaceholder}
                {...getInputProps({
                  ref: (element) => {
                    if (element) searchInputRef.current = element;
                  },
                })}
                onFocus={() => {
                  openMenu();
                  setSearchInputIsFocused(true);
                }}
                onBlur={() => {
                  setSearchInputIsFocused(false);
                }}
                disabled={filteredEntities.status === 'error'}
              />
              <Loader />
            </Stack>
          </Tooltip>
        ) : (
          <StyledSearchInput
            autoComplete="off"
            placeholder={searchEntityPlaceholder}
            {...getInputProps({
              ref: (element) => {
                if (element) searchInputRef.current = element;
              },
            })}
            onFocus={() => {
              openMenu();
              setSearchInputIsFocused(true);
            }}
            onBlur={() => {
              setSearchInputIsFocused(false);
            }}
            searchInputIsFocused={searchInputIsFocused}
          />
        )}
        <MenuContainer
          {...getMenuProps()}
          width={searchWidth}
          isOpen={isOpen}
          searchInputIsFocused={searchInputIsFocused}
        >
          {isOpen &&
            filteredEntities.status === 'success' &&
            filteredEntities.data?.entities.map((item, index) => (
              <li key={`${item.id}${index}`} {...getItemProps({ item, index })}>
                <Text>{item.name}</Text>
              </li>
            ))}
          {isOpen && filteredEntities.status === 'loading' && (
            <li>
              <Text>Searching...</Text>
            </li>
          )}
          {isOpen && filteredEntities.status === 'error' && (
            <li>
              <Text color="statusCritical">
                An error occured while searching
              </Text>
            </li>
          )}
          {isOpen &&
            filteredEntities.status === 'success' &&
            (filteredEntities.data?.number || 0) >
              filteredEntities.data?.entities.length && (
              <li>
                <Text
                  isGentleEmphazed={true}
                  color="textSecondary"
                  style={{ textAlign: 'right' }}
                >
                  There{' '}
                  {(filteredEntities.data?.number || 0) -
                    filteredEntities.data?.entities.length ===
                  1
                    ? 'is'
                    : 'are'}{' '}
                  {(filteredEntities.data?.number || 0) -
                    filteredEntities.data?.entities.length}{' '}
                  more{' '}
                  {(filteredEntities.data?.number || 0) -
                    filteredEntities.data?.entities.length ===
                  1
                    ? entityName.singular
                    : entityName.plural}{' '}
                  matching your search. Suggestion: try more specific search
                  expression.
                </Text>
              </li>
            )}
          {isOpen &&
            filteredEntities.status === 'success' &&
            filteredEntities.data?.entities.length === 0 && (
              <li>
                <Text isGentleEmphazed={true} color="textSecondary">
                  No {entityName.plural} found matching your search.
                </Text>
              </li>
            )}
        </MenuContainer>
      </SearchBoxContainer>
      <Table.SingleSelectableContent
        rowHeight={rowHeight}
        separationLineVariant="backgroundLevel2"
      >
        {(rows) => (
          <>
            {initiallyAttachedEntitiesStatus === 'idle' ||
            initiallyAttachedEntitiesStatus === 'loading' ? (
              <Wrap style={{ height: `${tableRowHeight[rowHeight]}rem` }}>
                <p></p>
                <Stack>
                  <Loader />
                  <Text>Loading {entityName.plural}...</Text>
                </Stack>
                <p></p>
              </Wrap>
            ) : initiallyAttachedEntitiesStatus === 'error' ? (
              <Stack
                style={{
                  justifyContent: 'center',
                  height: `${tableRowHeight[rowHeight]}rem`,
                }}
              >
                <Icon name="Exclamation-circle" color="statusWarning" />
                <Text color="textSecondary">
                  Failed to load attached {entityName.plural}.
                </Text>
              </Stack>
            ) : (
              desiredAttachedEntities.length === 0 && (
                <CenterredSecondaryText>
                  No {entityName.plural} attached
                </CenterredSecondaryText>
              )
            )}
            {desiredAttachedEntities.length > 0 && rows}
          </>
        )}
      </Table.SingleSelectableContent>
    </Table>
  );
};
