import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthenticatedRoute from './index';
import { HashRouter as Router } from 'react-router-dom';
import { DashboardMain } from '../../index';

function setup(isAuthenticated) {
  const props = {
    session: { isAuthenticated },
    routes: {},
    component: DashboardMain,
    path: '/dashboard'
  };

  return mount(<Router><AuthenticatedRoute {...props} /></Router>);
}

describe('This authenticated route', () => {
  it('should renders without crashing', () => {
    const wrapper = setup(true);
    expect(wrapper.find('AuthenticatedRoute').exists()).toBe(true);
    expect(wrapper.find('Route').exists()).toBe(true);
  });

  it('should have valid props when session is authenticated', () => {
    const wrapper = setup(true);
    const { session, path, component } = wrapper.find('AuthenticatedRoute').props();
    const { render } = wrapper.find('Route').props();
    const renderResult = render({ location: '/dashboard' });

    expect(renderResult.props.location).toBe('/dashboard');
    expect(session.isAuthenticated).toBe(true);
    expect(path).toBe('/dashboard');
  });
});

describe('This authenticated route', () => {
  it('should redirects without crashing', () => {
    const wrapper = setup(false);
    expect(wrapper.find('AuthenticatedRoute').exists()).toBe(true);
    expect(wrapper.find('Route').exists()).toBe(true);
  });

  it('should have valid props when session is not authenticated', () => {
    const wrapper = setup(false);
    const { session, path, component } = wrapper.find('AuthenticatedRoute').props();
    const { render } = wrapper.find('Route').props();
    const renderResult = render({ location: '/dashboard' });

    expect(renderResult.props.to.state.from).toBe('/dashboard');
    expect(session.isAuthenticated).toBe(false);
    expect(path).toBe('/dashboard');
  });
});

describe('The authenticated Route', () => {
  it('should have valid snapshot', () => {
    const wrapper = setup(true);
    expect(wrapper).toMatchSnapshot();
  });
});
