const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../../src');
const pageComponents = fs.readdirSync(path.join(srcPath, 'components'));
const pageContainers = fs.readdirSync(path.join(srcPath, 'containers'));
const components = pageComponents.concat(pageContainers);

/**
 * Check whether the given component exist in either the components or
 * containers directory.
 * @param {String} comp Component name
 * @return {bool} Whether the component already exists.
 */
function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
