import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse } from "reactstrap";

export default class SubNav extends Component {
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
        let { children, Name } = this.props;
        return (
            <Navbar color="faded" light expand="md" className="nav-menu add-bottom-space">
                <NavbarBrand>{Name}</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    {children}
                </Collapse>
            </Navbar>
        );
    }
}