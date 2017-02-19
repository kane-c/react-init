import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { Home, mapDispatchToProps } from 'containers/Home';
import { repos } from 'containers/Home/actions';

const noOp = () => {};

describe('<Home />', () => {
  it('should show a loading indicator when loading', () => {
    const repos = fromJS(['a']);
    const component = shallow(
      <Home isLoading onSubmit={noOp} repos={repos} />,
    );

    expect(component.find('LoadingIndicator')).toBeDefined();
  });

  it('should show a list of repos', () => {
    const repos = fromJS(['a', 'b', 'c']);

    const component = shallow(
      <Home onSubmit={noOp} repos={repos} />,
    );

    expect(component.find('li')).toHaveLength(3);
  });

  it('should handle form submission', () => {
    const repos = fromJS(['a']);
    const onSubmit = jest.fn();
    const component = shallow(
      <Home onSubmit={onSubmit} repos={repos} />,
    );

    component.find('form').simulate('submit');
    expect(onSubmit.mock.calls).toHaveLength(1);
  });

  it('should request repos on mount', () => {
    const repos = fromJS([]);
    const onSubmit = jest.fn();

    shallow(
      <Home onSubmit={onSubmit} repos={repos} />,
    );

    expect(onSubmit.mock.calls).toHaveLength(1);
  });
});

describe('mapDispatchToProps()', () => {
  describe('onSubmit', () => {
    it('should dispatch repos.request()', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onSubmit();

      expect(dispatch).toBeCalledWith(repos.request());
    });

    it('should handle events', () => {
      const preventDefault = jest.fn();
      mapDispatchToProps(() => {}).onSubmit({
        preventDefault,
      });

      expect(preventDefault.mock.calls).toHaveLength(1);
    });
  });
});
