import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getWrapper } from '../../testUtils';
import { Drawer } from './Drawer.component';

describe('Drawer', () => {
  const { Wrapper } = getWrapper();

  it('should not be visible when closed', () => {
    render(
      <Wrapper>
        <Drawer isOpen={false} close={jest.fn()} title="Test">
          <p>Content</p>
        </Drawer>
      </Wrapper>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should display title and content when open', () => {
    render(
      <Wrapper>
        <Drawer isOpen={true} close={jest.fn()} title="My Drawer">
          <p>Some content</p>
        </Drawer>
      </Wrapper>,
    );
    expect(screen.getByText('My Drawer')).toBeVisible();
    expect(screen.getByText('Some content')).toBeVisible();
  });

  it('should display footer when provided', () => {
    render(
      <Wrapper>
        <Drawer
          isOpen={true}
          close={jest.fn()}
          title="Test"
          footer={<button type="button">Save</button>}
        >
          <p>Content</p>
        </Drawer>
      </Wrapper>,
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeVisible();
  });

  it('should close when clicking the close button', async () => {
    const closeFn = jest.fn();
    render(
      <Wrapper>
        <Drawer isOpen={true} close={closeFn} title="Test">
          <p>Content</p>
        </Drawer>
      </Wrapper>,
    );
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(closeFn).toHaveBeenCalledTimes(1);
  });

  it('should close when pressing Escape', async () => {
    const closeFn = jest.fn();
    render(
      <Wrapper>
        <Drawer isOpen={true} close={closeFn} title="Test">
          <p>Content</p>
        </Drawer>
      </Wrapper>,
    );
    await userEvent.keyboard('{Escape}');
    expect(closeFn).toHaveBeenCalledTimes(1);
  });

  it('should close when clicking outside the drawer', async () => {
    const closeFn = jest.fn();
    render(
      <Wrapper>
        <Drawer isOpen={true} close={closeFn} title="Test" overlay={true}>
          <p>Content</p>
        </Drawer>
      </Wrapper>,
    );
    const dialog = screen.getByRole('dialog');
    const backdrop = dialog.previousElementSibling as HTMLElement;
    await userEvent.click(backdrop);
    expect(closeFn).toHaveBeenCalledTimes(1);
  });

  it('should hide close button when showCloseButton is false', () => {
    render(
      <Wrapper>
        <Drawer
          isOpen={true}
          close={jest.fn()}
          title="Test"
          showCloseButton={false}
        >
          <p>Content</p>
        </Drawer>
      </Wrapper>,
    );
    expect(
      screen.queryByRole('button', { name: /close/i }),
    ).not.toBeInTheDocument();
  });
});

/**
 * Two open drawers share one `z-index`, so their order in `<body>` decides
 * which paints on top — see the matching Modal.stacking tests.
 */
describe('Drawer stacking order', () => {
  const { Wrapper } = getWrapper();

  const bodyIndexOf = (text: string) => {
    const node = screen.getByText(text);
    return Array.from(document.body.children).findIndex((child) =>
      child.contains(node),
    );
  };

  const TwoDrawers = ({ aOpen, bOpen }: { aOpen: boolean; bOpen: boolean }) => (
    <Wrapper>
      <Drawer isOpen={aOpen} close={jest.fn()} title="A">
        <p>first mounted</p>
      </Drawer>
      <Drawer isOpen={bOpen} close={jest.fn()} title="B">
        <p>second mounted</p>
      </Drawer>
    </Wrapper>
  );

  it('claims no place in <body> while closed', () => {
    render(<TwoDrawers aOpen={false} bOpen={false} />);

    expect(document.body.children).toHaveLength(1);
  });

  it('paints an open drawer above one that merely mounted earlier', () => {
    render(<TwoDrawers aOpen={false} bOpen={true} />);

    expect(bodyIndexOf('second mounted')).toBe(document.body.children.length - 1);
  });

  it('orders two open drawers by open order, not mount order', () => {
    const { rerender } = render(<TwoDrawers aOpen={false} bOpen={false} />);

    rerender(<TwoDrawers aOpen={true} bOpen={false} />);
    rerender(<TwoDrawers aOpen={true} bOpen={true} />);

    expect(bodyIndexOf('first mounted')).toBeLessThan(
      bodyIndexOf('second mounted'),
    );
  });
});
