import {TasksStateType, TodoListsType} from "../App";
import {addTDlAC, todolistsReducer} from "./todolist.reducer";
import {tasksReducer} from "./tasks.reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodoListsType = [];

    const action = addTDlAC("new affairs");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
});