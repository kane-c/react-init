import React from 'react';
import { storiesOf } from '@kadira/storybook';

import About from 'components/About';

/**
 * Shortcut to add a basic story.
 * @param {string} name Component name
 * @param {Object} Component React component
 * @param {Object} [props] Props to pass to component
 * @return {void}
 */
function addStory(name, Component, props = {}) {
  storiesOf(name, module)
    .add(name, () => <Component {...props} />);
}

addStory('About', About);
