import React from "react";
import { Col, Row, Card, CardBody, CardHeader, CardTitle, CardText, Button, Table, Badge } from "reactstrap";

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
    <div className="animated fadeIn">
        <Row>
            <Col xs="12" lg="6">
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Date registered</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Samppa Nori</td>
                                    <td>2012/01/01</td>
                                    <td>Member</td>
                                    <td>
                                        <Badge color="success">Active</Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Estavan Lykos</td>
                                    <td>2012/02/01</td>
                                    <td>Staff</td>
                                    <td>
                                        <Badge color="danger">Banned</Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Chetan Mohamed</td>
                                    <td>2012/02/01</td>
                                    <td>Admin</td>
                                    <td>
                                        <Badge color="secondary">Inactive</Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Derick Maximinus</td>
                                    <td>2012/03/01</td>
                                    <td>Member</td>
                                    <td>
                                        <Badge color="warning">Pending</Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Friderik Dávid</td>
                                    <td>2012/01/21</td>
                                    <td>Staff</td>
                                    <td>
                                        <Badge color="success">Active</Badge>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                    </CardBody>
                </Card>
            </Col>

            <Col xs="12" lg="6">
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Date registered</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Samppa Nori</td>
                                    <td>2012/01/01</td>
                                    <td>Member</td>
                                    <td>
                                        <Badge color="success">Active</Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Estavan Lykos</td>
                                    <td>2012/02/01</td>
                                    <td>Staff</td>
                                    <td>
                                        <Badge color="danger">Banned</Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Chetan Mohamed</td>
                                    <td>2012/02/01</td>
                                    <td>Admin</td>
                                    <td>
                                        <Badge color="secondary">Inactive</Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Derick Maximinus</td>
                                    <td>2012/03/01</td>
                                    <td>Member</td>
                                    <td>
                                        <Badge color="warning">Pending</Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Friderik Dávid</td>
                                    <td>2012/01/21</td>
                                    <td>Staff</td>
                                    <td>
                                        <Badge color="success">Active</Badge>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
);