import React, { Component } from "react";
import {
    Col, Row, Card, CardBody, CardHeader, CardTitle,
    CardText, Button, Table, Badge, Form, FormGroup,
    Label, Input, FormText, Nav, NavItem, NavLink,
    NavbarBrand, Navbar, NavbarToggler, Collapse, ButtonGroup,
    InputGroup, InputGroupAddon
} from "reactstrap";

import {
    Chip, Avatar, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, DialogContentText,
    Paper, Typography, withStyles, withMobileDialog
} from "material-ui";

import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';

import UserImage from "../img/6.jpg";

import { Edit, Delete } from 'material-ui-icons';

// import 'react-select-plus/dist/react-select-plus.css';
// import Select from 'react-select-plus';

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

class NavControll extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="faded" light expand="md" className="nav-menu add-bottom-space">
                    <NavbarBrand>Event Manager</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <CreateTest />
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-primary" href="#">Finalize Event</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
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
                        <Col xs={12} lg={4}>
                            <Card key={key}>
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
                                                    <td>
                                                        {/* <Avatar height="10px" alt="Remy Sharp" src={UserImage} /> */}
                                                        {UserData}
                                                        {/* <Chip key={keyUsers}
                                                        avatar={<Avatar src={UserImage} />}
                                                        label={UserData}
                                                    /> */}
                                                    </td>
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

class ResponsiveDialog extends React.Component {
    state = {
        open: true,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <NavLink onClick={this.handleClickOpen} className="text-primary" href="#">Create Test</NavLink>

                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Create Test"}</DialogTitle>
                    <DialogContent>
                        <VerticalStepper />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

let CreateTest = withMobileDialog()(ResponsiveDialog);

function getSteps() {
    return ['Test Details', 'Add Points', 'Review'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return (<StepOne />);
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}

const styles = theme => ({
    root: {
        width: '90%',
    },
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
        activeStep: 0,
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
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <Typography>{getStepContent(index)}</Typography>
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

    handleSelectChange(value) {
        console.log('You\'ve selected:', value);
        this.setState({ value });
    }
    getInitialState() {
        return {
            removeSelected: true,
            disabled: false,
            crazy: false,
            stayOpen: false,
            value: [],
            rtl: false,
        };
    }

    render() {
        // const { value } = this.state
        const FLAVOURS = [
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Vanilla', value: 'vanilla' },
            { label: 'Strawberry', value: 'strawberry' },
            { label: 'Caramel', value: 'caramel' },
            { label: 'Cookies and Cream', value: 'cookiescream' },
            { label: 'Peppermint', value: 'peppermint' },
        ];
        return (
            <InputGroup>
                {/* <InputGroupAddon addonType="prepend">@</InputGroupAddon> */}
                <Input placeholder="Test Name" />
                {/* <Select
                    closeOnSelect={false}
                    // disabled={disabled}
                    multi
                    // onChange={this.handleSelectChange}
                    options={FLAVOURS}
                    placeholder="Select your favourite(s)"
                    // removeSelected={this.state.removeSelected}
                    // rtl={this.state.rtl}
                    simpleValue
                    value={value}
                /> */}
            </InputGroup>
        );
    }
}