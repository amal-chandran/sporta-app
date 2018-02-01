import React, { Component } from "react";
import {
    Col, Row, Card, CardBody, CardHeader, CardTitle,
    CardLink, CardSubtitle, CardText, Form, FormGroup,
    Input, Label, FormText, Button, CardImg, Table
} from "reactstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { appusers, profile } from "./../resources";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";
import { popupToggleActions } from "./../actions";
import { events } from "./../resources";
import { getUserID } from "./../services";


class EventParticipents extends React.Component {
    componentWillMount() {
        this.props.actions.fetchEvents();
    }
    render() {
        let UID = getUserID();

        return (
            <Row>
                <Col xs="12" lg="6">
                    <Card>
                        <CardHeader>
                            Participated Events
                            </CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Event Name</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.events
                                            .filter((data) => (data.uid === UID))
                                            // .filter((data2) => (data2.uid === UID))
                                            .map((cardData, key) => {
                                                console.log(this.props.events);
                                                return (<tr key={key}>
                                                    <td>{cardData.name}</td>
                                                    <td>
                                                        <Button onClick={() => {
                                                            this.props.actions.undoparticipateEvents(cardData.eid)
                                                        }} color="danger" className="float-right">Remove Me</Button>
                                                    </td>
                                                </tr>)
                                            })}
                                </tbody>
                            </Table>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}


let EventParticipentsComp = connect((state) => {
    let { isParticipating, isFetching, items } = state.events;
    return {
        isParticipating,
        isFetching,
        events: items
    }
},
    (dispatch) => {
        return {
            actions: bindActionCreators({
                fetchEvents: events.fetchEvents,
                deleteEvent: events.deleteEvent,
                participateEvents: events.participateEvents,
                undoparticipateEvents: events.undoparticipateEvents,
                eventFormToggle: popupToggleActions.eventFormToggle
            }, dispatch)
        }
    })(EventParticipents);

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
let EventUserData = connect(mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators({
                fetchAppusers: appusers.fetchAppusers,
                getProfile: profile.getProfile,
                updateProfile: profile.updateProfile,
            }, dispatch)
        }
    })(EventList);

export default () => (
    <div className="animated fadeIn">
        <EventUserData />
        <EventParticipentsComp />
    </div>
)