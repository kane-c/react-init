import React from 'react';
import { storiesOf } from '@kadira/storybook';

import About from './About';

/**
 * Shortcut to add a basic story.
 */
function addStory(name, Component, props = {}) {
  storiesOf(name, module)
    .add(name, () => <Component {...props} />);
}

addStory('About', About);
