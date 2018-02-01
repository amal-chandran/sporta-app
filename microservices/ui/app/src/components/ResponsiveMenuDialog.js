import React, { Component } from "react";
import { NavLink } from "reactstrap";
import { Dialog, DialogTitle, DialogContent, withMobileDialog } from "material-ui";

class ResponsiveMenuDialog extends React.Component {
    render() {
        const { fullScreen, Title, children, open, handleClose } = this.props;

        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open ? true : false}
                    onClose={handleClose}
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