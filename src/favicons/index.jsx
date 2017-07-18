import React from 'react';
// Import all the favicons and related files and build a map of names to cache
// busted names
const assets = {};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  const faviconsContext = require.context(
    '.', false, /\.(?:ico|json|png|svg|xml)$/,
  );
  faviconsContext.keys().forEach((path) => {
    assets[path] = faviconsContext(path);
  });
}

const title = 'react-init';
const locale = 'en_AU';
const facebookAppId = '';
const facebookAdminId = '';
const twitterUsername = ''; // Exclude @
const tileColor = '#2b5797';
const backgroundColor = '#ffffff';
const themeColor = '#ffffff';
const maskColor = '#5bbad5';

const appleIconSizes = [57, 60, 72, 76, 114, 120, 144, 152, 180];
const chromeIconSizes = [36, 48, 72, 96, 144, 192, 256, 384, 512];
const msTileSizes = [
  [70, 70],
  [150, 150],
  [310, 310],
  [310, 150],
];

/**
 * Get an asset's cache busted name if available.
 *
 * @param {String} name Asset name.
 * @return {String} Cache busted asset name.
 */
function getAsset(name) {
  return assets[name] || name;
}

/**
 * Middleware factory for IE/Edge `browserconfig.xml`.
 *
 * @return {Function} Express middleware.
 */
export function browserConfig() {
  return (req, res) => {
    const tiles = msTileSizes.map(([width, height]) => {
      const shape = width === height ? 'square' : 'wide';
      let path = `/mstile-${width}x${height}.png`;
      path = getAsset(path);

      return `<${shape}${width}x${height}logo src="${path}" />`;
    });

    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.send(`<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      ${tiles.join('\n      ')}
      <TileColor>${tileColor}</TileColor>
    </tile>
  </msapplication>
</browserconfig>
`);
  };
}

/**
 * Middleware factory for Android/Chrome `manifest.json`.
 *
 * @return {Function} Express middleware.
 */
export function manifest() {
  return (req, res) => {
    const icons = chromeIconSizes.map((size) => {
      const sizes = `${size}x${size}`;
      const src = getAsset(`/android-chrome-${sizes}.png`);

      return {
        src,
        sizes,
        type: 'image/png',
      };
    });

    const manifestJson = {
      name: title,
      short_name: title,
      icons,
      start_url: '/',
      background_color: backgroundColor,
      theme_color: themeColor,
      display: 'standalone',
    };

    res.send(manifestJson);
  };
}

/**
 * Get an array of React nodes for all the favicons and meta tags.
 *
 * Based on output from realfavicongenerator.net.
 * See also: https://megatags.co
 *
 * @return {Object[]} Array of React elements.
 */
export function getMetaTags() {
  const tags = [];
  tags.push(...appleIconSizes.map(size => (
    <link
      key={`apple-${size}`}
      href={getAsset(`/apple-touch-icon-${size}x${size}.png`)}
      rel="apple-touch-icon"
      sizes={`${size}x${size}`}
    />
  )));

  tags.push(
    <link
      key="32"
      href={getAsset('/favicon-32x32.png')}
      rel="icon"
      sizes="32x32"
      type="image/png"
    />,
    <link
      key="192"
      href={getAsset('/android-chrome-192x192.png')}
      rel="icon"
      sizes="192x192"
      type="image/png"
    />,
    <link
      key="16"
      href={getAsset('/favicon-16x16.png')}
      rel="icon"
      sizes="16x16"
      type="image/png"
    />,
    <link key="manifest" rel="manifest" href="/manifest.json" />,
    <link
      key="safari"
      rel="mask-icon"
      href={getAsset('/safari-pinned-tab.svg')}
      color={maskColor}
    />,
    <meta
      key="apple-title"
      content={title}
      name="apple-mobile-web-app-title"
    />,
    <meta key="chrome-title" name="application-name" content={title} />,
    <meta
      key="tile-color"
      content={tileColor}
      name="msapplication-TileColor"
    />,
    <meta
      key="tile-image"
      name="msapplication-TileImage"
      content={getAsset('/mstile-144x144.png')}
    />,
    <meta key="theme-color" name="theme-color" content={themeColor} />,
    <meta key="og:site_name" name="og:site_name" content={title} />,
    <meta key="og:locale" name="og:locale" content={locale} />,
  );

  if (twitterUsername) {
    tags.push(
      <meta
        key="twitter:site"
        content={`@${twitterUsername}`}
        name="twitter:site"
      />);
  }

  if (facebookAdminId) {
    tags.push(
      <meta
        key="fb:admins"
        content={facebookAdminId}
        name="fb:admins"
      />);
  }

  if (facebookAppId) {
    tags.push(
      <meta
        key="fb:app_id"
        content={facebookAppId}
        name="fb:app_id"
      />);
  }

  return tags;
}
