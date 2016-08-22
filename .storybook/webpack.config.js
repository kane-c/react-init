// Disable Storybook's analytics
const ConfigStore = require('configstore');

const store = new ConfigStore('react-storybook-usage');
store.set('dontTrack', true);
store.set('notifiedDontTrack', true);
store.set('userId', true); // true rather than unique ID

// Allow importing JSX
module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
