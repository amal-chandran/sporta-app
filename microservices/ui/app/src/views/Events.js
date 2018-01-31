import React, { Component } from "react";
import {
    Col, Row, Card, CardBody, CardImg,
    CardTitle, CardText, Button, CardSubtitle,
    Nav, NavLink, NavItem, Form, FormGroup, Input, Label
} from "reactstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { history } from './../helpers';
import { events } from "./../resources";
import SubNav from "../components/SubNav";
import ResponsiveMenuDialog from "../components/ResponsiveMenuDialog";
import Loadable from "react-loading-overlay";
import { isAuthentic } from "./../helpers/Underscore";

let NavControll = () => {
    return (
        <SubNav Name="Event">
            <Nav className="ml-auto" navbar>
                <NavItem>
                    {isAuthentic(['admin']) ? <CreateEvent /> : ""}
                </NavItem>
            </Nav>
        </SubNav>
    );
}

let CreateEvent = () => (
    <ResponsiveMenuDialog Name="Create Event" Title="Create Event">
        <CreateEventForm />
    </ResponsiveMenuDialog>
);

let CreateEventForm = () => (
    <div>
        <Form >
            <FormGroup>
                <Label for="EventName">Name</Label>
                <Input type="email" name="EventName" id="EventName" placeholder="Event Name" />
            </FormGroup>
            <FormGroup>
                <Label for="EventDiscription">Discription</Label>
                <Input type="textarea" name="EventDiscription" id="EventDiscription" placeholder="Event Discription" />
            </FormGroup>
            <FormGroup>
                <Label for="EventPhoto">Photo</Label>
                <Input type="email" name="EventPhoto" id="EventPhoto" placeholder="Event Photo" />
            </FormGroup>
            <div className="clearfix">
                <Button className="float-right">Create</Button>
            </div>
        </Form>
    </div>
);

class EventList extends Component {
    componentWillMount() {
        this.props.actions.fetchEvents();
    }
    render() {
        let { events, actions, isParticipating, isFetching } = this.props;
        return (
            <Loadable
                active={isParticipating || isFetching}
                spinner
                text='Processing ...'
            >
                <Row>

                    <Col xs={12} sm={12}>
                        <NavControll> </NavControll>
                    </Col>

                    {events.map((cardData, key) => (
                        <Col key={key} xs={12} sm={4}>
                            <Card>
                                <CardImg top width="100%" src={cardData.photo} alt={cardData.name} />
                                <CardBody>
                                    <CardTitle>{cardData.name}</CardTitle>
                                    <CardText>{cardData.discription}</CardText>
                                    <div className="clearfix">
                                    </div >
                                    {isAuthentic(['admin']) ? < Button onClick={() => { history.push("/user/eventmanager/" + cardData.eid) }} className="float-left">Manage</Button> : ""}
                                    <Button disabled={cardData.uid ? true : false} onClick={() => { actions.participateEvents(cardData.eid) }} color="primary" className="float-right">Participate</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}

                </Row>
            </Loadable>
        );
    }
}

let mapStateToProps = (state) => {

    let { isParticipating, isFetching, items } = state.events;
    return {
        isParticipating,
        isFetching,
        events: items
    }
};


export default connect(mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators({
                fetchEvents: events.fetchEvents,
                participateEvents: events.participateEvents
            }, dispatch)
        }
    })(EventList);