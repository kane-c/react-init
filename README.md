# react-init
Minimal setup for a universal React app.

## Dependencies
This is a list of dependencies and what they do, or why they are included.
It's useful to have these later in a project to be able to know whether dependencies can be safely removed, or just know why they were included in the first place.

* `assets-webpack-plugin`: Allow passing hashed static asset names to the server so they can be referenced in the HTML.
* `axios`: Universal HTTP fetching/Ajax.
* `babel-loader`: Allow the use of Babel in webpack.
* `babel-plugin-transform-react-constant-elements`: React performance improvement. Only used in production.
* `babel-plugin-transform-react-inline-elements`: As above.
* `babel-plugin-transform-react-remove-prop-types`: As above.
* `babel-polyfill`: Browser compatibility for ES2015+ stuff.
* `babel-preset-latest`: Allow the use of ES2015 and beyond.
* `babel-preset-react`: Allow JSX and Flow.
* `babel-preset-stage-0`: Allow the use of unfinished future ES features.
* `bootstrap`: Baseline design and CSS with some neat JS plugins.
* `compression`: GZip for Express in production.
* `css-loader`: Allow importing CSS files in webpack.
* `express`: Node.js server framework.
* `extract-text-webpack-plugin`: Export webpack's imported CSS into a standalone file.
* `file-loader`: Import static assets in webpack.
* `font-awesome`: A neat set of icons.
* `immutable`: Used in the Redux store for fast change comparisons.
* `json-loader`: Import JSON files in webpack. Required for some dependencies.
* `postcss-cssnext`: Allow the use of some future CSS features; includes automatic prefixes.
* `postcss-focus`: Enhancement for CSS `:focus`
* `postcss-loader`: Use PostCSS when CSS files are imported.
* `postcss-reporter`: Output PostCSS data during webpack build.
* `react`: No explanation needed.
* `react-bootstrap`: Nice React interface to Bootstrap.
* `react-dom`: Use React in a browser.
* `react-fontawesome`: Nice React interface to Font Awesome icons.
* `react-helmet`: Manage `<head>` tags via React, such as `<title>`.
* `react-redux`: Allow Redux and React to play nicely.
* `react-router`: Handle URLs and routing in React.
* `react-router-redux`: Allow Redux and React Router to play nicely.
* `redux`: Functional data storage library.
* `redux-immutable`: Allow Redux and Immutable to play nicely.
* `redux-saga`: Handle async actions with Redux in a cool JS generator style.
* `reselect`: Cache for selectors.
* `style-loader`: Another part of importing CSS in webpack.
* `webpack`: Generate JS bundles.

### Development dependencies
* `@kadira/storybook`: Shows React components individually; great for testing or getting ones head around a project's components.
* `babel-eslint`: Allow linting ES2015+ files.
* `babel-plugin-istanbul`: Show code coverage of pre-transpiled files.
* `babel-plugin-react-transform`: Enable React transformations; required for Hot Module Reloading.
* `babel-preset-react-hmre`: Hot Module Reloading for React.
* `chai`: Assertions for unit tests.
* `chai-enzyme`: Allow Enzyme to play nice with Chai.
* `chai-immutable`: Allow Immutable to play nice with Chai.
* `dirty-chai`: Change Chai's syntax to be more lint friendly.
* `enzyme`: Test helper to render React components without a browser.
* `eslint`: JavaScript linter.
* `eslint-config-airbnb`: A good preset for JavaScript lint rules.
* `eslint-import-resolver-webpack`: Make ESLint import like webpack to allow importing `components/foo` to resolve properly.
* `eslint-plugin-flowtype`: Lint rules for Flow.
* `eslint-plugin-import`: Required for Airbnb's rules.
* `eslint-plugin-jsx-a11y`: As above.
* `eslint-plugin-react`: As above.
* `eventsource-polyfill`: Polyfill for old browsers to support hot reloading.
* `flow-bin`: Type checking for scalable JavaScript.
* `jsdom`: Fake browser for unit tests.
* `karma`: Test runner; using this rather than Jest or Ava because it integrates with JetBrains IDEs.
* `karma-coverage`: Coverage support for Karma.
* `karma-jsdom-launcher`: JSDom support for Karma.
* `karma-mocha`: Mocha support for Karma.
* `karma-mocha-reporter`: Nice output of Mocha messages for Karma.
* `karma-webpack`: Webpack support for Karma.
* `lint-staged`: Automatically lint files staged for commit. Used in conjunction with `pre-commit` to enforce lint rules.
* `minimist`: Interpret command line arguments for Karma.
* `mocha`: Unit test framework.
* `npm-check-updates`: Useful utility for updating all dependencies.
* `null-loader`: Ignore loading CSS files during tests.
* `pre-commit`: Execute hooks before a git commit; used in conjunction with `lint-staged`.
* `react-transform-hmr`: Hot module reloading for React.
* `stylelint`: Linter for CSS files.
* `stylelint-config-standard`: A good preset for CSS lint rules.
* `webpack-dashboard`: Neat interface to webpack during development.
* `webpack-dev-middleware`: Serve webpack bundles from memory during development.
* `webpack-hot-middleware`: Allow hot module reloading.
* `webpack-node-externals`: Allows a lean server bundle during development.

### Updating dependencies
Update the `FROM` line in `Dockerfile` to the latest version of Node.

Then update npm dependencies:

```sh
npm outdated # Optional - see what's outdated. Check for major version bumps (or minor bumps for pre 1.0.0 packages) and see changelogs for breaking changes)
ncu -u # Ensure code is committed, as this will edit `package.json`
npm install
npm test
```
