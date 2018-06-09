import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

export default class FooterBar extends React.Component {

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" fixed="bottom">
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>Copyrights</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
