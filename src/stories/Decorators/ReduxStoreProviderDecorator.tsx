import {Provider} from "react-redux";
import {mainReducerType} from "../../store/store";
import {combineReducers, createStore} from "redux";
import {todolistID1, todolistID2, todolistID3, todolistsReducer} from "../../Reducers/todolist.reducer";
import {tasksReducer} from "../../Reducers/tasks.reducer";
import {v1} from "uuid";

let mainReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
})

const InitialStoryBookState = {
    todoLists: [
        {todolistID: todolistID1, todoListTitle: 'Affairs', filter: 'all'},
        {todolistID: todolistID2, todoListTitle: 'Music', filter: 'all'},
        {todolistID: todolistID3, todoListTitle: 'Movies', filter: 'all'},
    ],
    tasks: {
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
    }
}

export const storyBookStore = createStore(mainReducer, InitialStoryBookState as mainReducerType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}