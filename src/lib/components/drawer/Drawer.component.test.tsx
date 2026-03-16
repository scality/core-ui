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
