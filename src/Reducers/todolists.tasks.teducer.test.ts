import {stateType, todoListsType} from "../App";
import {addTDlAC, todolistsReducer} from "./todolist.reducer";
import {tasksReducer} from "./tasks.reducer";


test('ids should be equals', () => {
    const startTasksState: stateType = {};
    const startTodolistsState: todoListsType = [];

    const action = addTDlAC("new affairs");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].todolistID;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});