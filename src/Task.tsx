import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./OwnTodoList";

type TaskPropsType = {
    changeTaskStatus: (tID: string, isDone: boolean, tlID: string) => void
    onChangeTitle: (tID: string, newValue: string, tlID: string) => void
    deleteTask: (tID: string, tlID: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onChangeCheckedHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }, [props.changeTaskStatus, props.task.id, props.todolistId])

    const onChangeTitleHandler = useCallback( (newValue: string) => {
        props.onChangeTitle(props.todolistId, props.task.id, newValue)
    }, [props.onChangeTitle, props.todolistId, props.task.id])

    return <li key={props.task.id} className={props.task.isDone ? 'completedTask' : ''}>
        <Checkbox onChange={onChangeCheckedHandler} checked={props.task.isDone}/>
        <EditableSpan title={props.task.taskName} onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete" onClick={() => props.deleteTask(props.task.id, props.todolistId)}>
            <Delete/>
        </IconButton>
    </li>
})