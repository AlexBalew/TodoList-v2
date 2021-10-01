import React, {useCallback} from 'react';
import './App.css';
import {OwnTodoList, TaskType} from "./OwnTodoList";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar/AppBar';
import {Button, Container, Grid, IconButton, makeStyles, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {mainReducerType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, deleteTaskAC, onChangeTitleAC} from "./Reducers/tasks.reducer";
import {addTDlAC, changeTDlFilterAC, changeTDlTitleAC, removeTDlAC} from "./Reducers/todolist.reducer";

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

    console.log('APP rendered')

    let dispatch = useDispatch();
    let todolists = useSelector<mainReducerType, todoListsType>(state => state.todoLists)
    let tasks = useSelector<mainReducerType, stateType>(state => state.tasks)


    const addTask = useCallback((tlID: string, newTaskTitle: string) => {
        dispatch(addTaskAC(tlID, newTaskTitle))
    }, [dispatch])

    const changeTaskStatus = useCallback((tID: string, isDone: boolean, tlID: string) => {
        dispatch(changeTaskStatusAC(tlID, tID, isDone))
    }, [dispatch])

    const deleteTask = useCallback((tID: string, tlID: string) => {
        dispatch(deleteTaskAC(tlID, tID))
    }, [dispatch])

    const onChangeTaskTitle = useCallback((tlID: string, tID: string, newValue: string) => {
        dispatch(onChangeTitleAC(tlID, tID, newValue))
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterType, tlID: string) => {
        dispatch(changeTDlFilterAC(tlID, filter))
    }, [dispatch])

    const removeTDFunc = useCallback((tlID: string) => {
        dispatch(removeTDlAC(tlID))
    }, [dispatch])

    const addTDList = useCallback((todoListTitle: string) => {
        dispatch(addTDlAC(todoListTitle))
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
                    {todolists.map(tl => {
                            let filteredTasks = tasks[tl.todolistID]
                        return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <OwnTodoList
                                        key={tl.todolistID}
                                        id={tl.todolistID}
                                        title={tl.todoListTitle}
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



