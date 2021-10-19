import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../Reducers/todolist.reducer";
import {tasksReducer} from "../Reducers/tasks.reducer";

export type MainReducerType = ReturnType<typeof mainReducer>

let mainReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
})

export let store = createStore(mainReducer)

// @ts-ignore
window.store = store