import React from "react";
import {
    Col, Row, Card, CardBody, CardImg,
    CardTitle, CardText, Button, CardSubtitle,
    Nav, NavLink, NavItem, Form, FormGroup, Input, Label
} from "reactstrap";

import { history } from './../helpers';

import SubNav from "../components/SubNav";
import ResponsiveMenuDialog from "../components/ResponsiveMenuDialog";

let RandomData = [
    {
        id: "1",
        name: "Marathon",
        text: `The Marathon will start from Poonjar Bus Stand where the flagoff will be initiated and will end at College of Engineering, Poonjar on 31/01/2018. The participants need to cover a 3.9km hilly track. A cash price awaits the winner.`,
        image: "/images/1.jpg"
    },
    {
        id: "1",
        name: "Marathon",
        text: `The Marathon will start from Poonjar Bus Stand where the flagoff will be initiated and will end at College of Engineering, Poonjar on 31/01/2018. The participants need to cover a 3.9km hilly track. A cash price awaits the winner.`,
        image: "/images/1.jpg"
    },
    {
        id: "1",
        name: "Marathon",
        text: `The Marathon will start from Poonjar Bus Stand where the flagoff will be initiated and will end at College of Engineering, Poonjar on 31/01/2018. The participants need to cover a 3.9km hilly track. A cash price awaits the winner.`,
        image: "/images/1.jpg"
    },
    {
        id: "1",
        name: "Marathon",
        text: `The Marathon will start from Poonjar Bus Stand where the flagoff will be initiated and will end at College of Engineering, Poonjar on 31/01/2018. The participants need to cover a 3.9km hilly track. A cash price awaits the winner.`,
        image: "/images/1.jpg"
    },
    {
        id: "1",
        name: "Marathon",
        text: `The Marathon will start from Poonjar Bus Stand where the flagoff will be initiated and will end at College of Engineering, Poonjar on 31/01/2018. The participants need to cover a 3.9km hilly track. A cash price awaits the winner.`,
        image: "/images/1.jpg"
    },

];

let NavControll = () => {
    return (
        <SubNav Name="Event">
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <CreateEvent />
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

export default () => (
    <Row>
        <Col xs={12} sm={12}>
            <NavControll> </NavControll>
        </Col>
        {RandomData.map((cardData, key) => (
            <Col key={key} xs={12} sm={4}>
                <Card>
                    <CardImg top width="100%" src={cardData.image} alt={cardData.name} />
                    <CardBody>
                        <CardTitle>{cardData.name}</CardTitle>
                        <CardText>{cardData.text}</CardText>
                        <div className="clearfix">
                        </div >
                        <Button onClick={() => { history.push("/user/eventmanager/" + cardData.id) }} className="float-left">Manage</Button>
                        <Button color="primary" className="float-right">Participate</Button>
                    </CardBody>
                </Card>
            </Col>
        ))}
    </Row>
);