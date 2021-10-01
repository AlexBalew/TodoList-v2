import React, {useCallback} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


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


export const OwnTodoList = React.memo((props: ToDoListPropsType) => {

    console.log('Todolist rendered')

    let mappedTasksFromAllTasks = props.tasks.map(t => <Task key={t.id}
                                                             task={t}
                                                             deleteTask={props.deleteTask}
                                                             changeTaskStatus={props.changeTaskStatus}
                                                             onChangeTitle={props.onChangeTitle}
                                                             todolistId={props.id} />)

    const allFilter = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const activeFilter = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])
    const completedFilter = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id])

    const removeTDButton = () => {
        props.removeTDFunc(props.id)
    }

    const ChangeTDListTitle = useCallback( (newTitle: string) => {
        props.changeTDListTitleAPP(props.id, newTitle)
    }, [props.changeTDListTitleAPP, props.id])

    const addTaskBridge = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])


    let tasksForTDList = props.tasks
    if (props.filter === 'active') {
        tasksForTDList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTDList = props.tasks.filter(t => t.isDone)
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
})


