import {FilterType, todoListsType} from "../App";
import {v1} from "uuid";

export let todolistID1 = v1()
export let todolistID2 = v1()
export let todolistID3 = v1()
export let todolistID4 = v1()

let initialState: todoListsType = [
    {todolistID: todolistID1, todoListTitle: 'Affairs', filter: 'all'},
    {todolistID: todolistID2, todoListTitle: 'Music', filter: 'all'},
    {todolistID: todolistID3, todoListTitle: 'Movies', filter: 'all'},
    {todolistID: todolistID4, todoListTitle: 'TDList', filter: 'all'},
]

export const todolistsReducer = (state: todoListsType = initialState, action: ActionSType): todoListsType => {
    switch (action.type) {
        case 'REMOVE_TODOLIST' : {
            return state.filter(tl => tl.todolistID !== action.id)
        }
        case 'ADD_TODOLIST' : {
            return [...state, {
                todolistID: action.todolistID,
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


export type RemoveTDlType = ReturnType<typeof removeTDlAC>

export const removeTDlAC = (todolistID: string) => {
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
        todolistID: v1()
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
