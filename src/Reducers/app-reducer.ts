export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export type ActionsType = setAppStatusACType | setErrorACType

type setErrorACType = ReturnType<typeof setErrorAC>

export const setErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET_ERROR',
        error
    } as const
}

type setAppStatusACType = ReturnType<typeof setAppStatusAC>

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET_STATUS',
        status
    } as const
}