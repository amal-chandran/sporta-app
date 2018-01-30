import React, { Component } from "react";
import {
    Col, Row, Card, CardBody, CardHeader, CardTitle,
    CardText, Button, Table, Badge, Form, FormGroup, Label, Input, FormText
} from "reactstrap";

import imagesLoaded from "imagesloaded";
import Slideshow from "./../lib/scoreboard";

export default class Scoreboard extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.DOM = {};

        this.DOM.gridElems = Array.from(document.querySelectorAll('.grid'));
        this.DOM.main = document.querySelectorAll('main')[0];

        imagesLoaded(this.DOM.main, { background: true }, () => {
            console.log("Added");
            this.DOM.main.classList.remove('loading');
            new Slideshow(this.DOM.gridElems, {
                filledColor: '#fff'
            });
        });
    }
    render() {
        return (
            <div className="animated fadeIn">
                <main className="demo-2 loading">
                    <div className="grid grid--layout-1 grid--current">
                        <div className="grid__item" data-direction="ltr" data-delay="50">
                            <h1>Hello</h1>
                        </div>
                        <div className="grid__item" data-delay="200"></div>
                        <div className="grid__item" data-direction="ltr" data-delay="50"></div>
                        <div className="grid__item" data-delay="40"></div>
                        <div className="grid__item" data-delay="70"></div>
                        <div className="grid__item" data-delay="100"></div>
                        <div className="grid__item" data-direction="ltr" data-delay="200"></div>
                        <div className="grid__item"></div>
                        <div className="grid__item" data-direction="ttb"></div>
                        <div className="grid__item"></div>
                        <div className="grid__item" data-delay="100"></div>
                        <div className="grid__item"></div>
                        <div className="grid__item" data-delay="250"></div>
                        <div className="grid__item grid__item--nav grid__item--nav-prev">

                            <div>
                                <span style={{ fontWeight: "bold" }}>
                                    Score
                            </span><br />
                            </div>
                        </div>
                        <div className="grid__item grid__item--nav grid__item--nav-next">
                            Winners
			</div>
                        <h2 className="grid__item grid__item--name">Sporta
				<br />2k18</h2>
                        <h3 className="grid__item grid__item--title">Sporta</h3>
                        <p className="grid__item grid__item--text">We are giving opportunities to everyone to express their athletic talents.</p>
                    </div>
                </main>
            </div>
        );
    }

}