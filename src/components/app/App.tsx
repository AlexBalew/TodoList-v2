import React, {useCallback, useEffect} from 'react';
import '../../App.css';
import {TodoList} from "../todoList/TodoList";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {MainReducerType} from "../../store/store";
import {
    addTaskTC,
    changeTaskStatusTC,
    changeTaskTitleTC,
    deleteTaskTC,
    TasksStateType,
} from "../../Reducers/tasks.reducer";
import {
    addTodolistTC,
    changeTDlFilterAC,
    changeTodolistTitleTC,
    FilterType,
    getTodolistsTC,
    removeTodolistsTC,
    TodolistDomainType
} from "../../Reducers/todolist.reducer";
import {TaskStatuses} from "../../api/Todolists.api";
import {ErrorSnackBar} from "../errorSnackBar/ErrorSnackBar";
import {initializeAppTC, RequestStatusType} from "../../Reducers/app-reducer";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {Login} from "../login/login";
import {Route} from "react-router-dom";
import {logOutTC} from "../../Reducers/authReducer";

export type TodoListsType = Array<TodolistDomainType>

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const dispatch = useDispatch();
    const todolistsFromState = useSelector<MainReducerType, TodoListsType>(state => state.todoLists)
    const tasksFromState = useSelector<MainReducerType, TasksStateType>(state => state.tasks)
    const isInitialized = useSelector<MainReducerType, boolean>(state => state.app.isAppInitialized)
    const isLoggedIn = useSelector<MainReducerType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<MainReducerType, RequestStatusType>(state => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [])


    /* if(!isInitialized) { //невозможно разместить здесь из-за useCallback. Перенести useCallbacks в Todolist.tsx
         return <CircularProgress /> //посмотреть другие варианты и стилизовать
     }*/

    useEffect(() => {
        debugger
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(getTodolistsTC())
    }, [])

    const addTask = useCallback((tlID: string, newTaskTitle: string) => {
        dispatch(addTaskTC(tlID, newTaskTitle))
    }, [dispatch])

    const changeTaskStatus = useCallback((tlID: string, tID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC(tlID, tID, status))
    }, [dispatch])

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }, [dispatch])

    const onChangeTaskTitle = useCallback((tlID: string, tID: string, newTitle: string) => {
        dispatch(changeTaskTitleTC(tlID, tID, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterType, tlID: string) => {
        dispatch(changeTDlFilterAC(filter, tlID))
    }, [dispatch])

    const removeTDFunc = useCallback((tlID: string) => {
        dispatch(removeTodolistsTC(tlID))
    }, [dispatch])

    const addTDList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const changeTDListTitleAPP = useCallback((tlID: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(tlID, newTitle))
    }, [dispatch])
/*
    if(!isLoggedIn) { //Перенести useCallbacks в Todolist.tsx
        return <Redirect to={'/login'} /> //пофиксить отрисовку
    }*/


    return (
            <div style={{flexGrow: 1, background: '#E0E0E0', minHeight: '100vh', paddingBottom: '20px'}}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <ErrorSnackBar/>
                        <IconButton edge="start" style={{marginRight: 2}} color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" style={{flexGrow: 1}} align='center'>
                            ToDoList
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={() => {logOutHandler()}}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress color={'secondary'}/>}
                </AppBar>

                <Container fixed>
                    <Route exact path={'/'} render={() => {
                        return (
                            <>
                                <Grid container style={{padding: '20px'}}>
                                    <AddItemForm callback={addTDList} label={'new todolist title'}/>
                                </Grid>
                                <Grid container spacing={4}>
                                    {todolistsFromState.map(tl => {
                                            let filteredTasks = tasksFromState[tl.id]
                                            return <Grid item>
                                                <Paper style={{padding: '10px'}}>
                                                    <TodoList
                                                        key={tl.id}
                                                        tasks={filteredTasks}
                                                        deleteTask={deleteTask}
                                                        changeFilter={changeFilter}
                                                        addTask={addTask}
                                                        changeTaskStatus={changeTaskStatus}
                                                        removeTDFunc={removeTDFunc}
                                                        onChangeTaskTitle={onChangeTaskTitle}
                                                        changeTDListTitleAPP={changeTDListTitleAPP}
                                                        demo={demo}
                                                        todolist={tl}
                                                    />
                                                </Paper>
                                            </Grid>
                                        }
                                    )}
                                </Grid>
                            </>
                        )
                    }}/>
                    <Route path={'/login'} render={() => <Login/>} />
                </Container>
            </div>
    );
}

export default App



