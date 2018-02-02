import React, { Component } from "react";
import {
    Col, Row, Card, CardBody, CardHeader,
    CardTitle, CardText, Button, Table, Badge
} from "reactstrap";
import { events, eventusers } from "./../resources";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";




class EventManagerList extends Component {
    componentWillMount() {
        // console.log(this.props.actions);
        this.props.actions.getEvent(this.props.match.params.id);
        this.props.actions.getEventusers(this.props.match.params.id);
    }
    render() {
        console.log(this.props.event);
        let EventName = !isEmpty(this.props.event) ? this.props.event[0].name : "";
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="6">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>
                                {EventName}
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.eventusers.map((data, key) => {
                                            return (
                                                <tr>
                                                    <td>{data.name}</td>
                                                </tr>
                                            );
                                        })}
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

let mapStateToProps = (state) => {
    let { isParticipating, isFetching, item } = state.events;
    let { items } = state.eventusers;
    return {
        isParticipating,
        isFetching,
        eventusers: items
    }
};

export default connect(mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators({
                getEvent: events.getEvent,
                getEventusers: eventusers.getEventusers
            }, dispatch)
        }
    })(EventManagerList);