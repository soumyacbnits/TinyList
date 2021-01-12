import React, { Component } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/todoList";
import { withStyles } from '@material-ui/core/styles';
import "./App.css";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {

  handleChange = (event, newValue) => {
    this.setState({ currentTab: newValue });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>          
            <TodoHeader />
            <TodoList />
      </div>
    );
  }
}

export default withStyles(useStyles)(App);
