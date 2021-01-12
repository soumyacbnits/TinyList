import {TodoApi} from '../../api/todoApi'

export const createTodoItem = (todoItem) => {
    const data = {
        "task": {
            "description": todoItem.task
        }
    }
    return async dispatch => {
        TodoApi.createTodo(data)
            .then(res => {
                return res
            })
            .then(result => {
                if (result.status == '201') {
                    dispatch(getAllTodoItems());
                }
                else {
                    console.log('an error occured in create todo', result.statusText);
                }
            })
            .catch(error => {
                console.error("createTodoItem ", error);
            });
    }
}

export const getAllTodoItems = () => {
    return async dispatch => {
        await TodoApi.getTodo()
            .then(res => { return res })
            .then(result => {
                result.data.sort((a,b) => {return new Date(b.created_at) - new Date(a.created_at)})
                result.data.sort((a,b) => {
                    var va = (a.completed_at === null) ? "" : "" + a.completed_at,
                        vb = (b.completed_at === null) ? "" : "" + b.completed_at;
                    return va > vb ? 1 : ( va === vb ? 0 : -1 );
                })
                if (result.status == '200') {
                    dispatch(setTodoItemLists(result.data));

                } else {
                    console.log('an error occured ', result.statusText);
                }
            })
            .catch(error => {
                console.error("getAllTodoItems ", error);
            });
    }
}

export const updateTodoItem = (todoItem) => {
    const data = {
        "task": {
            "description": todoItem.description
        }
    }
    return async dispatch => {
        TodoApi.updateTodo(todoItem.id,data)
            .then(res => { return res })

            .then(result => {
                if (result.statusText) {
                    dispatch(getAllTodoItems());
                }
                else {
                    console.log('an error occured in update todo', result.statusText);
                }
            })
            .catch(error => {
                console.error("updateTodoItem ", error);
            });
    }
}

export const completeTodoItem = (todoItem) => {
    return async dispatch => {
        TodoApi.completeTodo(todoItem)
            .then(res => { return res })

            .then(result => {
                if (result.statusText) {
                    dispatch(getAllTodoItems());
                }
                else {
                    console.log('an error occured in update todo', result.statusText);
                }
            })
            .catch(error => {
                console.error("updateTodoItem ", error);
            });
    }
}

export const unCompleteTodoItem = (todoItem) => {
    return async dispatch => {
        TodoApi.uncompleteTodo(todoItem)
            .then(res => { return res })
            .then(result => {
                if (result.statusText) {
                    dispatch(getAllTodoItems());
                }
                else {
                    console.log('an error occured in update todo', result.statusText);
                }
            })
            .catch(error => {
                console.error("updateTodoItem ", error);
            });
    }
}

export const deleteTodoItem = (todoItemId) => {
    return async dispatch => {
        TodoApi.removeTodo(todoItemId)
            .then(res => { return res })
            .then(result => {
                if (result.status == '204') {
                    dispatch(getAllTodoItems());
                    dispatch(handleDeleteModelClose());
                } else {
                    console.log('an error occured in delte todo', result.statusText);
                }
            })
            .catch(error => {
                console.error("deleteTodoItem ", error);
            });
    }
}

const setTodoItemLists = (todoitemList) => {
    return {
        type: 'GET_ALL_TODOS',
        todoitemList
    };
}

export const setSelectedTodoForEditing = (todoItem) => {
    return {
        type: 'SET_SELECTED_TODO_FOR_EDITING',
        todoItem
    }
}

export const setSelectedTabName = (tabName) => {
    return {
        type: 'SET_TAB_NAME',
        tabName
    };
}

export const clearSelecteedTodoForEditing = () => {
    return {
        type: 'CLEAR_SELECTED_TODO_FOR_EDITING',
    };
}

export const handleDeleteModelClose = () => {
    return {
        type: 'HANDLE_DELETE_MODEL_CLOSE',
    };
}
