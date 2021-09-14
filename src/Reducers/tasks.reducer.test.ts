import {v1} from "uuid";
import {stateType} from "../App";
import {deleteTaskAC, tasksReducer} from "./tasks.reducer";


test('exact task should be removed from exact array', () => {

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

    const finalState = tasksReducer(startState, deleteTaskAC())

    expect(finalState[todolistID1].length).toBe(3)
    expect(finalState[todolistID3].length).toBe(4)
    expect(finalState[todolistID2].length).toBe(4)
    expect(finalState[todolistID4].length).toBe(4)

})