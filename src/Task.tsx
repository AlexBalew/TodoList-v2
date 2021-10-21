import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {ResponseTaskType, TaskStatuses} from "./api/Todolists.api";


type TaskPropsType = {
    changeTaskStatus: (tlID: string, tID: string, status: TaskStatuses) => void
    onChangeTitle: (tID: string, newValue: string, tlID: string) => void
    deleteTask: (tlID: string, tID: string) => void
    task: ResponseTaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onChangeCheckedHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props.changeTaskStatus, props.task.id, props.todolistId])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.onChangeTitle(props.todolistId, props.task.id, newValue)
    }, [props.onChangeTitle, props.todolistId, props.task.id])

    return <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'completedTask' : ''}>
        <Checkbox onChange={onChangeCheckedHandler} checked={props.task.status === TaskStatuses.Completed}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete" onClick={() => props.deleteTask(props.todolistId, props.task.id)}>
            <Delete/>
        </IconButton>
    </li>
})