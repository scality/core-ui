import { render, screen } from '@testing-library/react';
import { FormattedDateTime } from './FormattedDateTime';
import userEvent from '@testing-library/user-event';

describe('FormatttedDateTime', () => {
  it('should display the date in the expected format', () => {
    //S
    render(
      <FormattedDateTime
        format="date"
        value={new Date('2022-10-01T00:00:00Z')}
      />,
    );
    //V
    expect(screen.getByText('2022-10-01')).toBeInTheDocument();
  });

  it('should display the date time second in the expected format', () => {
    //S
    render(
      <FormattedDateTime
        format="date-time-second"
        value={new Date('2022-10-01T00:00:00Z')}
      />,
    );
    //V
    expect(screen.getByText('2022-10-01 00:00:00')).toBeInTheDocument();
  });

  it('should display the date time in the expected format', () => {
    //S
    render(
      <FormattedDateTime
        format="date-time"
        value={new Date('2022-10-01T00:00:00Z')}
      />,
    );
    //V
    expect(screen.getByText('2022-10-01 00:00')).toBeInTheDocument();
  });

  it('should display the time second in the expected format', () => {
    //S
    render(
      <FormattedDateTime
        format="time-second"
        value={new Date('2022-10-01T00:00:00Z')}
      />,
    );
    //V
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

  it('should display the time in the expected format', () => {
    //S
    render(
      <FormattedDateTime
        format="time"
        value={new Date('2022-10-01T00:00:00Z')}
      />,
    );
    //V
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('should display a relative date with the right format when the date occured few seconds before', async () => {
    //S
    const today = new Date('2022-10-10T12:00:00Z');
    jest.useFakeTimers('modern');
    jest.setSystemTime(today);
    render(
      <FormattedDateTime
        format="relative"
        value={new Date('2022-10-10T11:59:37Z')}
      />,
    );
    //V
    expect(screen.getByText('few seconds ago')).toBeInTheDocument();
    //E
    await userEvent.hover(screen.getByText('few seconds ago'));
    //V
    expect(screen.getByText('2022-10-10 11:59:37')).toBeInTheDocument();
  });

  it('should display a relative date with the right format when the date occured 1 minute before', async () => {
    //S
    const today = new Date('2022-10-10T12:00:00Z');
    jest.useFakeTimers('modern');
    jest.setSystemTime(today);
    render(
      <FormattedDateTime
        format="relative"
        value={new Date('2022-10-10T11:59:00Z')}
      />,
    );
    //V
    expect(screen.getByText('1 minute ago')).toBeInTheDocument();
    //E
    await userEvent.hover(screen.getByText('1 minute ago'));
    //V
    expect(screen.getByText('2022-10-10 11:59:00')).toBeInTheDocument();
  });

  it('should display a relative date with the right format when the date occured 2 minutes before', async () => {
    //S
    const today = new Date('2022-10-10T12:00:00Z');
    jest.useFakeTimers('modern');
    jest.setSystemTime(today);
    render(
      <FormattedDateTime
        format="relative"
        value={new Date('2022-10-10T11:57:26Z')}
      />,
    );
    //V
    expect(screen.getByText('2 minutes ago')).toBeInTheDocument();
    //E
    await userEvent.hover(screen.getByText('2 minutes ago'));
    //V
    expect(screen.getByText('2022-10-10 11:57:26')).toBeInTheDocument();
  });

  it('should display a relative date with the right format when the date occured 1 day before', async () => {
    //S
    const today = new Date('2022-10-10T12:00:00Z');
    jest.useFakeTimers('modern');
    jest.setSystemTime(today);
    render(
      <FormattedDateTime
        format="relative"
        value={new Date('2022-10-09T11:57:26Z')}
      />,
    );
    //V
    expect(screen.getByText('1 day ago')).toBeInTheDocument();
    //E
    await userEvent.hover(screen.getByText('1 day ago'));
    //V
    expect(screen.getByText('2022-10-09 11:57:26')).toBeInTheDocument();
  });

  it('should display a relative date with the right format when the date occured 2 days before', async () => {
    //S
    const today = new Date('2022-10-10T12:00:00Z');
    jest.useFakeTimers('modern');
    jest.setSystemTime(today);
    render(
      <FormattedDateTime
        format="relative"
        value={new Date('2022-10-08T11:57:26Z')}
      />,
    );
    //V
    expect(screen.getByText('2 days ago')).toBeInTheDocument();
    //E
    await userEvent.hover(screen.getByText('2 days ago'));
    //V
    expect(screen.getByText('2022-10-08 11:57:26')).toBeInTheDocument();
  });

  it('should display a relative date with the right format when the date occured 1 month before', async () => {
    //S
    const today = new Date('2022-10-10T12:00:00Z');
    jest.useFakeTimers('modern');
    jest.setSystemTime(today);
    render(
      <FormattedDateTime
        format="relative"
        value={new Date('2022-09-08T11:57:26Z')}
      />,
    );
    //V
    expect(screen.getByText('32 days ago')).toBeInTheDocument();
    //E
    await userEvent.hover(screen.getByText('32 days ago'));
    //V
    expect(screen.getByText('2022-09-08 11:57:26')).toBeInTheDocument();
  });

  it('should display a relative date with the right format when the date occured 2 months before', async () => {
    //S
    const today = new Date('2022-10-10T12:00:00Z');
    jest.useFakeTimers('modern');
    jest.setSystemTime(today);
    render(
      <FormattedDateTime
        format="relative"
        value={new Date('2022-08-08T11:57:26Z')}
      />,
    );
    //V
    expect(screen.getByText('63 days ago')).toBeInTheDocument();
    //E
    await userEvent.hover(screen.getByText('63 days ago'));
    //V
    expect(screen.getByText('2022-08-08 11:57:26')).toBeInTheDocument();
  });

  it('should display a relative date with the right format when the date occured 2 months after', async () => {
    //S
    const today = new Date('2022-10-10T12:00:00Z');
    jest.useFakeTimers('modern');
    jest.setSystemTime(today);
    render(
      <FormattedDateTime
        format="relative"
        value={new Date('2022-12-12T11:57:26Z')}
      />,
    );
    //V
    expect(screen.getByText('in 63 days')).toBeInTheDocument();
    //E
    await userEvent.hover(screen.getByText('in 63 days'));
    //V
    expect(screen.getByText('2022-12-12 11:57:26')).toBeInTheDocument();
  });
});
