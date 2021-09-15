type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string] : any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT_AGE': {
            let stateCopy = {...state}
            stateCopy.age = stateCopy.age + 1
            return stateCopy
        }
        case 'INCREMENT_CHILDREN_COUNT': {
            return {...state, childrenCount: state.childrenCount + 1 }
        }
        case 'CHANGE_NAME': {
            return {...state, name: action.newName}
        }
        default:
            return state
    }

}