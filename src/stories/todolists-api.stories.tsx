import {useEffect, useState} from "react";
import {tasksAPI, todolistsAPI} from "../api/Todolists.api";


export default {
    title: 'API'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTDLists()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.createTDLists('ARRRRRR')
            .then((res) => {
                setState(res.data.data.item)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>

}

export const DeleteTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.deleteTDLists('fb738972-0836-4577-b0b6-8d3d0041aeac')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.updateTDLists('8e8d5276-7c5e-4318-b9ff-63dc377a5c48', 'POMODORO!!!')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        tasksAPI.getTasks('7b808f03-58c9-4db8-8972-e219d67bad19')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        tasksAPI.createTask('7b808f03-58c9-4db8-8972-e219d67bad19', 'yoyoyoy')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}