import {stateType} from "../App";



export const tasksReducer = (state: stateType, action: ActionSType): stateType => {
    switch (action.type) {
        case 'DELETE_TASK' : {
            return {...state}
        }
        case 'ADD_TASK' : {
            return {...state}
        }
        case 'CHANGE_TASK_TITLE' : {
            return {...state}
        }
        case 'CHANGE_TASK_STATUS' : {
            return {...state}
        }
        default:
            return state
    }

}


type ActionSType = deleteTaskType | addTaskACType | onChangeTitleType | changeTaskStatusACType


type deleteTaskType = ReturnType<typeof deleteTaskAC>

export const deleteTaskAC = () => {
    return {
        type: 'DELETE_TASK',

    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = () => {
    return {
        type: 'ADD_TASK',

    } as const
}


type onChangeTitleType = ReturnType<typeof onChangeTitleAC>

export const onChangeTitleAC = () => {
    return {
        type: 'CHANGE_TASK_TITLE',

    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = () => {
    return {
        type: 'CHANGE_TASK_STATUS',

    } as const
}
