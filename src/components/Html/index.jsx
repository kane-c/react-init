/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import React from 'react';

import { getMetaTags } from 'favicons';

/**
 * Root HTML element including `head` and `body`.
 *
 * @param {Object} props React props.
 * @return {Object} React node.
 */
export default function Html(props) {
  const { head } = props;

  const cssProps = {};

  // Add an ID attribute in development mode so it can be deleted on page load.
  // This ensures CSS is present on the page for users without JS, but allows
  // hot reloading and dynamic styles for those with JS enabled
  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
    cssProps.id = 'main-css';
  }

  const state = JSON.stringify(props.preloadedState);

  /* istanbul ignore next */
  const dll = process.env.NODE_ENV === 'development' ?
    <script src="/dll.js" /> : null;

  const htmlAttrs = head.htmlAttributes.toComponent();
  const bodyAttrs = head.bodyAttributes.toComponent();

  if (!htmlAttrs.lang) {
    htmlAttrs.lang = 'en';
  }

  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html {...htmlAttrs}>
      <head>
        <meta charSet="utf-8" />
        <meta content="ie=edge" httpEquiv="x-ua-compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.base.toComponent()}
        <link rel="stylesheet" href={props.cssUrl} {...cssProps} />
        {head.link.toComponent()}
        {head.style.toComponent()}
        {getMetaTags()}
        {head.script.toComponent()}
        {head.noscript.toComponent()}
      </head>
      <body {...bodyAttrs}>
        <div
          dangerouslySetInnerHTML={{
            __html: props.bodyHtml,
          }}
          id="root"
        />
        <script dangerouslySetInnerHTML={{
          __html: `window.PRELOADED_STATE=${state}`,
        }}
        />
        {dll}
        <script src={props.jsUrl} />
      </body>
    </html>
  );
}

Html.propTypes = {
  bodyHtml: PropTypes.string.isRequired,
  cssUrl: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  head: PropTypes.object.isRequired,
  jsUrl: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  preloadedState: PropTypes.object.isRequired,
};
