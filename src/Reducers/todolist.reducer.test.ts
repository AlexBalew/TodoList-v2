import {v1} from "uuid";
import {TodoListsType} from "../App";
import {
    addTDlAC,
    changeTDlFilterAC,
    changeTDlTitleAC,
    FilterType,
    removeTDlAC,
    setTodolistsAC,
    todolistsReducer
} from "./todolist.reducer";

let todolistID1: string
let todolistID2: string
let todolistID3: string
let todolistID4: string
let startState: TodoListsType

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    todolistID3 = v1()
    todolistID4 = v1()

    startState = [
        {id: todolistID1, title: 'Affairs', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'Music', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID3, title: 'Movies', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID4, title: 'TDList', filter: 'active', order: 0, addedDate: ''},
    ]
})

test('exact todolist should be removed', () => {

    const finalState = todolistsReducer(startState, removeTDlAC(todolistID4))

    expect(finalState.length).toBe(3)
    expect(finalState[1].id).toBe(todolistID2)
})

test('exact todolist should be added', () => {

    let newTodoListTitle = 'New SOW'

    const finalState = todolistsReducer(startState, addTDlAC({id: '2', title: newTodoListTitle, order: 0, addedDate: ''}))

    expect(finalState.length).toBe(5)
    expect(finalState[4].title).toBe(newTodoListTitle)
})

test('exact todolists title should be changed', () => {

    const finalState = todolistsReducer(startState, changeTDlTitleAC(todolistID3, 'New SOW'))

    expect(finalState[2].title).toBe('New SOW')
    expect(finalState[3].title).toBe('TDList')
})

test('exact todolists filter value should be changed', () => {

    let newFilterValue: FilterType = 'completed'

    const finalState = todolistsReducer(startState, changeTDlFilterAC(newFilterValue, todolistID1))

    expect(finalState[2].filter).toBe('all')
    expect(finalState[0].filter).toBe('completed')
    expect(finalState[1].filter).toBe('all')
})

test('todolists should be set', () => {

    const finalState = todolistsReducer([], setTodolistsAC(startState))

    expect(finalState.length).toBe(4)
    expect(finalState[1].filter).toBe('all')
    expect(finalState[0].title).toBe('Affairs')
    expect(finalState[2].id).toBe(todolistID3)
    expect(finalState[3].filter).toBe('all')
})
