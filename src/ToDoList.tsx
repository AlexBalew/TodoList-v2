import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

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
    removeTodoList: (tlID: string)=>void
}

export function ToDoList(props: ToDoListPropsType) {

    const newTasks = props.tasks.map(t => {

        const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.checkChanging(t.id, e.currentTarget.checked, props.tlID)}

       return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
           <input type="checkbox" onChange={onChangeCheckHandler} checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={() => props.deleteTask(t.id, props.tlID)}>X</button>
    </li>})

    const AllFilter = () => {props.changeFilter('All', props.tlID)}
    const ActiveFilter = () => {props.changeFilter('Active', props.tlID)}
    const CompletedFilter = () => {props.changeFilter('Completed', props.tlID)}
    const removeTodoList = () => {props.removeTodoList(props.tlID)}
    const addTask = (title: string) => {props.addTask(title, props.tlID)}


    return <div>
        <h3>{props.listTitle}<button onClick={removeTodoList}>x</button></h3>
        <AddItemForm addItem={addTask} />
        <ul>
            {newTasks}
        </ul>
        <div>
            <button onClick={AllFilter} className={props.filter === 'All' ? 'active-filter-type' : ''}>All</button>
            <button onClick={ActiveFilter} className={props.filter === 'Active' ? 'active-filter-type' : ''}>Active</button>
            <button onClick={CompletedFilter} className={props.filter === 'Completed' ? 'active-filter-type' : ''}>Completed</button>
        </div>
    </div>
}




