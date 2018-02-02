import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RsNavLink } from 'react-router-dom';

import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Badge,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';

import HeaderDropdown from './HeaderDropdown';
import nav from './_nav';
import { store } from "./../helpers/Store";
import { isVerified } from "./../helpers/Underscore";

class Header extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  isExternal = (url) => {
    const link = url ? url.substring(0, 4) : '';
    return link === 'http';
  };

  navLink = (item, key) => {
    const url = item.url ? item.url : '';
    return (
      <NavItem key={key} className="px-3">
        {this.isExternal(url) ?
          <NavLink href={url}>{item.name}</NavLink>
          :
          <RsNavLink className="nav-link" to={url}>{item.name}</RsNavLink>
        }
      </NavItem>
    )
  };

  render() {
    return (
      <header className="app-header-contain">
        <div className="app-header navbar">
          {this.props.private ?
            <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
              <span className="navbar-toggler-icon"></span>
            </NavbarToggler>
            : ""}
          <NavbarBrand></NavbarBrand>
          {/* <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
            <span className="navbar-toggler-icon"></span>
          </NavbarToggler> */}
          {this.props.private && isVerified() ?

            <Nav className="d-md-down-none" navbar>

              {
                nav.items
                  .filter((item) => ((!(item.title || item.divider || item.children)) && (item.main === true)))
                  .map(this.navLink)
              }

              <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                  More
            </DropdownToggle>
                <DropdownMenu>
                  {/* <DropdownItem header>Header</DropdownItem> */}
                  {
                    nav.items
                      .filter((item) => ((!(item.title || item.divider || item.children)) && (!item.main || item.main === false)))
                      .map((item, key) => (
                        <DropdownItem key={key}>{this.navLink(item, key)}</DropdownItem>)
                      )
                  }
                </DropdownMenu>
              </Dropdown>
            </Nav>
            : ""}
          {this.props.private ?
            <Nav className="ml-auto" navbar>
              {/* <NavItem className="d-md-down-none">
                <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
              </NavItem> */}
              {/* <NavItem className="d-md-down-none">
              <NavLink href="#"><i className="icon-list"></i></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
            </NavItem> */}
              <HeaderDropdown />
            </Nav>
            : ""}
          {/* <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler> */}
        </div>
      </header>
    );
  }
}

export default Header;
