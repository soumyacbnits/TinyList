import React, { Component } from "react";
import {Typography , AppBar,Toolbar } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import AddOrEditTodoItem from "./addOrEditTodoItem";

const useStyles = theme => ({
    header: {
        "& .MuiPaper-root": {
            background: '#EB5757',
            
        }
    },
    containerStyle: {
        maxWidth:"550px"
    },
    addStyle : {
        marginTop: "20px",
        width: "100%",
        "&.MuiInput-underline:before":{
            borderBottom: "#E0E0E0 1px solid"
        },
        "& .MuiInputBase-input": {
            color: "#EB5757",
            padding: "14px 0"
        },
        
    },
    title:{
        [theme.breakpoints.down("md")]: {
            textAlign: "center",
            width: "100%"
          }   
    }
});

class TodoHeader extends Component {

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.header}>
                    <AppBar position="static">
                        <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            TinyList
                        </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <AddOrEditTodoItem/>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(TodoHeader);
