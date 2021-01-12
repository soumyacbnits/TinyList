import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Input, InputAdornment, IconButton, Container  } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { createTodoItem } from '../store/actions/todoList.action'
import AddIcon from '@material-ui/icons/Add';


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
        
    }
  });

class AddOrEditTodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: this.props.selectedTaskToEditOrAdd,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (state.newTodo.id !== props.selectedTaskToEditOrAdd.id) {
            return { newTodo: props.selectedTaskToEditOrAdd };
        }
        else {
            return null;
        }
    }

    handleInputChange = (event) => {
        this.setState({
            newTodo: {
                ...this.state.newTodo,
                task: event.target.value
            }
        });
    };

    handleAddOrEditTodoItem = () => {
        const { newTodo } = this.state;
        if (newTodo.id === 0 && newTodo.task.trim() !== '') {
            this.props.createTodoItem(newTodo);
        } else {
           console.log('please enter task ');
        }
    }
    
    handleResetSelectedTodoItem = () => {
        this.setState({ newTodo: this.props.selectedTaskToEditOrAdd })
    }

    render() {
        const { classes } = this.props;

        return (
            <Container className={classes.containerStyle}>
               <Input
                    value={this.state.newTodo.task}
                    placeholder='Add to list...' 
                    onChange={(e) => this.handleInputChange(e)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            this.handleAddOrEditTodoItem()
                        }
                    }}
                    className={classes.addStyle}
                    startAdornment={
                        <InputAdornment position="start">
                            <IconButton >
                            <AddIcon style= {{ color: "#EB5757"}} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedTaskToEditOrAdd: state.todos.selectedTaskToEditOrAdd,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createTodoItem: (todoItem) => {
            dispatch(createTodoItem(todoItem));
        }
    }
};

AddOrEditTodoItem.propTypes = {
    classes: PropTypes.object.isRequired,
    createTodoItem: PropTypes.func,
    updateTodoItem: PropTypes.func
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(AddOrEditTodoItem));
