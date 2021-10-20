import React, {useCallback, useEffect} from 'react';
import './App.css';
import {OwnTodoList} from "./OwnTodoList";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar/AppBar';
import {Button, Container, Grid, IconButton, makeStyles, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {MainReducerType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, deleteTaskTC, onChangeTitleAC} from "./Reducers/tasks.reducer";
import {
    addTDlAC,
    changeTDlFilterAC,
    changeTDlTitleAC, FilterType, getTodolistsTC,
    removeTDlAC,
    TodolistDomainType
} from "./Reducers/todolist.reducer";
import {ResponseTaskEntityType, TaskStatuses} from "./api/Todolists.api";

export type TasksStateType = {
    [key: string]: Array<ResponseTaskEntityType>
}

export type TodoListsType = Array<TodolistDomainType>

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

    let dispatch = useDispatch();
    let todolistsFromState = useSelector<MainReducerType, TodoListsType>(state => state.todoLists)
    let tasksFromState = useSelector<MainReducerType, TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTask = useCallback((tlID: string, newTaskTitle: string) => {
        dispatch(addTaskAC(tlID, newTaskTitle))
    }, [dispatch])

    const changeTaskStatus = useCallback((tlID: string, tID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(tlID, tID, status))
    }, [dispatch])

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }, [dispatch])

    const onChangeTaskTitle = useCallback((tlID: string, tID: string, newValue: string) => {
        dispatch(onChangeTitleAC(tlID, tID, newValue))
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterType, tlID: string) => {
        dispatch(changeTDlFilterAC(filter, tlID))
    }, [dispatch])

    const removeTDFunc = useCallback((tlID: string) => {
        dispatch(removeTDlAC(tlID))
    }, [dispatch])

    const addTDList = useCallback((title: string) => {
        dispatch(addTDlAC(title))
    }, [dispatch])

    const changeTDListTitleAPP = useCallback((tlID: string, newTitle: string) => {
        dispatch(changeTDlTitleAC(tlID, newTitle))
    }, [dispatch])

    const classes = useStyles();

    return (

        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} align='center'>
                        ToDoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTDList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolistsFromState.map(tl => {
                            let filteredTasks = tasksFromState[tl.id]
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <OwnTodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={filteredTasks}
                                        deleteTask={deleteTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        filter={tl.filter}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTDFunc={removeTDFunc}
                                        onChangeTitle={onChangeTaskTitle}
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



