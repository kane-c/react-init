// Workaround for `babel-plugin-istanbul` to instrument every source file for
// coverage of files that are not imported
// https://github.com/karma-runner/karma-coverage/issues/125
const context = require.context('.', true,
  /^\.\/(?:components.+|containers.+|common|reducers)\.jsx?$/);
context.keys().forEach(context);
