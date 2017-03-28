import {
  browserConfig,
  manifest,
  getFaviconHtml,
} from '..';

const assets = {
  get: path => path,
}; // TODO

/**
 * Create a mock response with `set` and `send` properties.
 * @return {Object} Mock response.
 */
function createMockResponse() {
  return {
    set: jest.fn(),
    send: jest.fn(),
  };
}

describe('browserConfig()', () => {
  it('should return valid XML', () => {
    const res = createMockResponse();
    browserConfig(assets)(undefined, res);

    expect(res.set.mock.calls[0]).toEqual([
      'Content-Type',
      'application/xml; charset=utf-8',
    ]);

    const expected = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/mstile-70x70.png" />
      <square150x150logo src="/mstile-150x150.png" />
      <square310x310logo src="/mstile-310x310.png" />
      <wide310x150logo src="/mstile-310x150.png" />
      <TileColor>#2b5797</TileColor>
    </tile>
  </msapplication>
</browserconfig>\n`;
    expect(res.send.mock.calls[0]).toEqual([expected]);
  });
});

describe('manifest()', () => {
  it('should generate valid JSON', () => {
    const res = createMockResponse();
    manifest(assets)(undefined, res);
    const [json] = res.send.mock.calls[0];
    expect(typeof json.background_color).toBe('string');
    expect(typeof json.display).toBe('string');
    expect(typeof json.name).toBe('string');
    expect(typeof json.theme_color).toBe('string');
    expect(typeof json.start_url).toBe('string');
    expect(json.icons[0]).toEqual({
      sizes: '36x36',
      src: '/android-chrome-36x36.png',
      type: 'image/png',
    });

    expect(json.icons).toHaveLength(9);
  });
});

describe('getFaviconHtml()', () => {
  it('should generate valid HTML', () => {
    const html = getFaviconHtml(assets);
    expect(typeof html).toBe('string');
  });
});
