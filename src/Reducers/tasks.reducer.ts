import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTDlType, RemoveTDlType} from "./todolist.reducer";
import {TaskPriorities, TaskStatuses} from "../api/Todolists.api";


let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionSType): TasksStateType => {
    switch (action.type) {

        case 'DELETE_TASK' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)
            }
        }
        case 'ADD_TASK' : {
            return {
                ...state,
                [action.todolistID]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    addedDate: '',
                    order: 0,
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low,
                    startDate: '',
                    todoListId: action.todolistID
                }, ...state[action.todolistID]],
            }
        }
        case 'CHANGE_TASK_TITLE' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.id
                    ? {...t, title: action.title} : t)
            }
        }
        case 'CHANGE_TASK_STATUS' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.id
                    ? {...t, status: action.status} : t)
            }
        }
        case 'ADD_TODOLIST' : {
            debugger
            return {...state, [action.id]: []}
        }
        case 'REMOVE_TODOLIST' : {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }

}


type ActionSType =
    RemoveTDlType
    | addTDlType
    | deleteTaskType
    | addTaskACType
    | onChangeTitleType
    | changeTaskStatusACType


type deleteTaskType = ReturnType<typeof deleteTaskAC>

export const deleteTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'DELETE_TASK',
        todolistID,
        id: taskID
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistID: string, taskName: string) => {
    return {
        type: 'ADD_TASK',
        todolistID,
        title: taskName
    } as const
}


type onChangeTitleType = ReturnType<typeof onChangeTitleAC>

export const onChangeTitleAC = (todolistID: string, taskID: string, newTaskName: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todolistID,
        id: taskID,
        title: newTaskName
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        todolistID,
        id: taskID,
        status
    } as const
}
