import React from 'react';
import { shallow } from 'enzyme';

import Status from '..';

describe('<Status />', () => {
  const component = shallow(
    <Status code={500}>
      <p>Child here</p>
    </Status>,
  );

  const render = component.find('Route').first().prop('render');

  it('should render its children', () => {
    const child = shallow(render({}));
    expect(child.text()).toBe('Child here');
  });

  it('should set a status code', () => {
    const staticContext = {};
    render({ staticContext });

    expect(staticContext.status).toBe(500);
  });
});
