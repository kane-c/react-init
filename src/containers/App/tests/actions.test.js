import { action } from 'containers/App/actions';

describe('action()', () => {
  it('should create a simple action', () => {
    const actual = action('TEST_ACTION', { test: true });

    expect(actual).toEqual({
      payload: {
        test: true,
      },
      type: 'TEST_ACTION',
    });
  });
});
