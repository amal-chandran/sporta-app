import React, { Component } from "react";
import { Header, Sidebar } from "./../components";
import { Container, Table, Badge, Card, Row, Col, CardBody, CardHeader } from 'reactstrap';
import { Switch, Route, Redirect } from "react-router-dom";

import Events from "./../views/Events";
// import Sporta from "./../views/Sporta";
import Users from "./../views/Users";
import EventManager from "./../views/EventManager";
import Scoreboard from "./../views/Scoreboard";

export default class Normal extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        let { match } = this.props;

        return (
            <div className="app" >
                <Header private={true} />
                <div className="app-body">
                    <Sidebar {...this.props} />
                    <main className="main">
                        <Container fluid>
                            <div className="animated fadeIn">
                                <Switch>
                                    <Route exact path={match.url} name="Index" render={() => (<Redirect to={match.url + "/sporta"} />)} />
                                    <Route path={match.url + "/scoreboard"} name="Scoreboard" component={Scoreboard} />
                                    <Route path={match.url + "/eventmanager/:id"} name="EventManager" component={EventManager} />
                                    <Route path={match.url + "/users"} name="Users" component={Users} />
                                    {/* <Route path={match.url + "/sporta"} name="Sporta" component={Sporta} /> */}
                                    <Route path={match.url + "/events"} name="Events" component={Events} />
                                </Switch>
                            </div>
                        </Container>
                    </main>
                </div>
            </div>
        );
    }
}
