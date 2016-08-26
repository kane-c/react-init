import 'babel-polyfill'; // required for `redux-saga`
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiImmutable from 'chai-immutable';
import dirtyChai from 'dirty-chai';

// Always show a full diff on failures
chai.config.truncateThreshold = 0;

chai.use(chaiImmutable); // Must be before Dirty Chai
chai.use(dirtyChai);
chai.use(chaiEnzyme());

// Bundle all the JS tests together via Webpack for Karma
const context = require.context('./src', true, /.test\.jsx?$/);
context.keys().forEach(context);
