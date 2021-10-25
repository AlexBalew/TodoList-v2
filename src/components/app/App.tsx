import React, {useCallback, useEffect} from 'react';
import '../../App.css';
import {TodoList} from "../todoList/TodoList";
import {AddItemForm} from "../addItemForm/AddItemForm";
import AppBar from '@material-ui/core/AppBar/AppBar';
import {
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    makeStyles,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {MainReducerType} from "../../store/store";
import {
    addTaskTC,
    changeTaskStatusTC, changeTaskTitleTC,
    deleteTaskTC,
} from "../../Reducers/tasks.reducer";
import {
    addTodolistTC,
    changeTDlFilterAC,
    changeTodolistTitleTC, FilterType, getTodolistsTC,
    removeTodolistsTC,
    TodolistDomainType
} from "../../Reducers/todolist.reducer";
import {ResponseTaskType, TaskStatuses} from "../../api/Todolists.api";
import {ErrorSnackBar} from "../errorSnackBar/ErrorSnackBar";
import {RequestStatusType} from "../../Reducers/app-reducer";

export type TasksStateType = {
    [key: string]: Array<ResponseTaskType>
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

type PropsType = {
    demo?: boolean
}


function App({demo = false}: PropsType) {

    let dispatch = useDispatch();
    let todolistsFromState = useSelector<MainReducerType, TodoListsType>(state => state.todoLists)
    let tasksFromState = useSelector<MainReducerType, TasksStateType>(state => state.tasks)

    useEffect(() => {
        if(demo){
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

    const classes = useStyles();

    const status = useSelector<MainReducerType, RequestStatusType>(state => state.app.status)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <ErrorSnackBar/>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} align='center'>
                        ToDoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                { status === 'loading' && <LinearProgress color={'secondary'}/>}
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
            </Container>
        </div>
    );
}

export default App



