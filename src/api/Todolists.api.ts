import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {'API-KEY': 'ae005362-3cd1-4901-a9c5-790f2698eec1'},
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

/*type CreateTDListResType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}

type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}

type DeleteTodolistResponseType = { ///all types in generic one
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}*/

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

/*
export type TasksResponseType = {
    items: Array<Task>
    Items: {
        description: string
        title: string
        completed: boolean
        status: number
        priority: number
        startDate: string
        deadline: string
        id: string
        todoListId: string
        order: number
        addedDate: string
    }
    totalCount: number
    error: (string)
}
*/


export const todolistsAPI = {
    getTDLists() {
        return instance.get<Array<TodolistType>>("todo-lists",)
    },
    createTDLists(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title})
    },
    deleteTDLists(todolistId: string) {
        return instance.delete<ResponseType<{}> | []>(`todo-lists/${todolistId}`)
    },
    updateTDLists(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}`, {title})
    }
}