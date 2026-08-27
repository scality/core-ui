import React from 'react';
import { Box } from '../../src/lib/components/box/Box';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import { Icon } from '../../src/lib/components/icon/Icon.component';

export default {
  title: 'Guidelines/ResponsiveOverview',
  tags: ['!dev', '!autodocs'],
};

const frameStyle: React.CSSProperties = {
  resize: 'horizontal',
  overflow: 'auto',
  width: '30rem',
  minWidth: '12rem',
  maxWidth: '100%',
  border: '1px dashed #666',
  padding: '1rem',
};

const captionStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  opacity: 0.5,
  marginBottom: '0.5rem',
};

const Actions = () => (
  <div style={{ display: 'flex', gap: '0.5rem' }}>
    <Button
      variant="secondary"
      icon={<Icon name="Save" />}
      label="Save"
      iconOnly={360}
    />
    <Button
      variant="outline"
      icon={<Icon name="Delete" />}
      label="Delete"
      iconOnly={360}
    />
  </div>
);

/**
 * Both frames hold the same two `iconOnly={360}` buttons. Drag each right edge
 * below 360px: only the framed content that declares the container collapses.
 */
export const WithAndWithoutContainer = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={captionStyle}>Box container — collapses below 360px</div>
        <div style={frameStyle}>
          <Box container>
            <Actions />
          </Box>
        </div>
      </div>
      <div>
        <div style={captionStyle}>
          No container ancestor — never collapses, at any width
        </div>
        <div style={frameStyle}>
          <Box>
            <Actions />
          </Box>
        </div>
      </div>
    </div>
  ),
};

export const AlwaysCollapsed = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button
        variant="secondary"
        icon={<Icon name="Save" />}
        label="Save"
        iconOnly
      />
      <Button
        variant="outline"
        icon={<Icon name="Delete" />}
        label="Delete"
        iconOnly
      />
    </div>
  ),
};
