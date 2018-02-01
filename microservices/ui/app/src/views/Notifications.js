

import React, { Component } from "react";
import {
    Col, Row, Media, Card, CardBody
} from "reactstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { notifications } from "./../resources";
import isEmpty from "lodash/isEmpty";

class EventList extends Component {
    componentWillMount() {
        this.props.actions.fetchNotifications();
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    {this.props.notifications.map((cardData, key) => {

                        return (
                            <Col key={key} xs="12" lg="12">
                                <Card>
                                    <CardBody>
                                        <Media>
                                            <Media right href="#">
                                                <Media object data-src={cardData.image} alt="Generic placeholder image" />
                                            </Media>
                                            <Media body>
                                                <Media heading>{cardData.head}</Media>
                                                {cardData.head}
                                            </Media>
                                        </Media>

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

    let { isFetching, items } = state.notifications;
    return {
        isFetching,
        notifications: items
    }
};


export default connect(mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators({
                fetchNotifications: notifications.fetchNotifications,
            }, dispatch)
        }
    })(EventList);