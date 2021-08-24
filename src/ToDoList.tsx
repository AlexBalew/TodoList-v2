import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type ToDoListPropsType = {
    tlID: string
    listTitle: string
    tasks: Array<TaskType>
    deleteTask: (tID: string, tlID: string) => void
    changeFilter: (filter: FilterValuesType, tlID: string) => void
    addTask: (title: string, tlID: string) => void
    checkChanging: (taskID: string, isDone: boolean, tlID: string) => void
    filter: 'All' | 'Active' | 'Completed'
    removeTodoList: (tlID: string) => void
    checkTitleChanging:(id: string, newValue: string , tlID: string) => void
    onChangeTDTitle:(newTDTitle: string , tlID: string)=>void
}

export function ToDoList(props: ToDoListPropsType) {

    const newTasks = props.tasks.map(t => {

        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.checkChanging(t.id, e.currentTarget.checked, props.tlID)
        }

        const onChangeTitleHandler = (newValue: string) => {
            props.checkTitleChanging(t.id, newValue , props.tlID)
        }

        return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
            <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
            <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
            <button onClick={() => props.deleteTask(t.id, props.tlID)}>X</button>
        </li>
    })

    const AllFilter = () => {
        props.changeFilter('All', props.tlID)
    }
    const ActiveFilter = () => {
        props.changeFilter('Active', props.tlID)
    }
    const CompletedFilter = () => {
        props.changeFilter('Completed', props.tlID)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.tlID)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.tlID)
    }

    const onChangeTDTitleHandler = (newTDTitle: string) => {
        props.onChangeTDTitle(newTDTitle , props.tlID)
    }

    return <div>
        <h3><EditableSpan title={props.listTitle} onChange={onChangeTDTitleHandler} />
            <button onClick={removeTodoList}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {newTasks}
        </ul>
        <div>
            <button onClick={AllFilter} className={props.filter === 'All' ? 'active-filter-type' : ''}>All</button>
            <button onClick={ActiveFilter} className={props.filter === 'Active' ? 'active-filter-type' : ''}>Active
            </button>
            <button onClick={CompletedFilter}
                    className={props.filter === 'Completed' ? 'active-filter-type' : ''}>Completed
            </button>
        </div>
    </div>
}


