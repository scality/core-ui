import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { getWrapper } from '../../testUtils';
import { Modal } from './Modal.component';

/**
 * Every open Modal gets the same `z-index`, so paint order is decided by the
 * order of its host node in `<body>`: later sibling paints on top. These tests
 * assert that order, which is the mechanism jsdom can observe — a real browser
 * turns it into "which modal receives the click".
 */
const bodyIndexOf = (text: string) => {
  const node = screen.getByText(text);
  return Array.from(document.body.children).findIndex((child) =>
    child.contains(node),
  );
};

const lastBodyIndex = () => document.body.children.length - 1;

describe('Modal stacking order', () => {
  const { Wrapper } = getWrapper();

  const TwoModals = ({ aOpen, bOpen }: { aOpen: boolean; bOpen: boolean }) => (
    <Wrapper>
      <Modal isOpen={aOpen} title="A" footer={null}>
        first mounted
      </Modal>
      <Modal isOpen={bOpen} title="B" footer={null}>
        second mounted
      </Modal>
    </Wrapper>
  );

  it('claims no place in <body> while closed', () => {
    render(<TwoModals aOpen={false} bOpen={false} />);

    // Testing Library's own render container is the only child left.
    expect(document.body.children).toHaveLength(1);
  });

  it('paints an open modal above one that merely mounted earlier', () => {
    render(<TwoModals aOpen={false} bOpen={true} />);

    expect(bodyIndexOf('second mounted')).toBe(lastBodyIndex());
  });

  it('orders two open modals by open order, not mount order', () => {
    const { rerender } = render(<TwoModals aOpen={false} bOpen={false} />);

    rerender(<TwoModals aOpen={true} bOpen={false} />);
    rerender(<TwoModals aOpen={true} bOpen={true} />);

    expect(bodyIndexOf('first mounted')).toBeLessThan(
      bodyIndexOf('second mounted'),
    );
  });

  it('raises a modal that is closed and opened again', () => {
    const { rerender } = render(<TwoModals aOpen={true} bOpen={true} />);

    rerender(<TwoModals aOpen={false} bOpen={true} />);
    rerender(<TwoModals aOpen={true} bOpen={true} />);

    expect(bodyIndexOf('first mounted')).toBeGreaterThan(
      bodyIndexOf('second mounted'),
    );
  });
});
