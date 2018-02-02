import React from "react";
import { Col, Row, Card, CardBody, CardHeader, CardTitle, CardText, Button, Table, Badge } from "reactstrap";

export default () => (
    <div className="animated fadeIn">
        <Row>
            <Col xs="12" lg="6">
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> Scoreboard
              </CardHeader>
                    <CardBody>
                        Will be updated soon
                        {/* <Table responsive>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Date registered</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </Table> */}

                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
);