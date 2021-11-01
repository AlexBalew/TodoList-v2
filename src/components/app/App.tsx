import React, {useCallback, useEffect} from 'react';
import '../../App.css';
import {TodoLists} from "../todoList/TodoLists";
import {useDispatch, useSelector} from "react-redux";
import {MainReducerType} from "../../store/store";
import {TodolistDomainType} from "../../Reducers/todolist.reducer";
import {ErrorSnackBar} from "../errorSnackBar/ErrorSnackBar";
import {initializeAppTC, RequestStatusType} from "../../Reducers/app-reducer";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {logOutTC} from '../../Reducers/authReducer';
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../login/login";

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


    if (!isInitialized) {
        return <CircularProgress/>
    }


    return (
        <BrowserRouter>
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
                <Route path={'/login'} render={() => <Login/>} />
                <Route exact path={'/'} render={() => <TodoLists />} />
            </Container>
        </div>
        </BrowserRouter>
    );
}

export default App




