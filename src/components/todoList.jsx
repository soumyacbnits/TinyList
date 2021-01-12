import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import DeleteIcon from '@material-ui/icons/Delete';
import { Input,List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, IconButton, Container, CircularProgress } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { getAllTodoItems, deleteTodoItem ,updateTodoItem ,completeTodoItem,unCompleteTodoItem} from './../store/actions/todoList.action'
import Checkbox from "@material-ui/core/Checkbox";


const useStyles = theme => ({
    container: {
        maxWidth: "550px"
    },
   customCheckboxStyle: {
    "&.MuiCheckbox-colorSecondary.Mui-checked": {
        color: "#EB5757"
      }
   },
   listItemCustom:{
    "&:hover $listItemSecondaryAction": {
        visibility: "inherit"
      },
      "&.MuiListItem-divider":{
        borderBottom: "none",
      }
   },
   listMain: {
    "& .MuiListItemSecondaryAction-root": {
        [theme.breakpoints.up("md")]: {
            visibility: "hidden",
          }   
   },
   "&:hover":{
    "& .MuiListItemSecondaryAction-root": {
            visibility: "inherit"
   }        
   }}
});

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditRow : null,
            isLoading : false
        };
        this.refList = [];
    }

    componentDidMount() {
        this.props.getAllTodoItems();
    }

    //Delete Task
    handleDeleteConfirm = (todoItem) => {
        this.setState({isLoading : true})
        this.props.deleteTodoItem(todoItem.id);
        setTimeout(() => {
            this.setState({isLoading : false})
        }, 2000);

    };

    //Update Task
    handleEditConfirm = (todoItem) => {
        if(todoItem.description.trim() !== ''){
            this.props.updateTodoItem(todoItem);
            this.setState({isEditRow : null})
        }
    };

    //Get All Task
    get getTodoListDataForSelecetedTab() {
        const {allItemList } = this.props;
        return allItemList;
    }

    //Edit Row
    editThisRow = (index) => {
        this.setState({ isEditRow: index });
    }

    //Check Complete & Uncomplete Task
    changeTaskStatus = (e, item, index) => {
        e.stopPropagation()
        if (e.target.checked) {
            console.log("this.taskRef.current.classList",index)
            this.refList[index].classList.add('taskCheckAnimation')
            setTimeout(() => {
                this.refList[index].classList.remove("taskCheckAnimation");
            }, 2000);
            this.props.completeTodoItem(item.id);
        } else {
            this.refList[index].classList.add("taskUncheckAnimation");
          setTimeout(() => {
            this.refList[index].classList.remove("taskUncheckAnimation");
          }, 2000);
          this.props.unCompleteTodoItem(item.id);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <>
            {this.state.isLoading ? 
                <div className="customLoader">
                    <CircularProgress/>
                </div>
            : '' }
            <Container className={classes.container}>
                <List >
                    {this.getTodoListDataForSelecetedTab.map((item,index) => (
                    <div className={classes.listMain}  key={index + 'upperDiv'} ref={ref => (this.refList[index] = ref)}>
                    <ListItem key={index} dense button divider 
                    className={classes.listItemCustom} >
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            checked={item.completed_at ? true : false}
                            onChange={e => this.changeTaskStatus(e, item, index)}
                            className={classes.customCheckboxStyle}
                            />
                        </ListItemIcon>
                        {this.state.isEditRow == index ? 
                            <Input 
                            defaultValue={item.description}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    item.description = e.target.value;
                                    this.handleEditConfirm({"description":e.target.value, "id":item.id})
                                }
                            }}
                            /> :
                            <ListItemText 
                            id={index} 
                            style={{textDecoration: item.completed_at ? 'line-through' : ''}}
                            style={item.completed_at && { textDecoration: "line-through", color: "#828282" }}
                            primary={item.description}
                            onClick={() => this.editThisRow(index)}
                            />}
                            <ListItemSecondaryAction  className={classes.deleteButton} >
                                <IconButton edge="end" aria-label="Delete" onClick={() => this.handleDeleteConfirm(item)}>
                                <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        
                            </ListItem>
                            </div>
                    ))}
                </List>
            </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        doneList: state.todos.doneList,
        pendingList: state.todos.pendingList,
        allItemList: [...state.todos.pendingList, ...state.todos.doneList]
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getAllTodoItems: () => {
            dispatch(getAllTodoItems());
        },
        deleteTodoItem: (todoItemId) => {
            dispatch(deleteTodoItem(todoItemId));
        },
        updateTodoItem: (todoItem) => {
            dispatch(updateTodoItem(todoItem));
        },
        completeTodoItem : (todoItemId) => {
            dispatch(completeTodoItem(todoItemId));
        },
        unCompleteTodoItem : (todoItemId) => {
            dispatch(unCompleteTodoItem(todoItemId));
        }
    }
};

TodoList.propTypes = {
    classes: PropTypes.object.isRequired,
    doneList: PropTypes.array,
    pendingList: PropTypes.array,
    allItemList: PropTypes.array,
    getAllTodoItems: PropTypes.func,
    deleteTodoItem: PropTypes.func,
    updateTodoItem: PropTypes.func
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(TodoList));
