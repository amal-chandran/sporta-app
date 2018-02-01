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
import { popupToggleActions } from "./../actions";
import SubNav from "../components/SubNav";
import ResponsiveMenuDialog from "../components/ResponsiveMenuDialog";
import Loadable from "react-loading-overlay";
import { isAuthentic } from "./../helpers/Underscore";
import isEmpty from "lodash/isEmpty";


let NavControll = connect((state) => {
    let { EVENTSFORMtogglePopupForm } = state.popupToggle;
    return {
        togglePopupForm: EVENTSFORMtogglePopupForm
    };
}, (dispatch) => {
    return {
        actions: bindActionCreators({
            eventFormToggle: popupToggleActions.eventFormToggle
        }, dispatch)
    }
})((props) => {
    return (
        <SubNav Name="Event">
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <EventFormPopup />
                    {isAuthentic(['admin']) ?
                        <NavLink onClick={() => { props.actions.eventFormToggle({ type: "Create" }) }} className="text-primary" href="#">Create Event</NavLink>
                        : ""}
                </NavItem>
            </Nav>
        </SubNav>
    );
});

let EventFormPopup = connect((state) => {
    let { EVENTSFORMtogglePopupForm, EVENTSFORMdata } = state.popupToggle;
    return {
        togglePopupForm: EVENTSFORMtogglePopupForm,
        data: EVENTSFORMdata
    };
}, (dispatch) => {
    return {
        actions: bindActionCreators({
            eventFormToggle: popupToggleActions.eventFormToggle
        }, dispatch)
    }
})((props) => (
    <ResponsiveMenuDialog handleClose={() => { props.actions.eventFormToggle() }} open={props.togglePopupForm} Title={(!isEmpty(props.data) ? props.data.type : "") + " Event"}>
        <EventForm />
    </ResponsiveMenuDialog >
));



let EventForm = connect((state) => {
    let { EVENTSFORMdata } = state.popupToggle;
    let { item } = state.events;
    return {
        data: EVENTSFORMdata,
        eventData: item
    };
}, (dispatch) => {
    return {
        actions: bindActionCreators({
            eventFormToggle: popupToggleActions.eventFormToggle,
            getEvent: events.getEvent,
            createEvents: events.createEvents,
            updateEvents: events.updateEvents
        }, dispatch)
    }
})(class EventForm extends Component {
    constructor(props) {
        super(props);

        let SetState = {
            eid: "",
            name: "",
            discription: "",
            photo: "",
            started: "false",
            uid: ""
        };

        if (!isEmpty(props.data) && !isEmpty(props.data.data))
            if (props.data.type == "Update") {
                props.data.data.type = props.data.type;
                SetState = props.data.data;
            }

        this.state = SetState;
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        let { props, state } = this;

        return (
            <div>
                <Form >
                    <FormGroup>
                        <Label for="EventName">Name</Label>
                        <Input type="text" value={state.name} onChange={this.handleChange} name="name" id="EventName" placeholder="Event Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="EventDiscription">Discription</Label>
                        <Input type="textarea" value={state.discription} onChange={this.handleChange} name="discription" id="EventDiscription" placeholder="Event Discription" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="EventPhoto">Photo</Label>
                        <Input type="text" value={state.photo} onChange={this.handleChange} name="photo" id="EventPhoto" placeholder="Event Photo" />
                    </FormGroup>
                    <div className="clearfix">
                        {isEmpty(state.type) ?
                            <Button onClick={() => { this.props.actions.createEvents(state) }} className="float-right">Create</Button>
                            :
                            <Button onClick={() => { this.props.actions.updateEvents(state) }} className="float-right">Update</Button>
                        }
                    </div>
                </Form>
            </div>
        )
    }
});

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
                                    {isAuthentic(['admin']) ? < Button onClick={() => { actions.deleteEvent(cardData.eid) }} className="float-left">Delete</Button> : ""}
                                    {isAuthentic(['admin']) ? < Button onClick={() => { actions.eventFormToggle({ type: "Update", data: cardData }) }} className="float-left">Edit</Button> : ""}
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
                deleteEvent: events.deleteEvent,
                participateEvents: events.participateEvents,
                eventFormToggle: popupToggleActions.eventFormToggle
            }, dispatch)
        }
    })(EventList);