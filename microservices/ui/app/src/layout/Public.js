import React, { Component } from "react";
import { Header, Sidebar } from "./../components";
import { Container, Table, Badge, Card, Row, Col, CardBody, CardHeader } from 'reactstrap';
import { Switch, Route } from "react-router-dom";

import Login from "./../views/Login";
import Register from "./../views/Register";

export default class Normal extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        let { match } = this.props;
        console.log(match.url);
        return (
            <div className="app" >
                <Header private={false} />
                <main className="mainPublic">
                    <Switch>
                        <Route path={match.url + "/login"} name="Login" component={Login} />
                        <Route path={match.url + "/register"} name="Register" component={Register} />
                    </Switch>
                </main>
            </div>
        );
    }
}
