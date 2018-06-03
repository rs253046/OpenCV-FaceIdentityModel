import React from 'react';
import FooterBar from './index';
import { shallow } from 'enzyme';

const setup = () => {
  return shallow(<FooterBar/>);
};

describe('This FooterBar component', () => {
  it('render withour crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('Navbar').exists()).toBe(true);
    expect(wrapper.find('Nav').exists()).toBe(true);
    expect(wrapper.find('NavLink').exists()).toBe(true);
  });

  it('render Navbar with props', () => {
    const wrapper = setup();
    const { color, dark, expand, fixed } = wrapper.find('Navbar').props();
    expect(color).toBe('dark');
    expect(dark).toBe(true);
    expect(expand).toBe('md');
    expect(fixed).toBe('bottom');
  });

  it('render correct list of NavItem', () => {
    const wrapper = setup();
    const navItem = wrapper.find('NavItem').children();
    expect(navItem).toHaveLength(1);
    expect(navItem.children().text()).toBe('Copyrights');
  });
});
