import {HttpClient} from './httpClient' 

// This is the API. The backend root URL can be set from here.

const API = 'https://tiny-list.herokuapp.com/api/v1/'

//Setting the todos URI
const USERID = '107'
const CREATE_TODO = `${API}/users/${USERID}/tasks`
// The CRUD Operations of the Todo Resource.


//Create
const createTodo = todo => {
    return HttpClient.post(CREATE_TODO, todo)
}

//Read
const getTodo = () => {
    return HttpClient.get(CREATE_TODO)
}

//Update
const updateTodo = (id,todo) => {
    return HttpClient.put(`${CREATE_TODO}/${id}`, todo)
}

//Delete
const removeTodo = todo => {
    return HttpClient.delete(`${CREATE_TODO}/${todo}`)
}

//Complete
const completeTodo = (todo) => {
    return HttpClient.put(`${CREATE_TODO}/${todo}/completed`)
}

//Uncomplete
const uncompleteTodo = (todo) => {
    return HttpClient.put(`${CREATE_TODO}/${todo}/uncompleted`)
}

//Encapsulating in a JSON object

const TodoApi = {createTodo, getTodo, updateTodo, removeTodo,completeTodo,uncompleteTodo}

export {TodoApi}