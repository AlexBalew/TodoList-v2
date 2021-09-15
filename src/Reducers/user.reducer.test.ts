import {userReducer} from "./user.reducer";

test('user reducer should increment users age only', () => {

    const startState = {age: 20, childrenCount: 2, name: 'Alex'}

    const finalState = userReducer(startState, {type: 'INCREMENT_AGE'})

    expect(finalState.age).toBe(21)
    expect(finalState.childrenCount).toBe(2)

})

test('user reducer should increment the number of children only', () => {

    const startState = {age: 20, childrenCount: 2, name: 'Alex'}

    const finalState = userReducer(startState, {type: 'INCREMENT_CHILDREN_COUNT'})

    expect(finalState.age).toBe(20)
    expect(finalState.childrenCount).toBe(3)

})

test('user reducer should change the name of the user', () => {

    const startState = {age: 20, childrenCount: 2, name: 'Alex'}

    const newName = 'Kate'

    const finalState = userReducer(startState, {type: 'CHANGE_NAME', newName})

    expect(finalState.name).toBe(newName)
    expect(finalState.age).toBe(20)
    expect(finalState.childrenCount).toBe(2)

})