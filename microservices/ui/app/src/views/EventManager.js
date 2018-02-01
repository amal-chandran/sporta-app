import React from "react";
import {
    Col, Row, Card, CardBody, CardHeader,
    CardTitle, CardText, Button, Table, Badge
} from "reactstrap";

export default class EventManagerList extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="6">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>
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
    }
}