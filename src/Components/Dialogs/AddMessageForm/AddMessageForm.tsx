import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLenghtCreator, required } from '../../../Utils/Validators/validators';
import { createField, Textarea } from '../../Common/FormControls/FormsControls';
import {NewMessageFormValuesType} from '../Diaologs'

const maxLength50 = maxLenghtCreator(50);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                    <div>
                        {createField<NewMessageFormValuesKeysType>("Enter your message", 'newMessageBody', [required, maxLength50], Textarea)}
                   
                    <div>
                            <button>Send</button>
                        </div>
                    </div>
                </form>
    )
}

export default reduxForm<NewMessageFormValuesType>({form: "dialog-add-message-form"})(AddMessageForm)