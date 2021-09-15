import {v1} from "uuid";
import {FilterType, todoListsType} from "../App";
import {addTDlAC, changeTDlFilterAC, changeTDlTitleAC, RemoveTDlAC, todolistsReducer} from "./todolist.reducer";

test('exact todolist should be removed', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let todolistID4 = v1()

    const startState: todoListsType = [
        {todolistID: todolistID1, todoListTitle: 'Affairs', filter: 'all'},
        {todolistID: todolistID2, todoListTitle: 'Music', filter: 'all'},
        {todolistID: todolistID3, todoListTitle: 'Movies', filter: 'all'},
        {todolistID: todolistID4, todoListTitle: 'TDList', filter: 'all'},
    ]

    const finalState = todolistsReducer(startState, RemoveTDlAC(todolistID1))

    expect(finalState.length).toBe(3)
    expect(finalState[0].todolistID).toBe(todolistID2)

})

test('exact todolist should be added', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let todolistID4 = v1()

    let newTodoListTitle = 'New SOW'

    const startState: todoListsType = [
        {todolistID: todolistID1, todoListTitle: 'Affairs', filter: 'all'},
        {todolistID: todolistID2, todoListTitle: 'Music', filter: 'all'},
        {todolistID: todolistID3, todoListTitle: 'Movies', filter: 'all'},
        {todolistID: todolistID4, todoListTitle: 'TDList', filter: 'all'},
    ]

    const finalState = todolistsReducer(startState, addTDlAC(newTodoListTitle))

    expect(finalState.length).toBe(5)
    expect(finalState[4].todoListTitle).toBe(newTodoListTitle)
})

test('exact todolists title should be changed', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let todolistID4 = v1()

    let newTodoListTitle = 'New SOW'

    const startState: todoListsType = [
        {todolistID: todolistID1, todoListTitle: 'Affairs', filter: 'all'},
        {todolistID: todolistID2, todoListTitle: 'Music', filter: 'all'},
        {todolistID: todolistID3, todoListTitle: 'Movies', filter: 'all'},
        {todolistID: todolistID4, todoListTitle: 'TDList', filter: 'all'},
    ]

    const finalState = todolistsReducer(startState, changeTDlTitleAC(todolistID3, newTodoListTitle))

    expect(finalState[2].todoListTitle).toBe('New SOW')
    expect(finalState[3].todoListTitle).toBe('TDList')
})

test('exact todolists filter value should be changed', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let todolistID4 = v1()

    let newFilterValue: FilterType = 'completed'

    const startState: todoListsType = [
        {todolistID: todolistID1, todoListTitle: 'Affairs', filter: 'all'},
        {todolistID: todolistID2, todoListTitle: 'Music', filter: 'all'},
        {todolistID: todolistID3, todoListTitle: 'Movies', filter: 'all'},
        {todolistID: todolistID4, todoListTitle: 'TDList', filter: 'all'},
    ]

    const finalState = todolistsReducer(startState, changeTDlFilterAC(todolistID1, newFilterValue))

    expect(finalState[2].filter).toBe('all')
    expect(finalState[0].filter).toBe('completed')
    expect(finalState[1].filter).toBe('all')
})
