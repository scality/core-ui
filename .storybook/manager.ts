import { addons } from '@storybook/manager-api';
import Theme from './theme.storybook';

addons.setConfig({
  theme: Theme,
});

// Add favicon
const link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', '/favicon.ico');
document.head.appendChild(link);
