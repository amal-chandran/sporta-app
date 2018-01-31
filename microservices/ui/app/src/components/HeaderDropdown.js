import React, { Component } from 'react';
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';
import { NavLink as RsNavLink } from 'react-router-dom';

import avatars from "../img/6.jpg";

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }



  render() {
    const { profile, ...attributes } = this.props;
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <img src={!isEmpty(profile.item) ? profile.item[0].photo : avatars} className="img-avatar" alt="avatar" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
          <DropdownItem><i className="fa fa-user"></i> Notifications</DropdownItem>
          <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
          <DropdownItem>
            <RsNavLink className="nav-link" to={'/public/login'}><i className="fa fa-lock"></i> Logout</RsNavLink>
          </DropdownItem>

        </DropdownMenu>
      </Dropdown>
    );

  }
}
let mapStateToProps = (state) => {
  return {
    profile: state.profile
  };
};
export default connect(mapStateToProps)(HeaderDropdown);
