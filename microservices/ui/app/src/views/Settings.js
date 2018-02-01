import React, { Component } from "react";
import {
    Col, Row, Card, CardBody, CardHeader, CardTitle,
    CardLink, CardSubtitle, CardText, Form, FormGroup,
    Input, Label, FormText, Button, CardImg
} from "reactstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { appusers, profile } from "./../resources";
import isEmpty from "lodash/isEmpty";

class EventList extends Component {
    constructor(props) {
        super(props);

        if (!isEmpty(props.user)) {
            this.state = props.user[0];
        } else {
            this.state = {
                "name": "",
                "collegeid": "",
                "email": "",
                "phone": ""
            };
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    componentWillMount() {
        this.props.actions.getProfile();
    }
    com
    componentWillReceiveProps(nextProps) {
        if (!isEmpty(this.props.user))
            this.setState(nextProps.user[0]);
    }
    render() {
        let { state, props } = this;
        let { user } = props;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardImg top width="100%" src={!isEmpty(user) ? user[0].photo : ""} alt="Card image cap" />
                        </Card>
                    </Col>
                    <Col>
                        <Form>
                            <FormGroup>
                                <Label for="exampleCollegeID">College ID</Label>
                                <Input type="CollegeID" name="collegeid" value={state.collegeid} onChange={this.handleChange} id="exampleCollegeID" placeholder="College ID" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleName">Name</Label>
                                <Input type="text" name="name" value={state.name} onChange={this.handleChange} id="exampleName" placeholder="Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" value={state.email} onChange={this.handleChange} id="exampleEmail" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePhone">Phone</Label>
                                <Input type="text" name="phone" value={state.phone} onChange={this.handleChange} id="examplePhone" placeholder="Phone" />
                            </FormGroup>
                            <Button onClick={() => { props.actions.updateProfile(this.state) }}>Save</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    let { isFetching, items } = state.appusers;
    let { item } = state.profile;
    return {
        isFetching,
        appusers: items,
        user: item
    }
};
export default connect(mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators({
                fetchAppusers: appusers.fetchAppusers,
                getProfile: profile.getProfile,
                updateProfile: profile.updateProfile,
            }, dispatch)
        }
    })(EventList);