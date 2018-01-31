import React, { Component } from "react";
import { connect } from "react-redux";
import { Snackbar } from "material-ui";
import { alertActions } from "./../actions";

class Alert extends Component {
    componentDidUpdate() {
        if (this.props.Alert.message)
            setTimeout(() => {
                this.props.dispatch(alertActions.clear());
            }, 4000);
    }
    render() {
        let { Alert } = this.props;
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={Alert.message ? true : false}
                autoHideDuration={1000}
                SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{Alert.message ? Alert.message : ""}</span>}
            />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        Alert: state.alert
    };
};

export default connect(mapStateToProps)(Alert);