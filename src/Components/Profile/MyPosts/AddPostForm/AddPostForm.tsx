import React from 'react'
import s from '../MyPosts.module.css'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import { render } from '@testing-library/react'
import { createField, GetStringKeys, Input, Textarea } from '../../../Common/FormControls/FormsControls'
import { required } from '../../../../Utils/Validators/validators'

type PropsType = {}

export type AddProsFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddProsFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddProsFormValuesType, PropsType> & PropsType> = (props) => {
return (
    <form onSubmit={props.handleSubmit}>
        <div>
            {createField<AddPostFormValuesTypeKeys>("Add post here", "newPostText", [required], Textarea)}
            
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
)
}

export default reduxForm<AddProsFormValuesType>({form: 'profile-add-post'})(AddPostForm)