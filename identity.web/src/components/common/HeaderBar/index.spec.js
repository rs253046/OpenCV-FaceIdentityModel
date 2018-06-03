import React from 'react';
import HeaderBar from './index';
import { shallow } from 'enzyme';

const setup = () => {
  return shallow(<HeaderBar/>);
};

describe('This HeaderBar component', () => {
  it('render withour crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('Navbar').exists()).toBe(true);
    expect(wrapper.find('NavbarBrand').exists()).toBe(true);
    expect(wrapper.find('NavbarToggler').exists()).toBe(true);
    expect(wrapper.find('Collapse').exists()).toBe(true);
    expect(wrapper.find('Nav').exists()).toBe(true);
    expect(wrapper.find('NavLink').exists()).toBe(true);
    expect(wrapper.find('UncontrolledDropdown').exists()).toBe(true);
    expect(wrapper.find('DropdownMenu').exists()).toBe(true);
  });

  it('render Navbar with props', () => {
    const wrapper = setup();
    const { color, dark, expand } = wrapper.find('Navbar').props();
    expect(color).toBe('dark');
    expect(dark).toBe(true);
    expect(expand).toBe('md');
  });

  it('render NavbarBrand with props', () => {
    const wrapper = setup();
    const NavbarBrand = wrapper.find('NavbarBrand');
    expect(NavbarBrand.props().href).toBe('/');
    expect(NavbarBrand.children().text()).toBe('Face Identity');
  });

  // it('render correct list of NavItem', () => {
  //   const wrapper = setup();
  //   const navItem = wrapper.find('NavItem').children();
  //   expect(navItem).toHaveLength(1);
  //   expect(navItem.children().text()).toBe('Copyrights');
  // });
});
