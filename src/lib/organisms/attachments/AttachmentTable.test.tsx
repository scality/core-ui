import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getWrapper } from '../../testUtils';
import { AttachmentProvider, AttachmentTable } from './AttachmentTable';
import { AttachmentAction, AttachmentOperation } from './AttachmentTypes';

jest.mock('../../components/tablev2/TableUtils', () => ({
  ...jest.requireActual('../../components/tablev2/TableUtils'),
  convertRemToPixels: () => 12,
}));

jest.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('codemirror-json-schema', () => ({ jsonSchema: () => [] }));

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => {
  return children({
    height: 600,
    width: 600,
  });
});

// jsdom reports 0 for every offsetWidth/scrollWidth; without this stub `ConstrainedText`
// always takes its fitting branch, never the overflow branch a narrow panel renders.
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value: 10,
  });
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    value: 1000,
  });
});

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

const renderWithAttachedEntitiesStatus = (
  status: 'idle' | 'loading' | 'success' | 'error',
) =>
  render(
    <AttachmentProvider>
      <AttachmentTable
        initiallyAttachedEntities={[
          { id: '1', name: 'First entity', type: 'entity' },
          { id: '2', name: 'Second entity', type: 'entity' },
        ]}
        initiallyAttachedEntitiesStatus={status}
        initialAttachmentOperations={[]}
        entityName={{ plural: 'entities', singular: 'entity' }}
        searchEntityPlaceholder="Search"
        onAttachmentsOperationsChanged={jest.fn()}
        filteredEntities={{ status: 'idle' }}
        onEntitySearchChange={jest.fn()}
      />
    </AttachmentProvider>,
    { wrapper: Wrapper },
  );

describe('AttachmentTable', () => {
  it('should render exactly one loader when attached entities are loading', () => {
    const { container } = renderWithAttachedEntitiesStatus('loading');

    expect(container.querySelectorAll('.sc-loader')).toHaveLength(1);
    expect(screen.getAllByText(/^Loading/)).toHaveLength(1);
  });

  it('should render no loader when attached entities are loaded', () => {
    const { container } = renderWithAttachedEntitiesStatus('success');

    expect(container.querySelectorAll('.sc-loader')).toHaveLength(0);
    expect(screen.getByText('First entity')).toBeInTheDocument();
  });

  it('attaches the suggestion the user picks', async () => {
    const { attachedNames } = renderAttachmentTable();

    await userEvent.click(screen.getByRole('searchbox'));
    await userEvent.click(await screen.findByText('User B'));

    await waitFor(() => expect(attachedNames()).toContain('User B'));
  });

  it('gives a suggestion its full name when the list is too narrow to show it', async () => {
    renderAttachmentTable();

    await userEvent.click(screen.getByRole('searchbox'));
    await userEvent.hover(await screen.findByText('User B'));

    expect(await screen.findByRole('tooltip')).toHaveTextContent('User B');
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
