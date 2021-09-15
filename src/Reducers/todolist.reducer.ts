import {FilterType, todoListsType} from "../App";
import {v1} from "uuid";


export const todolistsReducer = (state: todoListsType, action: ActionSType): todoListsType => {
    switch (action.type) {
        case 'REMOVE_TODOLIST' : {
            return state.filter(tl => tl.todolistID !== action.id)
        }
        case 'ADD_TODOLIST' : {
            return [...state, {
                todolistID: action.todolistId,
                todoListTitle: action.todoListTitle,
                filter: 'all'
            }]
        }
        case 'CHANGE_TDL_TITLE' : {
            return state.map(tl => tl.todolistID === action.id ? {...tl, todoListTitle: action.title} : tl)
        }
        case 'CHANGE_TDL_FILTER' : {
            return state.map(tl => tl.todolistID === action.id ? {...tl, filter: action.filter} : tl)
        }
        default:
            return state
    }

}


type ActionSType = RemoveTDlType | addTDlType | changeTDlTitleType | changeTDlFilterType


export type RemoveTDlType = ReturnType<typeof RemoveTDlAC>

export const RemoveTDlAC = (todolistID: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        id: todolistID
    } as const
}

export type addTDlType = ReturnType<typeof addTDlAC>

export const addTDlAC = (todoListTitle: string) => {
    return {
        type: 'ADD_TODOLIST',
        todoListTitle,
        todolistId: v1()
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

export const changeTDlFilterAC = (todolistID: string, filter: FilterType) => {
    return {
        type: 'CHANGE_TDL_FILTER',
        id: todolistID,
        filter
    } as const
}
