import {stateType} from "../App";
import {v1} from "uuid";
import {addTDlType, RemoveTDlType, todolistID1, todolistID2, todolistID3, todolistID4} from "./todolist.reducer";


let initialState: stateType = {
    [todolistID1]: [
        {id: v1(), taskName: 'sleep', isDone: true},
        {id: v1(), taskName: 'drink', isDone: false},
        {id: v1(), taskName: 'rave', isDone: false},
        {id: v1(), taskName: 'repeat', isDone: true},
    ],
    [todolistID2]: [
        {id: v1(), taskName: 'Metallica', isDone: true},
        {id: v1(), taskName: 'Neuro', isDone: false},
        {id: v1(), taskName: 'Ghost', isDone: false},
        {id: v1(), taskName: 'Liquid', isDone: true},
    ],
    [todolistID3]: [
        {id: v1(), taskName: 'Seven', isDone: true},
        {id: v1(), taskName: 'Night', isDone: false},
        {id: v1(), taskName: 'Family Guy', isDone: false},
        {id: v1(), taskName: 'South Park', isDone: true}
    ],
    [todolistID4]: [
        {id: v1(), taskName: 'Train UseStyles', isDone: false},
        {id: v1(), taskName: 'Find out how to set up A background theme', isDone: false},
        {id: v1(), taskName: 'Create own custom style for + buttons', isDone: false},
        {id: v1(), taskName: 'Push it to GitHub', isDone: false}
    ],
}

export const tasksReducer = (state: stateType = initialState, action: ActionSType): stateType => {
    switch (action.type) {
        case 'DELETE_TASK' : {
            debugger
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
        case 'ADD_TODOLIST' : {
            return {...state, [action.todolistId]: []}
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
