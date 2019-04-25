import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import "./Navbar.scss"

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="Navbar">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Computer Database</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="link" onClick={this.props.onToggle}>{this.props.pageMode ? "Companies" : "Computers"}</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Welcome, User
                </DropdownToggle>
                <DropdownMenu right>

                  <DropdownItem divider />
                  <DropdownItem onClick={this.props.onLogout}>
                    Logout
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.props.onCreateUser}>
                    Login
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

export default NavBar;
