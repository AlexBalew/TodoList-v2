import {v1} from "uuid";
import {stateType} from "../App";
import {addTaskAC, changeTaskStatusAC, deleteTaskAC, onChangeTitleAC, tasksReducer} from "./tasks.reducer";
import {addTDlAC, RemoveTDlAC} from "./todolist.reducer";


test('exact task should be removed from exact array', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let todolistID4 = v1()

    let taskID1 = v1()

    const startState: stateType = {
        [todolistID1]: [
            {id: taskID1, taskName: 'sleep', isDone: true},
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
            {id: v1(), taskName: 'Set up a background', isDone: false},
            {id: v1(), taskName: 'Create own style', isDone: false},
            {id: v1(), taskName: 'Push it to GitHub', isDone: false}
        ],
}

    const finalState = tasksReducer(startState, deleteTaskAC(todolistID1, taskID1))

    expect(finalState[todolistID1].length).toBe(3)
    expect(finalState[todolistID3].length).toBe(4)
    expect(finalState[todolistID2].length).toBe(4)
    expect(finalState[todolistID4].length).toBe(4)

})

test('new task should be added to exact array', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let todolistID4 = v1()


    const startState: stateType = {
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
            {id: v1(), taskName: 'Set up a background', isDone: false},
            {id: v1(), taskName: 'Create own style', isDone: false},
            {id: v1(), taskName: 'Push it to GitHub', isDone: false}
        ],
    }

    const finalState = tasksReducer(startState, addTaskAC(todolistID2, 'Дайте танк!'))

    expect(finalState[todolistID2].length).toBe(5)
    expect(finalState[todolistID2][0].taskName).toBe('Дайте танк!')
    expect(finalState[todolistID2][2].taskName).toBe('Neuro')
    expect(finalState[todolistID4].length).toBe(4)

})

test('task title should be changed in exact array', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let todolistID4 = v1()

    let newTaskID = v1()

    const startState: stateType = {
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
            {id: newTaskID, taskName: 'Night', isDone: false},
            {id: v1(), taskName: 'Family Guy', isDone: false},
            {id: v1(), taskName: 'South Park', isDone: true}
        ],
        [todolistID4]: [
            {id: v1(), taskName: 'Train UseStyles', isDone: false},
            {id: v1(), taskName: 'Set up a background', isDone: false},
            {id: v1(), taskName: 'Create own style', isDone: false},
            {id: v1(), taskName: 'Push it to GitHub', isDone: false}
        ],
    }

    const finalState = tasksReducer(startState, onChangeTitleAC(todolistID3, newTaskID, 'It'))

    expect(finalState[todolistID3][1].taskName).toBe('It')
    expect(finalState[todolistID3][2].taskName).toBe('Family Guy')
})

test('task status should be changed in exact array', () => {

    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let todolistID4 = v1()

    let newTaskID = v1()

    const startState: stateType = {
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
            {id: newTaskID, taskName: 'Night', isDone: false},
            {id: v1(), taskName: 'Family Guy', isDone: false},
            {id: v1(), taskName: 'South Park', isDone: true}
        ],
        [todolistID4]: [
            {id: v1(), taskName: 'Train UseStyles', isDone: false},
            {id: v1(), taskName: 'Set up a background', isDone: false},
            {id: v1(), taskName: 'Create own style', isDone: false},
            {id: v1(), taskName: 'Push it to GitHub', isDone: false}
        ],
    }

    const finalState = tasksReducer(startState, changeTaskStatusAC(todolistID3, newTaskID, true))

    expect(finalState[todolistID3][1].isDone).toBe(true)
    expect(finalState[todolistID3][2].isDone).toBe(false)
    expect(finalState[todolistID3][0].isDone).toBe(true)
    expect(finalState[todolistID3][3].isDone).toBe(true)
})

test('new array should be added when new todolist is added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let todolistID4 = v1()

    let newTaskID = v1()

    const startState: stateType = {
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
            {id: newTaskID, taskName: 'Night', isDone: false},
            {id: v1(), taskName: 'Family Guy', isDone: false},
            {id: v1(), taskName: 'South Park', isDone: true}
        ],
        [todolistID4]: [
            {id: v1(), taskName: 'Train UseStyles', isDone: false},
            {id: v1(), taskName: 'Set up a background', isDone: false},
            {id: v1(), taskName: 'Create own style', isDone: false},
            {id: v1(), taskName: 'Push it to GitHub', isDone: false}
        ],
    }

    const action = addTDlAC("new affairs");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistID1 &&
        k != todolistID2 && k != todolistID3 && k != todolistID4 );
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(5);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let todolistID4 = v1()

    let newTaskID = v1()

    const startState: stateType = {
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
            {id: newTaskID, taskName: 'Night', isDone: false},
            {id: v1(), taskName: 'Family Guy', isDone: false},
            {id: v1(), taskName: 'South Park', isDone: true}
        ],
        [todolistID4]: [
            {id: v1(), taskName: 'Train UseStyles', isDone: false},
            {id: v1(), taskName: 'Set up a background', isDone: false},
            {id: v1(), taskName: 'Create own style', isDone: false},
            {id: v1(), taskName: 'Push it to GitHub', isDone: false}
        ],
    }

    const action = RemoveTDlAC(todolistID3);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(3);
    expect(endState[todolistID3]).not.toBeDefined();
});