import React from 'react';
import { shallow, mount } from 'enzyme';
import UnauthenticatedRoute from './index';
import { HashRouter as Router } from 'react-router-dom';
import { Login } from '../../index';

function setup(isAuthenticated) {
  const props = {
    session: {
      isAuthenticated
    },
    routes: {},
    component: Login,
    path: '/login'
  };

  return mount(<Router><UnauthenticatedRoute {...props}/></Router>);
}

describe('This unauthenticated route', () => {
  it('should renders without crashing', () => {
    const wrapper = setup(true);
    expect(wrapper.find('UnauthenticatedRoute').exists()).toBe(true);
    expect(wrapper.find('Route').exists()).toBe(true);
  });

  it('should have valid props when session is authenticated', () => {
    const wrapper = setup(true);
    const { session, path, component } = wrapper.find('UnauthenticatedRoute').props();
    const { render } = wrapper.find('Route').props();
    const renderResult = render({ location: '/login' });

    expect(renderResult.props.to.state.from).toBe('/login');
    expect(session.isAuthenticated).toBe(true);
    expect(path).toBe('/login');
  });
});

describe('This unauthenticated route', () => {
  it('should redirects without crashing', () => {
    const wrapper = setup(false);
    expect(wrapper.find('UnauthenticatedRoute').exists()).toBe(true);
    expect(wrapper.find('Route').exists()).toBe(true);
  });

  it('should have valid props when session is not authenticated', () => {
    const wrapper = setup(false);
    const { session, path, component } = wrapper.find('UnauthenticatedRoute').props();
    const { render } = wrapper.find('Route').props();
    const renderResult = render({ location: '/login' });
    expect(renderResult.props.location).toBe('/login');
    expect(session.isAuthenticated).toBe(false);
    expect(path).toBe('/login');
  });
});

describe('The unauthenticated Route', () => {
  it('should have valid snapshot', () => {
    const wrapper = setup(true);
    expect(wrapper).toMatchSnapshot();
  });
});
