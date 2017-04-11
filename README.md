# react-init
Minimal setup for a universal React app.

[![Build status](https://img.shields.io/travis/kane-c/react-init.svg)](https://travis-ci.org/kane-c/react-init)
[![Dependencies](https://img.shields.io/gemnasium/kane-c/react-init.svg)](https://gemnasium.com/github.com/kane-c/react-init)
[![Code coverage](https://img.shields.io/coveralls/kane-c/react-init.svg)](https://coveralls.io/github/kane-c/react-init)

## Setup
```sh
git clone https://github.com/kane-c/react-init.git
cd react-init
npm install
npm start
open http://localhost:8080
```

### Basing a new project off this one
```sh
git clone --depth 1 https://github.com/kane-c/react-init.git your-project-name
cd your-project-name
rm -rf .git
git init
git add -A
git commit -m 'Initial commit'
git remote add boilerplate https://github.com/kane-c/react-init.git
git remote add origin your-git-repo-url
git push -u origin master
```

You can periodically update your project by merging from the `boilerplate` remote.

```sh
git fetch upstream
git merge boilerplate/master
```

### Running tests
```sh
npm test
```

Coverage reports are placed in `coverage`.

### Running in production
```sh
NODE_ENV=production npm start
```

Alternatively, just ensure your app's environment has `NODE_ENV=production` and run `npm start`.

### Other stuff
#### Docker
```sh
docker-compose up
docker-compose run --rm app npm run lint
docker-compose run --rm app npm test
docker-compose run --rm app npm run lint:staged && git commit -n
```

#### Storybook (tracking is disabled)
```sh
npm run storybook
open http://localhost:8081
```

#### Lint the whole project
```sh
npm run lint
```

Use `lint:js`, `lint:css` or `lint:staged` to only lint those files.

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
* `babel-preset-env`: Allow the use of ES2015 and beyond.
* `babel-preset-react`: Allow JSX and Flow.
* `babel-preset-stage-0`: Allow the use of unfinished future ES features.
* `bootstrap`: Baseline design and CSS with some neat JS plugins.
* `compression`: GZip for Express in production.
* `css-loader`: Allow importing CSS files in webpack.
* `express`: Node.js server framework.
* `extract-text-webpack-plugin`: Export webpack's imported CSS into a standalone file.
* `file-loader`: Import static assets in webpack.
* `history`: Required for React Router.
* `font-awesome`: A neat set of icons.
* `immutable`: Used in the Redux store for fast change comparisons.
* `offline-plugin`: Easy offline/service worker support.
* `postcss-cssnext`: Allow the use of some future CSS features; includes automatic prefixes.
* `postcss-flexbugs-fixees`: Fixes for Flexbox bugs, recommended as part of Bootstrap 4.
* `postcss-focus`: Enhancement for CSS `:focus`
* `postcss-loader`: Use PostCSS when CSS files are imported.
* `postcss-reporter`: Output PostCSS data during webpack build.
* `prop-types`: React prop type validation.
* `react`: No explanation needed.
* `react-bootstrap`: Nice React interface to Bootstrap.
* `react-dom`: Use React in a browser.
* `react-fontawesome`: Nice React interface to Font Awesome icons.
* `react-helmet`: Manage `<head>` tags via React, such as `<title>`.
* `react-hot-loader`: Hot Module Reloading for React.
* `react-redux`: Allow Redux and React to play nicely.
* `react-router`: Handle URLs and routing in React.
* `react-router-dom`: As above.
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
* `babel-jest`: Support Babel transpiling for Jest.
* `babel-plugin-react-transform`: Enable React transformations; required for Hot Module Reloading.
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
* `identity-obj-proxy`: Used for mocking CSS imports in Jest.
* `lint-staged`: Automatically lint files staged for commit. Used in conjunction with `pre-commit` to enforce lint rules.
* `npm-check-updates`: Useful utility for updating all dependencies.
* `pre-commit`: Execute hooks before a git commit; used in conjunction with `lint-staged`.
* `plop`: Allows for generators to quickly create new components: `npm run generate`.
* `react-addons-test-utils`: Peer dependency for Enzyme.
* `stylelint`: Linter for CSS files.
* `stylelint-config-standard`: A good preset for CSS lint rules.
* `stylelint-order`: CSS property order lint rules.
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
