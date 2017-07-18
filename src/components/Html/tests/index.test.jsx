import Helmet from 'react-helmet';
import React from 'react';
import { shallow } from 'enzyme';

import Html from '..';

describe('<Html />', () => {
  beforeAll(() => {
    Helmet.canUseDOM = false;
  });

  afterAll(() => {
    Helmet.canUseDOM = true;
  });

  it('should render', () => {
    shallow(<Helmet />);

    const head = Helmet.renderStatic();

    const component = shallow(
      <Html
        bodyHtml="<p>Test HTML</p>"
        cssUrl="/main.css"
        head={head}
        jsUrl="/main.js"
        preloadedState={{
          test: 'yes',
          array: [1, 2, 3],
          object: {
            deep: true,
          },
        }}
      />,
    );

    const root = component.find('#root');
    expect(root.html()).toEqual(expect.stringContaining('Test HTML'));
  });
});
