import {IconButton, TextField} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    callback: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({callback, disabled = false}: AddItemFormPropsType) => {

    console.log('AddItemForm rendered')

    let [title, setTitle] = useState('')
    let [error, setError] = useState('')

    const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError('')
        }
        if (e.key === 'Enter' && title.trim() !== '') {
            callback(title)
            setTitle('')
        }
        if (e.key === 'Enter' && title.trim() === '') {
            setError('Insert Title')
        }
    }

    const addTaskButton = () => {
        if (title.trim() !== '') {
            callback(title)
            setTitle('')
        } else {
            setError('Insert TaskName')
        }
    }

    return (
        <div>
            <TextField
                disabled={disabled}
                size={'small'}
                variant={'outlined'}
                value={title}
                onChange={onChangeNewTaskTitleHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label='Title'
                helperText={error}/>
            <IconButton color={'secondary'} size={'small'} onClick={addTaskButton} disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    )
})