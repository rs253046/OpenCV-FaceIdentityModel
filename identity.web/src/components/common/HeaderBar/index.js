import React from 'react';
import { APP_ROUTES } from '../../../constants';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
  NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem
} from 'reactstrap';

export default class HeaderBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href={APP_ROUTES.ROOT}>Face Identity</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>Hi, {currentUser && currentUser.username}</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret />
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to={APP_ROUTES.LOGOUT}>
                      Logout
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

HeaderBar.propTypes = {
  currentUser: PropTypes.object
};
