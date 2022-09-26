import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Wrapper, Title } from './common';
import { CopyButton } from '../src/lib/next';

export default {
  title: 'Components/v2/Button',
  component: Button,
};

export const Default = ({}) => {
  return (
    <Wrapper className="storybook-button">
      <Title>Button default</Title>
      <Button
        variant="primary"
        label="primary"
        onClick={(e) => {
          e.persist();
          action('Button Click');
        }}
      />
      <Button variant="secondary" label="secondary" />
      <Button variant="danger" label="danger" />
      <Button variant="outline" label="outline" />
      <Title>Button with icon</Title>
      <Button
        variant="primary"
        label="primary"
        icon={<i className="fas fa-arrow-right"></i>}
      />
      <Button
        variant="secondary"
        label="secondary"
        icon={<i className="fas fa-arrow-right"></i>}
      />
      <Button
        variant="danger"
        label="danger"
        icon={<i className="fas fa-arrow-right"></i>}
      />
      <Button
        variant="outline"
        label="outline"
        icon={<i className="fas fa-arrow-right"></i>}
      />
      <Title>Button disabled</Title>
      <Button
        variant="primary"
        disabled
        label="primary"
        icon={<i className="fas fa-arrow-right"></i>}
        tooltip={{
          overlayStyle: {
            width: '80px',
          },
          overlay: 'The button is disabled because of blabla...',
          placement: 'top',
        }}
      />
      <Button
        variant="secondary"
        disabled
        label="secondary"
        icon={<i className="fas fa-arrow-right"></i>}
        tooltip={{
          overlayStyle: {
            width: '80px',
          },
          overlay: 'The button is disabled because of blabla...',
          placement: 'top',
        }}
      />
      <Button
        variant="danger"
        disabled
        label="danger"
        icon={<i className="fas fa-arrow-right"></i>}
        tooltip={{
          overlayStyle: {
            width: '80px',
          },
          overlay: 'The button is disabled because of blabla...',
          placement: 'top',
        }}
      />
      <Button
        variant="outline"
        disabled
        label="outline"
        icon={<i className="fas fa-arrow-right"></i>}
        onClick={action('Button Disabled Click')}
        tooltip={{
          overlayStyle: {
            width: '80px',
          },
          overlay: 'The button is disabled because of blabla...',
          placement: 'top',
        }}
      />
      <Title>Ghost icon </Title>
      <Button
        icon={<i className="fas fa-sync" />}
        tooltip={{
          overlayStyle: {
            width: '80px',
          },
          overlay: 'Refresh the metrics',
          placement: 'top',
        }}
      />
      <Button
        icon={<i className="fas fa-file-export" />}
        tooltip={{
          overlayStyle: {
            width: '120px',
          },
          overlay: 'Export the data in predefined format',
          placement: 'top',
        }}
      />
      <Button
        icon={<i className="fas fa-calendar-week" />}
        tooltip={{
          overlayStyle: {
            width: '120px',
          },
          overlay: 'Metric over a period',
          placement: 'top',
        }}
      />
      <Title>Icon button alway display a tooltip</Title>
      <Button
        variant="primary"
        icon={<i className="fas fa-trash" />}
        tooltip={{
          overlayStyle: {
            width: '80px',
          },
          overlay: 'Entity deletion',
          placement: 'top',
        }}
      />
      <Button
        variant="secondary"
        icon={<i className="fas fa-link" />}
        tooltip={{
          overlayStyle: {
            width: '80px',
          },
          overlay: 'Bound status',
          placement: 'top',
        }}
      />
      <Button
        variant="danger"
        icon={<i className="fas fa-trash" />}
        tooltip={{
          overlayStyle: {
            width: '80px',
          },
          overlay: 'Entity deletion',
          placement: 'top',
        }}
      />
      <Button
        variant="outline"
        icon={<i className="fas fa-trash" />}
        tooltip={{
          overlayStyle: {
            width: '80px',
          },
          overlay: 'Entity deletion',
          placement: 'top',
        }}
      />
    </Wrapper>
  );
};

export const CopyButtonStory = ({}) => {
  return (
    <Wrapper className="storybook-button">
      <Title>Ghost: Without label</Title>
      <CopyButton textToCopy="test" />
      <Title>Ghost: With label</Title>
      <CopyButton label="test" textToCopy="test" />

      <Title>Outline: Without label</Title>
      <CopyButton variant="outline" textToCopy="test" />
      <Title>Outline: With label</Title>
      <CopyButton variant="outline" label="test" textToCopy="test" />
      <Title>Outline: With big label</Title>
      <CopyButton
        variant="outline"
        label="Certificate"
        textToCopy="Certificate"
      />
    </Wrapper>
  );
};
