import { configure } from '@storybook/react';

function loadStories() {
  require('../../../../../stories/healthselector');
}

configure(loadStories, module);
