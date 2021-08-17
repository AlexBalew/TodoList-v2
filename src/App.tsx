import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from 'uuid'
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodoListsType = {
    id: string
    listTitle: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key:string] : Array<TaskType>
}

function App() {

   /* let [tasksObj, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "nodeJS", isDone: false},
    ])*/

    /* let [filter, setFilter] = useState<FilterValuesType>('All')*/

    const changeFilter = (value: FilterValuesType, tlID: string) => {
        let TD = todolists.find(tl => tl.id === tlID)
        if (TD) {
            TD.filter = value
            setTodolists([...todolists])
        }
    }

    const deleteTask = (tID: string, tlID: string ) => {
        tasksObj[tID] = tasksObj[tlID].filter(t => t.id !== tID)
        setTasksObj({...tasksObj})
    }

    function addTask(title: string, tlID: string) {
        let NewTask = {id: v1(), title: title, isDone: false,}
        tasksObj[tlID] = [NewTask, ...tasksObj[tlID]]
        setTasksObj({...tasksObj})
    }

    function checkChanging(taskID: string, isDone: boolean, tlID: string) {
        let task = tasksObj[tlID].find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    const removeTodolist = (tlID: string) => {
        let filteredTodolist = todolists.filter( tl => tl.id !== tlID)
        setTodolists(filteredTodolist)
        delete tasksObj[tlID]
        setTasksObj({...tasksObj})
    }

    let todoList1ID = v1()
    let todoList2ID = v1()


    let [todolists, setTodolists] = useState<Array<TodoListsType>>([
        {id: todoList1ID, listTitle: 'What to learn', filter: 'All'},
        {id: todoList2ID, listTitle: 'What to buy', filter: 'All'}
    ])

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todoList1ID]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "nodeJS", isDone: false}
        ],
        [todoList2ID]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Rubber", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Monitor", isDone: false},
            {id: v1(), title: "Pizza", isDone: false}
        ],
    })

    function addTodoList(title: string){
        let todolist: TodoListsType = {
            id: v1(),
            filter: 'All',
            listTitle: title
        }
        setTodolists([todolist, ...todolists])
        setTasksObj({...tasksObj, [todolist.id]:[]})
    }

    return (
        <div className='APP'>
            <AddItemForm addItem={addTodoList}/>
            {
                todolists.map((tl) => {

                    let tasksForToDoList = tasksObj[tl.id]
                    if (tl.filter === 'Active') {
                        tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'Completed') {
                        tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
                    }

                    return <ToDoList
                        key={tl.id}
                        tlID={tl.id}
                        listTitle={tl.listTitle}
                        tasks={tasksForToDoList}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        checkChanging={checkChanging}
                        filter={tl.filter}
                        removeTodoList={removeTodolist}
                    />
                })
            }

        </div>
    );
}


export default App;
