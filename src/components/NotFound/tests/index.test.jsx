import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '..';

describe('<NotFound />', () => {
  it('should set the response status to 404', () => {
    const component = shallow(<NotFound />);

    expect(component.find('Status').prop('code')).toBe(404);
  });
});
