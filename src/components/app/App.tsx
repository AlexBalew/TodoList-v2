import React, {useCallback, useEffect} from 'react';
import '../../App.css';
import {TodoLists} from "../todoList/TodoLists";
import {useDispatch, useSelector} from "react-redux";
import {MainReducerType} from "../../store/store";
import {TodolistDomainType} from "../../Reducers/todolist.reducer";
import {ErrorSnackBar} from "../errorSnackBar/ErrorSnackBar";
import {initializeAppTC, RequestStatusType} from "../../Reducers/app-reducer";
import {AppBar, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {logOutTC} from '../../Reducers/authReducer';
import {Redirect} from "react-router-dom";

export type TodoListsType = Array<TodolistDomainType>

type PropsType = {
    demo?: boolean
}

function App  ({demo = false}: PropsType) {

    const dispatch = useDispatch()
    const isInitialized = useSelector<MainReducerType, boolean>(state => state.app.isAppInitialized)
    const isLoggedIn = useSelector<MainReducerType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<MainReducerType, RequestStatusType>(state => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [])


    if (!isInitialized) { //невозможно разместить здесь из-за useCallback. Перенести useCallbacks в Todolist.tsx
        return <CircularProgress/> //посмотреть другие варианты и стилизовать
    }


    if (!isLoggedIn) { //Перенести useCallbacks в Todolist.tsx
        return <Redirect to={'/login'}/>
    }//пофиксить отрисовку


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
                    {/*{isLoggedIn && <Button color="inherit" onClick={() => {logOutHandler()}}>Log out</Button>}*/}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>

            <Container fixed>
                <TodoLists/>
            </Container>
        </div>
    );
}

export default App




