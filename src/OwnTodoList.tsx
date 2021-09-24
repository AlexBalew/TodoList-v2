import React, {ChangeEvent} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TaskType = {
    id: string
    taskName: string
    isDone: boolean
}

export type ToDoListPropsType = {
    tasks: Array<TaskType>
    deleteTask: (tID: string, tlID: string) => void
    changeFilter: (filter: FilterType, tlID: string) => void
    addTask: (newTaskTitle: string, tlID: string) => void
    filter: FilterType
    changeTaskStatus: (tID: string, isDone: boolean, tlID: string) => void
    title: string
    id: string
    removeTDFunc: (tlID: string) => void
    onChangeTitle: (tID: string, newValue: string, tlID: string) => void
    changeTDListTitleAPP: (newTitle: string, tlID: string) => void
}


export function OwnTodoList(props: ToDoListPropsType) {


    let mappedTasksFromAllTasks = props.tasks.map(t => {

        const onChangeCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        }

        const onChangeTitleHandler = (newValue: string) => {
            props.onChangeTitle(props.id, t.id, newValue)
        }

        return <li key={t.id} className={t.isDone ? 'completedTask' : ''}>
            <Checkbox onChange={onChangeCheckedHandler} checked={t.isDone}/>
            <EditableSpan title={t.taskName} onChange={onChangeTitleHandler}/>
            <IconButton aria-label="delete" onClick={() => props.deleteTask(t.id, props.id)}>
                <Delete/>
            </IconButton>
        </li>
    })

    const allFilter = () => {
        props.changeFilter('all', props.id)
    }
    const activeFilter = () => {
        props.changeFilter('active', props.id)
    }
    const completedFilter = () => {
        props.changeFilter('completed', props.id)
    }

    const removeTDButton = () => {
        props.removeTDFunc(props.id)
    }

    const ChangeTDListTitle = (newTitle: string) => {
        props.changeTDListTitleAPP(props.id, newTitle)
    }

    const addTaskBridge = (title: string) => {
        props.addTask(props.id, title)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={ChangeTDListTitle}/>
                <IconButton aria-label="delete" onClick={removeTDButton}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskBridge}/>

            <div>
                <ul>
                    {mappedTasksFromAllTasks}
                </ul>
                <Button color={'default'}
                        variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={allFilter}
                        size={"small"}>All</Button>
                <Button color={'default'}
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={activeFilter}
                        size={"small"}>Active</Button>
                <Button color={'default'}
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={completedFilter}
                        size={"small"}>Completed</Button>
            </div>
        </div>
    )
}

