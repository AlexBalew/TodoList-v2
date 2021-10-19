import {v1} from "uuid";
import {TodolistType} from "../api/Todolists.api";


let initialState: Array<TodolistDomainType> = []

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionSType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST' : {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD_TODOLIST' : {
            debugger
            return [...state, {
                id: action.id,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }]
        }
        case 'CHANGE_TDL_TITLE' : {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE_TDL_FILTER' : {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        default:
            return state
    }

}


type ActionSType = RemoveTDlType | addTDlType | changeTDlTitleType | changeTDlFilterType


export type RemoveTDlType = ReturnType<typeof removeTDlAC>

export const removeTDlAC = (todolistID: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        id: todolistID
    } as const
}

export type addTDlType = ReturnType<typeof addTDlAC>

export const addTDlAC = (title: string) => {
    debugger
    return {
        type: 'ADD_TODOLIST',
        id: v1(),
        title
    } as const
}


type changeTDlTitleType = ReturnType<typeof changeTDlTitleAC>

export const changeTDlTitleAC = (todolistID: string, todoListTitle: string) => {
    return {
        type: 'CHANGE_TDL_TITLE',
        id: todolistID,
        title: todoListTitle
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



