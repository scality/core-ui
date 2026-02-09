import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Banner } from './Banner.component';
import { Icon } from '../icon/Icon.component';
import { getWrapper } from '../../testUtils';

describe('Banner', () => {
  const { Wrapper } = getWrapper();

  it('should render with text content', () => {
    render(
      <Banner variant="base">Some text content</Banner>,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Some text content')).toBeInTheDocument();
  });

  it('should render with title', () => {
    render(
      <Banner variant="base" title="My Title">
        Body text
      </Banner>,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('should render with default icon when withDefaultIcon is true', async () => {
    render(
      <Banner variant="base" withDefaultIcon>
        Message with default icon
      </Banner>,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Message with default icon')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText('Info-circle')).toBeInTheDocument();
    });
  });

  it('should render with custom icon when icon prop is provided', async () => {
    render(
      <Banner variant="danger" icon={<Icon name="Check-circle" />}>
        Message with custom icon
      </Banner>,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Message with custom icon')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText('Check-circle')).toBeInTheDocument();
    });

  });
});
