import {TasksStateType} from "../components/app/App";
import {addTDlType, RemoveTDlType, setTodolistsACType} from "./todolist.reducer";
import {ResponseTaskType, tasksAPI, TaskStatuses} from "../api/Todolists.api";
import {Dispatch} from "redux";
import {MainReducerType} from "../store/store";
import {setAppStatusAC, setAppStatusACType, setAppErrorAC, setErrorACType} from "./app-reducer";


let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionSType): TasksStateType => {
    switch (action.type) {

        case 'DELETE_TASK' : {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
            }
        }
        case 'ADD_TASK' : {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
            }
        }
        case 'CHANGE_TASK_TITLE' : {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id
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
            return {...state, [action.todoList.id]: []}
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

type DispatchType = Dispatch<ActionSType | setAppStatusACType | setErrorACType>

type deleteTaskType = ReturnType<typeof deleteTaskAC>

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'DELETE_TASK',
        todolistId,
        id: taskId
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (task: ResponseTaskType) => {
    return {
        type: 'ADD_TASK',
        task
    } as const
}


type onChangeTitleType = ReturnType<typeof onChangeTaskTitleAC>

export const onChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todolistId,
        id: taskId,
        title
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

export const getTasksTC = (todolistID: string) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistID)
        .then(res => {
                dispatch(setTasksAC(todolistID, res.data.items))
                dispatch(setAppStatusAC('succeeded'))
            }
        )
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.deleteTask(todolistId, taskId)
        .then((res) => {
                dispatch(deleteTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC('succeeded'))
            }
        )
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todolistId, title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTaskAC(task)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('some error has occurred'))
                    }
                    dispatch(setAppStatusAC('failed'))
                }
            }
        )
}

export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: DispatchType, getState: () => MainReducerType) => {
        dispatch(setAppStatusAC('loading'))

        /* const allTasksFromState = getState().tasks; //подробная запись
         const tasksForCurrentTodolist = allTasksFromState[todolistId]
         const task = tasksForCurrentTodolist.find(t => {
             return t.id === taskId
         })*/

        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            })
                .then((res) => {
                        dispatch(changeTaskStatusAC(todolistId, taskId, status))
                        dispatch(setAppStatusAC('succeeded'))
                    }
                )
        }
    }

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: DispatchType, getState: () => MainReducerType) => {
        dispatch(setAppStatusAC('loading'))

        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            })
                .then((res) => {
                        dispatch(onChangeTaskTitleAC(todolistId, taskId, title))
                        dispatch(setAppStatusAC('succeeded'))
                    }
                )
        }
    }