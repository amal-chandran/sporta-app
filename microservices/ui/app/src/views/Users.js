import React, { Component } from "react";
import {
    Col, Row, Card, CardBody, CardImg,
    CardTitle, CardText, Button, CardSubtitle,
    Nav, NavLink, NavItem, Form, FormGroup, Input, Label
} from "reactstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { appusers } from "./../resources";
import isEmpty from "lodash/isEmpty";
//Copyed form events

import { history } from './../helpers';
import { popupToggleActions } from "./../actions";
import SubNav from "../components/SubNav";
import ResponsiveMenuDialog from "../components/ResponsiveMenuDialog";
import Loadable from "react-loading-overlay";
import { isAuthentic } from "./../helpers/Underscore";


let NavControll = connect((state) => {
    let { USERFORMtogglePopupForm } = state.popupToggle;
    return {
        togglePopupForm: USERFORMtogglePopupForm
    };
}, (dispatch) => {
    return {
        actions: bindActionCreators({
            userFormToggle: popupToggleActions.userFormToggle
        }, dispatch)
    }
})((props) => {
    return (
        <SubNav Name="Users">
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <EventFormPopup />
                    {isAuthentic(['admin']) ?
                        <NavLink onClick={() => { props.actions.userFormToggle({ type: "Create" }) }} className="text-primary" href="#">Create User</NavLink>
                        : ""}
                </NavItem>
            </Nav>
        </SubNav>
    );
});

let EventFormPopup = connect((state) => {
    let { USERFORMtogglePopupForm, USERFORMdata } = state.popupToggle;
    return {
        togglePopupForm: USERFORMtogglePopupForm,
        data: USERFORMdata
    };
}, (dispatch) => {
    return {
        actions: bindActionCreators({
            userFormToggle: popupToggleActions.userFormToggle
        }, dispatch)
    }
})((props) => (
    <ResponsiveMenuDialog handleClose={() => { props.actions.userFormToggle() }} open={props.togglePopupForm} Title={(!isEmpty(props.data) ? props.data.type : "") + " User"}>
        <EventForm />
    </ResponsiveMenuDialog >
));



let EventForm = connect((state) => {
    let { USERFORMdata } = state.popupToggle;
    let { item } = state.appusers;
    return {
        data: USERFORMdata,
        eventData: item
    };
}, (dispatch) => {
    return {
        actions: bindActionCreators({
            userFormToggle: popupToggleActions.userFormToggle,
            getEvent: appusers.getEvent,
            createAppusers: appusers.createAppusers,
            updateAppusers: appusers.updateAppusers
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
                        <Label for="EventName">User Name</Label>
                        <Input type="text" value={state.name} onChange={this.handleChange} name="name" id="EventName" placeholder="Event Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="EventDiscription">Password</Label>
                        <Input type="textarea" value={state.discription} onChange={this.handleChange} name="discription" id="EventDiscription" placeholder="Event Discription" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="EventPhoto">Name</Label>
                        <Input type="text" value={state.photo} onChange={this.handleChange} name="photo" id="EventPhoto" placeholder="Event Photo" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="EventPhoto">Name</Label>
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


//Copyed form events

class EventList extends Component {
    componentWillMount() {
        this.props.actions.fetchAppusers();
    }
    render() {
        return (
            <div className="animated fadeIn">
                <NavControll />
                <Row>
                    {this.props.appusers.map((cardData, key) => {
                        console.log(cardData);
                        if (!isEmpty(cardData.other)) {
                            cardData.photo = cardData.other.picture.data.url;
                        }
                        return (
                            <Col key={key} xs="12" lg="3">
                                <Card>
                                         <CardImg top width="100%" src={cardData.photo} alt="Card image cap" />
        <CardBody>
          <CardTitle>{cardData.name}</CardTitle>
          <CardText>
                    {cardData.email}<br/>
                                    {cardData.collegeid}<br/>
                                    {cardData.phone}<br/>
              </CardText>
           {
                                            !cardData.verified?
                                        <Button onClick={()=>{this.props.actions.setactiveAppusers(cardData.pid)}}>Verify</Button>
                                        :""
                                    }
        </CardBody>
                                </Card>
                                
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

let mapStateToProps = (state) => {

    let { isFetching, items } = state.appusers;
    return {
        isFetching,
        appusers: items
    }
};
export default connect(mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators({
                fetchAppusers: appusers.fetchAppusers,
                setactiveAppusers: appusers.setactiveAppusers,
            }, dispatch)
        }
    })(EventList);