import { ComponentType, useState } from 'react';
import { Column, Table } from '../../components/tablev2/Tablev2.component';
import { Box, Button } from '../../next';
import { useMutation, UseMutationOptions } from 'react-query';
import { AttachmentOperation, AttachmentAction } from './AttachmentTypes';
import { useTheme } from 'styled-components';
import { useHistory } from 'react-router';
import { Icon, LargerText, Modal, SecondaryText, Stack, Wrap } from '../..';

type AttachmentStatus = 'Waiting for confirmation' | 'Error' | 'Success';

//The entity is the "thing" you want to attach to the resource, sorry about the naming :(
function AttachmentConfirmationModal<ENTITY_TYPE, RESOURCE_TYPE>({
  attachmentOperations,
  getAttachmentMutationOptions,
  resourceType,
  resourceName,
  redirectUrl,
  EntityIcon,
}: {
  attachmentOperations: AttachmentOperation<ENTITY_TYPE>[];
  getAttachmentMutationOptions: () => UseMutationOptions<
    unknown,
    unknown,
    {
      action: AttachmentAction;
      type: ENTITY_TYPE;
      entityName: string;
      id: string;
    }
  >;
  resourceName: string;
  resourceType: RESOURCE_TYPE;
  redirectUrl: string;
  EntityIcon: ComponentType<{ type: ENTITY_TYPE | RESOURCE_TYPE }>;
}) {
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const [attachmentOperationsStatuses, setAttachmentOperationsStatuses] =
    useState<Record<string, AttachmentStatus>>({});

  const attachmentMutation = useMutation(getAttachmentMutationOptions());

  const attachmentOperationsFlat: {
    action: AttachmentAction;
    type: ENTITY_TYPE;
    entityName: string;
    id: string;
  }[] = attachmentOperations.map(
    (attachmentOperation: AttachmentOperation<ENTITY_TYPE>) => {
      return {
        action: attachmentOperation.action,
        type: attachmentOperation.entity.type,
        entityName: attachmentOperation.entity.name,
        id: attachmentOperation.entity.id,
      };
    },
  );

  const attach = () => {
    attachmentOperationsFlat.forEach((attachmentOperationFlat) => {
      if (
        attachmentOperationsStatuses[attachmentOperationFlat.id] ===
          'Waiting for confirmation' ||
        attachmentOperationsStatuses[attachmentOperationFlat.id] === 'Error' ||
        !attachmentOperationsStatuses[attachmentOperationFlat.id]
      ) {
        setAttachmentOperationsStatuses((attachmentOperationsStatuses) => {
          return {
            ...attachmentOperationsStatuses,
            [attachmentOperationFlat.id]: 'Waiting for confirmation',
          };
        });
        attachmentMutation.mutate(
          {
            ...attachmentOperationFlat,
          },
          {
            onSettled: (_, error, flatEntity) => {
              setAttachmentOperationsStatuses((statuses) => ({
                ...statuses,
                [flatEntity.id]: error ? 'Error' : 'Success',
              }));
            },
          },
        );
      }
    });
  };
  const isAttachNotDone = attachmentOperationsFlat.find(
    (attachmentOperation) =>
      !attachmentOperationsStatuses[attachmentOperation.id],
  );
  const modalFooter = () => {
    return (
      <Wrap>
        <p></p>
        <>
          {isAttachNotDone ? (
            <Stack>
              <Button variant="outline" onClick={handleClose} label="Cancel" />
              <Button
                icon={<Icon name="Arrow-right" />}
                variant="primary"
                onClick={attach}
                label="Confirm"
                disabled={attachmentMutation.isLoading}
              />
            </Stack>
          ) : (
            <Button
              icon={<Icon name="Arrow-right" />}
              variant="primary"
              onClick={() => history.push(redirectUrl)}
              label="Exit"
            />
          )}
        </>
      </Wrap>
    );
  };

  function AttachmentList() {
    const theme = useTheme();
    const columns: Column<{
      action: AttachmentAction;
      type: ENTITY_TYPE;
      entityName: string;
      id: string;
    }>[] = [
      {
        Header: 'Action',
        accessor: 'action',
        cellStyle: {
          width: '12.5%',
        },
        Cell: ({ value }: { value: AttachmentAction }) => {
          return value === AttachmentAction.ADD ? (
            <span>
              <Icon name="Link" /> Attach
            </span>
          ) : (
            <Box color={theme.statusCritical}>
              <Icon name="Unlink" /> Detach
            </Box>
          );
        },
      },
      {
        Header: 'Type',
        accessor: 'type',
        cellStyle: {
          width: '12.5%',
        },
        Cell: ({ value }: { value: ENTITY_TYPE }) => {
          return <EntityIcon type={value} />;
        },
      },
      {
        Header: 'Entity name',
        accessor: 'entityName',
        cellStyle: {
          width: '42.5%',
        },
      },
      {
        Header: 'Attachment status',
        accessor: 'id',
        cellStyle: {
          width: '32.5%',
        },
        Cell: ({ value: resourceId }: { value: string }) => {
          if (attachmentOperationsStatuses[resourceId] === 'Error') {
            return (
              <Box display="flex" gap={8} alignItems="center">
                <Icon color="statusCritical" name="Times-circle" />
                {attachmentOperationsStatuses[resourceId]}{' '}
                <Button
                  size="inline"
                  onClick={attach}
                  variant="outline"
                  label="Retry"
                />
              </Box>
            );
          }
          if (attachmentOperationsStatuses[resourceId] === 'Success') {
            return (
              <Box display="flex" gap={8} alignItems="center">
                <Icon color="statusHealthy" name="Check-circle" />
                {attachmentOperationsStatuses[resourceId]}
              </Box>
            );
          }
          return (
            <>
              {attachmentOperationsStatuses[resourceId] ||
                'Waiting for confirmation'}
            </>
          );
        },
      },
    ];

    return (
      <div style={{ height: '25rem', width: '50rem' }}>
        <div>The following entities will be attached or detached: </div>
        <Box display="flex" gap={24} alignItems="center">
          <SecondaryText>
            <EntityIcon type={resourceType} />
          </SecondaryText>
          <p>{resourceName}</p>
        </Box>
        <Table
          columns={columns}
          data={attachmentOperationsFlat}
          defaultSortingKey={'entityName'}
        >
          <Table.SingleSelectableContent
            rowHeight="h32"
            separationLineVariant="backgroundLevel3"
            backgroundVariant="backgroundLevel1"
            children={(Rows) => {
              return <>{Rows}</>;
            }}
          ></Table.SingleSelectableContent>
        </Table>
      </div>
    );
  }

  return (
    <>
      <Button
        label="Cancel"
        variant="outline"
        onClick={() => history.push(redirectUrl)}
      />
      <Button
        icon={<Icon name="Save" />}
        label="Save"
        onClick={() => setIsModalOpen(true)}
        variant="primary"
        disabled={attachmentOperations.length === 0}
      />

      <Modal
        close={handleClose}
        footer={modalFooter()}
        isOpen={isModalOpen}
        title={
          <Box display="flex" gap={8}>
            <LargerText>
              <Icon name="Link" />
            </LargerText>
            <LargerText>Attachment</LargerText>
          </Box>
        }
      >
        <AttachmentList />
      </Modal>
    </>
  );
}

export default AttachmentConfirmationModal;
