import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {FilterType} from "./Reducers/todolist.reducer";
import {ResponseTaskEntityType, TaskStatuses} from "./api/Todolists.api";


export type ToDoListPropsType = {
    tasks: Array<ResponseTaskEntityType>
    deleteTask: (tID: string, tlID: string) => void
    changeFilter: (filter: FilterType, tlID: string) => void
    addTask: (newTaskTitle: string, tlID: string) => void
    filter: FilterType
    changeTaskStatus: (tlID: string, tID: string, status: TaskStatuses) => void
    title: string
    id: string
    removeTDFunc: (tlID: string) => void
    onChangeTitle: (tID: string, newValue: string, tlID: string) => void
    changeTDListTitleAPP: (newTitle: string, tlID: string) => void
}


export const OwnTodoList = React.memo((props: ToDoListPropsType) => {

    console.log('Todolist rendered')

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
        tasksForTDList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTDList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
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
                    {
                        tasksForTDList.map(t => <Task key={t.id}
                                                                 task={t}
                                                                 deleteTask={props.deleteTask}
                                                                 changeTaskStatus={props.changeTaskStatus}
                                                                 onChangeTitle={props.onChangeTitle}
                                                                 todolistId={props.id} />)
                    }
                </ul>
                <Button color={props.filter === 'all' ? 'secondary' : 'primary'}
                        variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={allFilter}
                        size={"small"}>All</Button>
                <Button color={props.filter === 'active' ? 'secondary' : 'primary'}
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={activeFilter}
                        size={"small"}>Active</Button>
                <Button color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={completedFilter}
                        size={"small"}>Completed</Button>
            </div>
        </div>
    )
})


