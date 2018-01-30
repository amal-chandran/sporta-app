import React, { Component } from "react";
import {
    Col, Row, Card, CardBody, CardHeader, CardTitle,
    CardText, Button, Table, Badge, Form, FormGroup,
    Label, Input, FormText, Nav, NavItem, NavLink,
    ButtonGroup, InputGroup, InputGroupAddon
} from "reactstrap";

import {
    Chip, Avatar, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, DialogContentText,
    Paper, Typography, withStyles, withMobileDialog,
    Checkbox, ListItemAvatar, Grid
} from "material-ui";

import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';

import UserImage from "../img/6.jpg";
import SubNav from "../components/SubNav";
import ResponsiveMenuDialog from "../components/ResponsiveMenuDialog";
import CheckboxList from "../components/CheckboxList";

import { Edit, Delete } from 'material-ui-icons';

export default (props) => (
    <div className="animated fadeIn">
        <Row>
            <Col xs="12" lg="12">
                <NavControll />
                {/* {props.match.params.id} */}
            </Col >
            <Col>
                <TestCards />
            </Col>
        </Row>
    </div>
);

let NavControll = () => {
    return (
        <SubNav Name="Event Manager">
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <CreateTest />
                </NavItem>
                <NavItem>
                    <NavLink className="text-primary" href="#">Finalize Event</NavLink>
                </NavItem>
                <NavItem>
                    <ManageCoordinator />
                </NavItem>
            </Nav>
        </SubNav>
    );
}

class TestCards extends Component {
    constructor(props) {
        super(props);

        this.data = [
            {
                Name: "Test 1",
                Users: ['Apple', 'Hello', 'Lover', 'Loving']
            }, {
                Name: "Test 1",
                Users: ['Apple', 'Hello', 'Lover', 'Loving']
            }, {
                Name: "Test 1",
                Users: ['Apple', 'Hello', 'Lover', 'Loving']
            }, {
                Name: "Test 1",
                Users: ['Apple', 'Hello', 'Lover', 'Loving']
            }
        ];

    }
    render() {

        return (
            <div>
                <Row>
                    {this.data.map((cardData, key) => (
                        <Col key={key} xs={12} lg={4}>
                            <Card >
                                <CardBody>
                                    <CardTitle>
                                        {cardData.Name}
                                    </CardTitle>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Participents</th>
                                                <th>Score</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cardData.Users.map((UserData, keyUsers) => (
                                                <tr key={keyUsers}>
                                                    <th scope="row">{keyUsers + 1}</th>
                                                    <td> {UserData}</td>
                                                    <td>10</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div className="clearfix">
                                        <div className=" float-right">
                                            <IconButton color="primary" aria-label="Add to shopping cart">
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="primary" aria-label="Add to shopping cart">
                                                <Delete />
                                            </IconButton>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}

let CreateTest = () => (
    <ResponsiveMenuDialog Name="Create Test" Title="Create Test">
        <VerticalStepper />
    </ResponsiveMenuDialog>
);

let ManageCoordinator = () => (
    <ResponsiveMenuDialog Name="Manage Coordinator" Title="Manage Coordinator">
        <ManageCoordinatorForm />
    </ResponsiveMenuDialog>
);

let ManageCoordinatorForm = () => (
    <div>
        <CheckboxList
            head={"Select Coordinator"}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        />
        <FormGroup>
            <Label for="exampleSelect">Main Coordinator</Label>
            <Input type="select" name="select" id="exampleSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Input>
        </FormGroup>
        <div className="clearfix">
            <Button className="float-right">Save List</Button>
        </div>
    </div>
);

function getSteps() {
    return ['Test Details', 'Add Points', 'Review'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return (<StepOne />);
        case 1:
            return (<StepTwo />);
        case 2:
            return (<StepThree />);
        default:
            return 'Unknown step';
    }
}

const styles = theme => ({
    root: {
        width: '90%',
    },
    steproot: { padding: 0 },
    button: {
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    resetContainer: {
        marginTop: 0,
        padding: theme.spacing.unit * 3, // TODO: See TODO note on Stepper
    },
});

class VerticalLinearStepper extends React.Component {
    state = {
        activeStep: 1,
    };

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>

                <Stepper classes={{ root: classes.steproot }} activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>

                                    {getStepContent(index)}

                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}
                                            >
                                                Back
                      </Button>
                                            <Button
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&quot;re finished</Typography>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
            </Button>
                    </Paper>
                )}

            </div>
        );
    }
}

let VerticalStepper = withStyles(styles)(VerticalLinearStepper);

class StepOne extends React.Component {
    render() {
        return (
            <div>
                <InputGroup>
                    <Input placeholder="Test Name" />
                </InputGroup>
                <br />
                <CheckboxList
                    head={"Select Particepents"}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                />
            </div>
        );
    }
}



class StepTwo extends React.Component {

    render() {
        return (
            <div>
                <p className="bold-head">Points of Participents</p>
                {/* <br /> */}
                <div className="scrollList">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((value, key) => (
                        <FormGroup key={key}>
                            <Label for="exampleEmail">User Name</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="User's Point" />
                        </FormGroup>
                    ))}
                </div>
            </div>
        );
    }
}

class StepThree extends React.Component {

    render() {
        let data = {
            Name: "Test 1",
            Users: ['Apple', 'Hello', 'Lover', 'Loving']
        };
        return (
            <div>
                <p className="bold-head">Review Points of Participents</p>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Participents</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.Users.map((UserData, keyUsers) => (
                            <tr key={keyUsers}>
                                <th scope="row">{keyUsers + 1}</th>
                                <td> {UserData}</td>
                                <td>10</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}