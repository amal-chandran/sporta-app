import React, { Component } from "react";
import {
    Col, Row, Card, CardBody, CardHeader, CardTitle,
    CardLink, CardSubtitle, CardText
} from "reactstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { appusers } from "./../resources";
import isEmpty from "lodash/isEmpty";

class EventList extends Component {
    componentWillMount() {
        this.props.actions.fetchAppusers();
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    {this.props.appusers.map((cardData, key) => {
                        console.log(cardData);
                        if (!isEmpty(cardData.other)) {
                            cardData.photo = cardData.other.picture.data.url;
                        }
                        return (
                            <Col key={key} xs="12" lg="3">
                                <Card>
                                    <CardBody>
                                        <CardTitle>{cardData.name}</CardTitle>
                                    </CardBody>
                                    <img width="100%" src={cardData.photo} alt="Card image cap" />
                                    <CardBody>
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
            }, dispatch)
        }
    })(EventList);