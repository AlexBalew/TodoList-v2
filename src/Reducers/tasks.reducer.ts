import {stateType} from "../App";
import {v1} from "uuid";


export const tasksReducer = (state: stateType, action: ActionSType): stateType => {
    switch (action.type) {
        case 'DELETE_TASK' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)
            }
            //return state[action.todolistID].filter(t => t.id !== action.id)
        }
        case 'ADD_TASK' : {
            return {
                ...state,
                [action.todolistID]: [{
                    id: v1(),
                    taskName: action.taskName,
                    isDone: false
                }, ...state[action.todolistID]],
            }
        }
        case 'CHANGE_TASK_TITLE' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.id
                    ? {...t, taskName: action.newTaskName} : t)
            }
        }
        case 'CHANGE_TASK_STATUS' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.id
                    ? {...t, isDone: action.isDone} : t)
            }
        }
        default:
            return state
    }

}


type ActionSType = deleteTaskType | addTaskACType | onChangeTitleType | changeTaskStatusACType


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
        taskName
    } as const
}


type onChangeTitleType = ReturnType<typeof onChangeTitleAC>

export const onChangeTitleAC = (todolistID: string, taskID: string, newTaskName: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todolistID,
        id: taskID,
        newTaskName
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        todolistID,
        id: taskID,
        isDone
    } as const
}
