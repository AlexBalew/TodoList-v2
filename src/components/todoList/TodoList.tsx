import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {Task} from "../task/Task";
import {FilterType, TodolistDomainType} from "../../Reducers/todolist.reducer";
import {ResponseTaskType, TaskStatuses} from "../../api/Todolists.api";
import {useDispatch} from "react-redux";
import {getTasksTC} from "../../Reducers/tasks.reducer";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


export type ToDoListPropsType = {
    todolist: TodolistDomainType
    tasks: Array<ResponseTaskType>
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (filter: FilterType, tlID: string) => void
    addTask: (tlID: string, newTaskTitle: string) => void
    changeTaskStatus: (tlID: string, tID: string, status: TaskStatuses) => void
    removeTDFunc: (tlID: string) => void
    onChangeTaskTitle: (tlID: string, tID: string, newTitle: string) => void
    changeTDListTitleAPP: (newTitle: string, tlID: string) => void
    demo?: boolean
}


export const TodoList = React.memo((props: ToDoListPropsType) => {

    console.log('Todolist rendered')

    const dispatch = useDispatch()

    useEffect(() => {
        if (props.demo) {
            return
        }
        dispatch(getTasksTC(props.todolist.id))
    }, [])

    const allFilter = useCallback(() => {
        props.changeFilter('all', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const activeFilter = useCallback(() => {
        props.changeFilter('active', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const completedFilter = useCallback(() => {
        props.changeFilter('completed', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])

    const removeTDButton = () => {
        props.removeTDFunc(props.todolist.id)
    }

    const ChangeTDListTitle = useCallback((newTitle: string) => {
        props.changeTDListTitleAPP(props.todolist.id, newTitle)
    }, [props.changeTDListTitleAPP, props.todolist.id])

    const addTaskBridge = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])


    let tasksForTDList = props.tasks
    if (props.todolist.filter === 'active') {
        tasksForTDList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTDList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={ChangeTDListTitle} todolist={props.todolist}/>
                <IconButton aria-label="delete" onClick={removeTDButton}
                            disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskBridge} disabled={props.todolist.entityStatus === 'loading'}/>

            <div>
                <ul style={{listStyle: 'none', paddingLeft: 0}}>
                    {
                        tasksForTDList.map(t => <Task key={t.id}
                                                      task={t}
                                                      deleteTask={props.deleteTask}
                                                      changeTaskStatus={props.changeTaskStatus}
                                                      onChangeTaskTitle={props.onChangeTaskTitle}
                                                      todolistId={props.todolist.id}
                                                      todolist={props.todolist}
                        />)
                    }
                </ul>
                <Button color={props.todolist.filter === 'all' ? 'secondary' : 'primary'}
                        variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                        onClick={allFilter}
                        size={"small"}>All</Button>
                <Button color={props.todolist.filter === 'active' ? 'secondary' : 'primary'}
                        variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                        onClick={activeFilter}
                        size={"small"}>Active</Button>
                <Button color={props.todolist.filter === 'completed' ? 'secondary' : 'primary'}
                        variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={completedFilter}
                        size={"small"}>Completed</Button>
            </div>
        </div>
    )
})


