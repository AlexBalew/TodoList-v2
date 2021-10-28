import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {ResponseTaskType, TaskStatuses} from "../../api/Todolists.api";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistDomainType} from "../../Reducers/todolist.reducer";


type TaskPropsType = {
    changeTaskStatus: (tlID: string, tID: string, status: TaskStatuses) => void
    onChangeTaskTitle: (tlID: string, tID: string, newTitle: string) => void
    deleteTask: (tlID: string, tID: string) => void
    task: ResponseTaskType
    todolistId: string
    todolist: TodolistDomainType
}
export const Task = React.memo((props: TaskPropsType) => {

    const onChangeCheckedHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props.changeTaskStatus, props.task.id, props.todolistId])

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.onChangeTaskTitle(props.todolistId, props.task.id, newTitle)
    }, [props.todolistId, props.task.id, props.onChangeTaskTitle])

    return <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'completedTask' : ''}>
        <Checkbox onChange={onChangeCheckedHandler} checked={props.task.status === TaskStatuses.Completed}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} todolist={props.todolist}/>
        <IconButton aria-label="delete" onClick={() => props.deleteTask(props.todolistId, props.task.id)} disabled={props.todolist.entityStatus === 'loading'}>
            <Delete/>
        </IconButton>
    </li>
})