import React, { Component } from "react";
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, withStyles } from "material-ui";

class CheckboxList extends React.Component {
    state = {
        checked: [0],
    };

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    render() {
        const { classes, head, data } = this.props;

        return (
            <div className={classes.root}>
                <p className="bold-head">{head}</p>
                <div className="scrollList">
                    <List dense={true} disablePadding>
                        {data.map((value, key) => (
                            <ListItem
                                key={key}
                                dense
                                button
                                onClick={this.handleToggle(key)}
                                className={classes.listItem}
                            >
                                <ListItemText primary={value} />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        checked={this.state.checked.indexOf(key) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>

            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
});
export default withStyles(styles)(CheckboxList);