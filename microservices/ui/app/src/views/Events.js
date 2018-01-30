import React from "react";
import { Col, Row, Card, CardBody, CardImg, CardTitle, CardText, Button, CardSubtitle } from "reactstrap";
import { history } from './../helpers';

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

export default () => (
    <Row>
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