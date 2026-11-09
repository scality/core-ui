import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AttachmentProvider, AttachmentTable } from './AttachmentTable';

jest.mock('../../components/tablev2/TableUtils', () => ({
  ...jest.requireActual('../../components/tablev2/TableUtils'),
  convertRemToPixels: () => 12,
}));

jest.mock('codemirror-json-schema', () => ({ jsonSchema: jest.fn() }));

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => {
  return children({
    height: 600,
    width: 600,
  });
});

const renderAttachmentTable = (
  status: 'idle' | 'loading' | 'success' | 'error',
) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
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
      </AttachmentProvider>
    </QueryClientProvider>,
  );

describe('AttachmentTable', () => {
  it('should render exactly one loader when attached entities are loading', () => {
    const { container } = renderAttachmentTable('loading');

    expect(container.querySelectorAll('.sc-loader')).toHaveLength(1);
    expect(screen.getAllByText(/^Loading/)).toHaveLength(1);
  });

  it('should render no loader when attached entities are loaded', () => {
    const { container } = renderAttachmentTable('success');

    expect(container.querySelectorAll('.sc-loader')).toHaveLength(0);
    expect(screen.getByText('First entity')).toBeInTheDocument();
  });
});
