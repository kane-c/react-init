import 'babel-polyfill'; // required for `redux-saga`
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

// Bundle all the JS tests together via Webpack for Karma
const context = require.context('./src', true, /.test\.jsx?$/);
context.keys().forEach(context);
