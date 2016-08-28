import React from 'react';
import { storiesOf } from '@kadira/storybook';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import About from './components/About';
import LoadingIndicator from './components/LoadingIndicator';

/**
 * Shortcut to add a basic story.
 * @param {string} name Component name
 * @param {Object} Component React component
 * @param {Object} [props] Props to pass to component
 * @return {void}
 */
function addStory(name, Component, props = {}) {
  return storiesOf(name, module)
    .add('Default appearance', () => <Component {...props} />);
}

addStory('About', About);
addStory('LoadingIndicator', LoadingIndicator);
