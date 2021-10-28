import {todolistsAPI, TodolistType} from "../api/Todolists.api";
import {Dispatch} from "redux";
import {RequestStatusType, setAPPErrorACType, setAppStatusAC, setAppStatusACType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

let initialState: Array<TodolistDomainType> = []

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

type DispatchType = Dispatch<ActionSType | setAppStatusACType | setAPPErrorACType>


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionSType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST' : {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD_TODOLIST' : {
            return [...state, {...action.todoList, filter: 'all', entityStatus: 'idle'}]
        }
        case 'CHANGE_TDL_TITLE' : {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE_TDL_FILTER' : {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'CHANGE_TDL_ENTITY_STATUS' : {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        }
        case 'SET_TODOLISTS' : {
            return action.todolists.map(tl => {
                    return {...tl, filter: "all", entityStatus: 'idle'}
                }
            )
        }
        default:
            return state
    }
}

type ActionSType =
    RemoveTDlType
    | addTDlType
    | changeTDlTitleType
    | changeTDlFilterType
    | setTodolistsACType
    | changeTDlEntityStatusACType

export type RemoveTDlType = ReturnType<typeof removeTDlAC>

export const removeTDlAC = (todolistID: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        id: todolistID
    } as const
}

export type addTDlType = ReturnType<typeof addTDlAC>

export const addTDlAC = (todoList: TodolistType) => {
    return {
        type: 'ADD_TODOLIST',
        todoList
    } as const
}

type changeTDlTitleType = ReturnType<typeof changeTDlTitleAC>

export const changeTDlTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE_TDL_TITLE',
        id: todolistId,
        title
    } as const
}

type changeTDlFilterType = ReturnType<typeof changeTDlFilterAC>

export const changeTDlFilterAC = (filter: FilterType, tlID: string) => {
    return {
        type: 'CHANGE_TDL_FILTER',
        filter,
        id: tlID,
    } as const
}

type changeTDlEntityStatusACType = ReturnType<typeof changeTDlEntityStatusAC>

export const changeTDlEntityStatusAC = (status: RequestStatusType, tlID: string) => {
    return {
        type: 'CHANGE_TDL_ENTITY_STATUS',
        status,
        id: tlID,
    } as const
}

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: 'SET_TODOLISTS',
        todolists,
    } as const
}

export const getTodolistsTC = () => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTDLists()
        .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistsTC = (todolistId: string) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTDlEntityStatusAC('loading', todolistId))
    todolistsAPI.deleteTDLists(todolistId)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTDlAC(todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTodolistTC = (title: string) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTDLists(title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTDlAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTDLists(todolistId, title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTDlTitleAC(todolistId, title))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}





