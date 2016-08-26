import { configure } from '@kadira/storybook';

/* eslint-disable global-require */
configure(() => {
  require('../src/stories');
}, module);
