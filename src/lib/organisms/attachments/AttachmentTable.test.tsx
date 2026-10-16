import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getWrapper } from '../../testUtils';
import { AttachmentProvider, AttachmentTable } from './AttachmentTable';
import { AttachmentAction, AttachmentOperation } from './AttachmentTypes';

// This table imports the library's own barrels, which re-export the editor and so
// pull CodeMirror's ESM build into a suite that never renders it.
jest.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('codemirror-json-schema', () => ({ jsonSchema: () => [] }));

const { Wrapper } = getWrapper();

const entities = [
  { name: 'User A', id: 'a', type: 'USER' },
  { name: 'User B', id: 'b', type: 'USER' },
];

const renderAttachmentTable = () => {
  const onAttachmentsOperationsChanged = jest.fn();

  render(
    <AttachmentProvider>
      <AttachmentTable
        entityName={{ singular: 'user', plural: 'users' }}
        filteredEntities={{
          status: 'success',
          data: { number: entities.length, entities },
        }}
        initiallyAttachedEntities={[]}
        initiallyAttachedEntitiesStatus="success"
        initialAttachmentOperations={[]}
        searchEntityPlaceholder="Search user by name"
        onEntitySearchChange={() => {}}
        onAttachmentsOperationsChanged={onAttachmentsOperationsChanged}
      />
    </AttachmentProvider>,
    { wrapper: Wrapper },
  );

  const attachedNames = (): string[] =>
    onAttachmentsOperationsChanged.mock.calls
      .flatMap(([operations]: [AttachmentOperation<string>[]]) => operations)
      .filter((operation) => operation.action === AttachmentAction.ADD)
      .map((operation) => operation.entity.name);

  return { attachedNames };
};

describe('AttachmentTable', () => {
  it('attaches the suggestion the user picks', async () => {
    const { attachedNames } = renderAttachmentTable();

    await userEvent.click(screen.getByRole('searchbox'));
    await userEvent.click(await screen.findByText('User B'));

    await waitFor(() => expect(attachedNames()).toContain('User B'));
  });

  it('attaches nothing when the field loses focus on a highlighted suggestion', async () => {
    const { attachedNames } = renderAttachmentTable();

    await userEvent.click(screen.getByRole('searchbox'));
    await screen.findByText('User B');
    await userEvent.keyboard('{ArrowDown}{ArrowDown}');

    await userEvent.tab();

    expect(attachedNames()).toEqual([]);
  });
});
