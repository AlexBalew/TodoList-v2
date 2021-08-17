import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from 'uuid'

export type FilterValuesType = 'All' | 'Active' | 'Completed'


function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "nodeJS", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('All')

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForToDoList = tasks
    if (filter === 'Active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'Completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }

    const deleteTask = (tID: string) => {
        let NewTasks = tasks.filter(t => t.id !== tID)
        setTasks(NewTasks)
    }

    function addTask (title: string) {
        let NewTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([NewTask, ...tasksForToDoList])
    }

    function checkChanging (taskID: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskID)
        if(task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }


    return (
        <div className='APP'>
            <ToDoList listTitle='What to learn'
                      tasks={tasksForToDoList}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      checkChanging={checkChanging}
                      filter={filter}
            />
        </div>
    );
}


export default App;
