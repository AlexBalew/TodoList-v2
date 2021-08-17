import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState('')

    const [error, setError] = useState('')

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter' && title !== '') {
            props.addItem(title.trim())
            setTitle('')
        }
        if (e.key === 'Enter' && title.trim() === '') {
            setError("Field is required")
        }
    }

    const buttonAddTask = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError("Field is required")
        }

    }

    return <div>
        <input value={title}
               onChange={changeTitleHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={buttonAddTask}>+</button>
        {error && <div className='error-message'> {error} </div>}
    </div>
}