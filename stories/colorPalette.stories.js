import React from 'react';
import { defaultTheme } from '../src/lib/style/theme';

export default {
  title: 'Style/Color/ColorPalette',
};

const comments = {
  backgroundBluer: 'The interactive color for navbar and sidebar',
  secondary: 'The main interactive color',
  border: 'The border for the input',
  borderLight: 'The rowline for the table',
  info: 'Grey-medium (Pill, button anddropdown)',
  base: 'primary button',
  healthy: 'Green-light healthy element',
  healthySecondary: 'Green healthy text',
  success: 'Deprecated color',
  warning: 'Yellow warning element (button)',
  alert: 'Yellow warning text',
  danger: 'Red critical text',
  critical: 'Red critical element (button)',
};

export const Default = () => {
  return (
    <div>
      <h3> Color Palette - Light Mode</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.entries(defaultTheme.light).map(([name, color]) => (
          <div className="card-color-palette">
            <div className="color" style={{ backgroundColor: color }} />
            <div className="text">{name}</div>
            <div className="text">{color}</div>
            {comments[name] && (
              <div className="text">
                {comments[name]['light'] || comments[name]}
              </div>
            )}
          </div>
        ))}
      </div>
      <h3> Color Palette - Dark Mode</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.entries(defaultTheme.dark).map(([name, color]) => (
          <div className="card-color-palette">
            <div className="color" style={{ backgroundColor: color }} />
            <div className="text">{name}</div>
            <div className="text">{color}</div>
            {comments[name] && (
              <div className="text">
                {comments[name]['dark'] || comments[name]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
