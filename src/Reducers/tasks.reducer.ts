import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTDlType, RemoveTDlType, setTodolistsACType} from "./todolist.reducer";
import {ResponseTaskType, TaskPriorities, tasksAPI, TaskStatuses} from "../api/Todolists.api";
import {Dispatch} from "redux";


let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionSType): TasksStateType => {
    switch (action.type) {

        case 'DELETE_TASK' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)
            }
        }
        case 'ADD_TASK' : {
            return {
                ...state,
                [action.todoListId]: [{
                    description: '',
                    title: action.title,
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    id: v1(),
                    todoListId: action.todoListId,
                    order: 0,
                    addedDate: '',
                }, ...state[action.todoListId]],
            }
        }
        case 'CHANGE_TASK_TITLE' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.id
                    ? {...t, title: action.title} : t)
            }
        }
        case 'CHANGE_TASK_STATUS' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.id
                    ? {...t, status: action.status} : t)
            }
        }
        case 'ADD_TODOLIST' : {
            return {...state, [action.id]: []}
        }
        case 'REMOVE_TODOLIST' : {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case 'SET_TODOLISTS' : {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET_TASKS_TO_REDUX' : {
            const copyState = {...state}
            copyState[action.todolistID] = action.tasks
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
    | setTodolistsACType
    | setTasksACType


type deleteTaskType = ReturnType<typeof deleteTaskAC>

export const deleteTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'DELETE_TASK',
        todolistID,
        id: taskID
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (task: ResponseTaskType) => {
    return {
        type: 'ADD_TASK',
        todoListId: task.todoListId,
        title: task.title,
        status: task.status,
        addedDate: task.addedDate,
        deadline: task.deadline,
        description: task.description,
        order: task.order,
        priority: task.priority,
        startDate: task.startDate,
        id: task.id
    } as const
}


type onChangeTitleType = ReturnType<typeof onChangeTitleAC>

export const onChangeTitleAC = (todolistID: string, taskID: string, newTaskName: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todolistID,
        id: taskID,
        title: newTaskName
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        todolistID,
        id: taskID,
        status
    } as const
}

type setTasksACType = ReturnType<typeof setTasksAC>

export const setTasksAC = (todolistID: string, tasks: Array<ResponseTaskType>) => {
    return {
        type: 'SET_TASKS_TO_REDUX',
        todolistID,
        tasks
    } as const
}

export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistID)
        .then(res => {
                dispatch(setTasksAC(todolistID, res.data.items))
            }
        )
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
                dispatch(deleteTaskAC(todolistId, taskId))
            }
        )
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            const task = res.data.data.item
            const action = addTaskAC(task)
                dispatch(action)
            }
        )
}


