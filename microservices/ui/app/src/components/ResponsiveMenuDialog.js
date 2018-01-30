import React, { Component } from "react";
import { NavLink } from "reactstrap";
import { Dialog, DialogTitle, DialogContent, withMobileDialog } from "material-ui";

class ResponsiveMenuDialog extends React.Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        const { fullScreen, Name, Title, children } = this.props;

        return (
            <div>
                <NavLink onClick={this.handleClickOpen} className="text-primary" href="#">{Name}</NavLink>

                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{Title}</DialogTitle>
                    <DialogContent>
                        {children}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withMobileDialog()(ResponsiveMenuDialog);