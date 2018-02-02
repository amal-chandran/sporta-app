import React, { Component } from "react";
import { Header, Sidebar } from "./../components";
import { Container, Table, Badge, Card, Row, Col, CardBody, CardHeader } from 'reactstrap';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { profile } from "./../resources";
import Events from "./../views/Events";
import Notifications from "./../views/Notifications";
import Sporta from "./../views/Sporta";
import Users from "./../views/Users";
import Settings from "./../views/Settings";
import EventManager from "./../views/EventManager";
import Scoreboard from "./../views/Scoreboard";
import Button from "material-ui/Button/Button";
import { isAuthentic, isVerified } from "./../helpers/Underscore";

class Normal extends Component {
    componentWillMount() {
        isAuthentic(['user', 'admin']) ? this.props.dispatch(profile.getProfile()) : "";
    }

    render() {
        let { match, Auth } = this.props;
        return (
            isAuthentic(['user', 'admin']) ?
                <div className="app" >
                    <Header private={true} />
                    <div className="app-body">
                        <Sidebar {...this.props} />
                        <main className="main">
                            <Container fluid>
                                <div className="animated fadeIn">
                                    <Switch>
                                        <Route path={match.url + "/settings"} name="Settings" component={Settings} />
                                        <Route exact path={match.url} name="Index" render={() => (<Redirect to={match.url + "/sporta"} />)} />
                                        <Route path={match.url + "/sporta"} name="Sporta" component={Sporta} />
                                        {isVerified() ?
                                            <div>
                                                <Route path={match.url + "/scoreboard"} name="Scoreboard" component={Scoreboard} />
                                                <Route path={match.url + "/eventmanager/:id"} name="EventManager" component={EventManager} />
                                                <Route path={match.url + "/users"} name="Users" component={Users} />
                                                <Route path={match.url + "/notifications"} name="Notifications" component={Notifications} />
                                                <Route path={match.url + "/events"} name="Events" component={Events} />
                                            </div>
                                            : ""}
                                        {/* <Route exact path={match.url} name="Index" component={Sporta} />)} /> */}
                                    </Switch>
                                </div>
                            </Container>
                        </main>
                    </div>
                </div>
                : <Redirect to="/public/login" />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Auth: state.authentication,
        profile: state.profile
    };
};


// mapDispatchToProps


export default connect(mapStateToProps)(Normal);
