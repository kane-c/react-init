import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { spy } from 'sinon';

import { Home, mapDispatchToProps } from 'containers/Home';
import { repos } from 'containers/Home/actions';

describe('<Home />', () => {
  it('should show a loading indicator when loading', () => {
    const repos = fromJS(['a']);
    const component = shallow(
      <Home isLoading repos={repos} />,
    );

    expect(component.find('LoadingIndicator')).to.be.present();
  });

  it('should show a list of repos', () => {
    const repos = fromJS(['a', 'b', 'c']);

    const component = shallow(
      <Home repos={repos} />,
    );

    expect(component.find('li')).to.have.lengthOf(3);
  });

  it('should handle form submission', () => {
    const repos = fromJS(['a']);
    const onSubmit = spy();
    const component = shallow(
      <Home onSubmit={onSubmit} repos={repos} />,
    );

    component.find('form').simulate('submit');
    expect(onSubmit.called).to.be.true();
  });

  it('should request repos on mount', () => {
    const repos = fromJS([]);
    const onSubmit = spy();

    shallow(
      <Home onSubmit={onSubmit} repos={repos} />,
    );

    expect(onSubmit.called).to.be.true();
  });
});

describe('mapDispatchToProps()', () => {
  describe('onSubmit', () => {
    it('should dispatch repos.request()', () => {
      const dispatch = spy();
      mapDispatchToProps(dispatch).onSubmit();

      expect(dispatch.calledWith(repos.request())).to.be.true();
    });

    it('should handle events', () => {
      const preventDefault = spy();
      mapDispatchToProps(() => {}).onSubmit({
        preventDefault,
      });

      expect(preventDefault.called).to.be.true();
    });
  });
});
