import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


 ///test
export type ToDoListPropsType = {
    listTitle: string
    tasks: Array<TaskType>
    deleteTask: (tID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    checkChanging: (taskID: string, isDone: boolean) => void
    filter: 'All' | 'Active' | 'Completed'
}

export function ToDoList(props: ToDoListPropsType) {

    const [title, setTitle] = useState('')

    const [error, setError] = useState('')

    const newTasks = props.tasks.map(t => {

        const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.checkChanging(t.id, e.currentTarget.checked)}

       return <li key={t.id} className={t.isDone ? 'isDone' : ''}><input type="checkbox" onChange={onChangeCheckHandler} checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={() => props.deleteTask(t.id)}>X</button>
    </li>})




const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}
const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
    if(e.key === 'Enter' && title.trim() !== '') {
        props.addTask(title)
        setTitle('')
    }
    if(e.key === 'Enter' && title.trim() === '') {
        setError("Field is required")
    }
}

const buttonAddTask = () => {
        if(title.trim() !== ''){
            props.addTask(title)
            setTitle('')
        } else {
            setError("Field is required")
        }

    }

    const AllFilter = () => {props.changeFilter('All')}
    const ActiveFilter = () => {props.changeFilter('Active')}
    const CompletedFilter = () => {props.changeFilter('Completed')}



    return <div>
        <h3>{props.listTitle}</h3>
        <input value={title}
               onChange={changeTitleHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={buttonAddTask}>+</button>
        {error && <div className='error-message'> {error} </div>}
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