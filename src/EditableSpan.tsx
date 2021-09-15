import React, {ChangeEvent, useState} from "react";

export type editableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: editableSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const setViewNode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return ( editMode
       ? <input onChange={onChangeTitleHandler} value={title} autoFocus onBlur={setViewNode}/>
       : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )

}