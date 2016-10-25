import './android-chrome-36x36.png';
import './android-chrome-48x48.png';
import './android-chrome-72x72.png';
import './android-chrome-96x96.png';
import './android-chrome-144x144.png';
import './android-chrome-192x192.png';
import './android-chrome-256x256.png';
import './android-chrome-384x384.png';
import './android-chrome-512x512.png';
import './apple-touch-icon-57x57-precomposed.png';
import './apple-touch-icon-57x57.png';
import './apple-touch-icon-60x60-precomposed.png';
import './apple-touch-icon-60x60.png';
import './apple-touch-icon-72x72-precomposed.png';
import './apple-touch-icon-72x72.png';
import './apple-touch-icon-76x76-precomposed.png';
import './apple-touch-icon-76x76.png';
import './apple-touch-icon-114x114-precomposed.png';
import './apple-touch-icon-114x114.png';
import './apple-touch-icon-120x120-precomposed.png';
import './apple-touch-icon-120x120.png';
import './apple-touch-icon-144x144-precomposed.png';
import './apple-touch-icon-144x144.png';
import './apple-touch-icon-152x152-precomposed.png';
import './apple-touch-icon-152x152.png';
import './apple-touch-icon-180x180-precomposed.png';
import './apple-touch-icon-180x180.png';
import './apple-touch-icon-precomposed.png';
import './apple-touch-icon.png';
import './favicon-16x16.png';
import './favicon-32x32.png';
import './favicon-194x194.png';
import './favicon.ico';
import './mstile-70x70.png';
import './mstile-144x144.png';
import './mstile-150x150.png';
import './mstile-310x150.png';
import './mstile-310x310.png';
import './safari-pinned-tab.svg';

const title = 'react-init';
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
 * Middleware factory for IE/Edge `browserconfig.xml`.
 *
 * @param {Object} assets Webpack asset manifest.
 * @return {Function} Express middleware.
 */
export function browserConfig(assets) {
  return (req, res) => {
    const tiles = [];

    for (const [width, height] of msTileSizes) {
      const shape = width === height ? 'square' : 'wide';
      let path = `/mstile-${width}x${height}.png`;
      path = assets.get(path);

      tiles.push(`<${shape}${width}x${height}logo src="${path}" />`);
    }

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
 * @param {Object} assets Webpack asset manifest.
 * @return {Function} Express middleware.
 */
export function manifest(assets) {
  return (req, res) => {
    const icons = [];

    for (const size of chromeIconSizes) {
      const sizes = `${size}x${size}`;
      let src = `/android-chrome-${sizes}.png`;
      src = assets.get(src);

      icons.push({
        src,
        sizes,
        type: 'image/png',
      });
    }

    const manifest = {
      name: title,
      icons,
      start_url: '/',
      background_color: backgroundColor,
      theme_color: themeColor,
      display: 'standalone',
    };

    res.send(manifest);
  };
}

/**
 * Get the HTML for all the favicons.
 * Based on output from realfavicongenerator.net.
 *
 * @param {Object} assets Webpack assets manifest
 * @return {String} HTML
 */
export function getFaviconHtml(assets) {
  const appleIcons = appleIconSizes.map(size =>
    `    <link rel="apple-touch-icon" sizes="${size}x${size}"` +
    ` href="${assets.get(`/apple-touch-icon-${size}x${size}.png`)}">`
  ).join('\n    ');

  return `${appleIcons}
    <link
      rel="icon"
      type="image/png"
      href="${assets.get('/favicon-32x32.png')}"
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href="${assets.get('/favicon-194x194.png')}"
      sizes="194x194"
    />
    <link
      rel="icon"
      type="image/png"
      href="${assets.get('/android-chrome-192x192.png')}"
      sizes="192x192"
    />
    <link
      rel="icon"
      type="image/png"
      href="${assets.get('/favicon-16x16.png')}"
      sizes="16x16"
    />
    <link rel="manifest" href="/manifest.json" />
    <link
      rel="mask-icon"
      href="${assets.get('/safari-pinned-tab.svg')}"
      color="${maskColor}"
    />
    <meta name="apple-mobile-web-app-title" content="${title}" />
    <meta name="application-name" content="${title}" />
    <meta name="msapplication-TileColor" content="${tileColor}" />
    <meta
      name="msapplication-TileImage"
      content="${assets.get('/mstile-144x144.png')}"
    />
    <meta name="theme-color" content="${themeColor}" />`;
}
