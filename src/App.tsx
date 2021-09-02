import React, {useState} from 'react';
import './App.css';
import {OwnTodoList, TaskType} from "./OwnTodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar/AppBar';
import {Button, Container, Grid, IconButton, makeStyles, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

export type FilterType = 'all' | 'active' | 'completed'

export type todoListType = {
    todolistID: string
    todoListTitle: string
    filter: FilterType
}

export type stateType = {
    [key: string]: Array<TaskType>
}

export type todoListsType = Array<todoListType>

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let todolistID4 = v1()

    let [todoLists, setTodolists] = useState<todoListsType>([
        {todolistID: todolistID1, todoListTitle: 'Affairs', filter: 'all'},
        {todolistID: todolistID2, todoListTitle: 'Music', filter: 'all'},
        {todolistID: todolistID3, todoListTitle: 'Movies', filter: 'all'},
        {todolistID: todolistID4, todoListTitle: 'TDList', filter: 'all'},
    ])

    let [allTasks, setAllTasks] = useState<stateType>({
        [todolistID1]: [
            {id: v1(), taskName: 'sleep', isDone: true},
            {id: v1(), taskName: 'drink', isDone: false},
            {id: v1(), taskName: 'rave', isDone: false},
            {id: v1(), taskName: 'repeat', isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), taskName: 'Metallica', isDone: true},
            {id: v1(), taskName: 'Neuro', isDone: false},
            {id: v1(), taskName: 'Ghost', isDone: false},
            {id: v1(), taskName: 'Liquid', isDone: true},
        ],
        [todolistID3]: [
            {id: v1(), taskName: 'Seven', isDone: true},
            {id: v1(), taskName: 'Night', isDone: false},
            {id: v1(), taskName: 'Family Guy', isDone: false},
            {id: v1(), taskName: 'South Park', isDone: true}
        ],
        [todolistID4]: [
            {id: v1(), taskName: 'Train UseStyles', isDone: false},
            {id: v1(), taskName: 'Find out how to set up A background theme', isDone: false},
            {id: v1(), taskName: 'Create own custom style for + buttons', isDone: false},
            {id: v1(), taskName: 'Push it to GitHub', isDone: false}
        ],
    })

    const addTask = (newTaskTitle: string, tlID: string) => {
        let newTask = {
            id: v1(),
            taskName: newTaskTitle,
            isDone: false
        }
        let tasks = allTasks[tlID]
        allTasks[tlID] = [newTask, ...tasks]
        setAllTasks({...allTasks})
    }

    const changeTaskStatus = (tID: string, isDone: boolean, tlID: string) => {
        let tasks = allTasks[tlID]
        let neededTask = tasks.find(t => t.id === tID)
        if (neededTask) {
            neededTask.isDone = isDone
            setAllTasks({...allTasks})
        }
    }

    const deleteTask = (tID: string, tlID: string) => {
        let tasks = allTasks[tlID]
        allTasks[tlID] = tasks.filter(t => t.id !== tID)
        setAllTasks({...allTasks})
    }

    const changeFilter = (filter: FilterType, tlID: string) => {
        let todoList = todoLists.find(tl => tl.todolistID === tlID)
        if (todoList) {
            todoList.filter = filter
            setTodolists([...todoLists])
        }
    }

    const removeTDFunc = (tlID: string) => {
        let filteredTD = todoLists.filter(tl => tl.todolistID !== tlID)
        setTodolists(filteredTD)
        delete allTasks[tlID]
        setAllTasks({...allTasks})
    }

    const addTDList = (todoListTitle: string) => {
        let TDList: todoListType = {
            todolistID: v1(),
            todoListTitle: todoListTitle,
            filter: 'all'
        }
        setTodolists([TDList, ...todoLists])
        setAllTasks({...allTasks, [TDList.todolistID]: []})
    }

    const onChangeTitle = (tID: string, newValue: string, tlID: string) => {
        let tasks = allTasks[tlID]
        let neededTask = tasks.find(t => t.id === tID)
        if (neededTask) {
            neededTask.taskName = newValue
            setAllTasks({...allTasks})
        }
    }

    const changeTDListTitleAPP = (newTitle: string, tlID: string) => {
        let todolist = todoLists.find(tl => tl.todolistID === tlID)
        if (todolist) {
            todolist.todoListTitle = newTitle
            setTodolists([...todoLists])
        }
    }

    const classes = useStyles();

    return (

        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTDList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoLists.map(tl => {
                            let filteredTasks = allTasks[tl.todolistID]
                            let tasksForTodolist = filteredTasks;

                            if (tl.filter === 'active') {
                                tasksForTodolist = filteredTasks.filter(t => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = filteredTasks.filter(t => t.isDone)
                            }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                               <OwnTodoList
                                key={tl.todolistID}
                                id={tl.todolistID}
                                title={tl.todoListTitle}
                                tasks={tasksForTodolist}
                                deleteTask={deleteTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                filter={tl.filter}
                                changeTaskStatus={changeTaskStatus}
                                removeTDFunc={removeTDFunc}
                                onChangeTitle={onChangeTitle}
                                changeTDListTitleAPP={changeTDListTitleAPP}
                            />
                            </Paper>
                        </Grid>
                        }
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default App



