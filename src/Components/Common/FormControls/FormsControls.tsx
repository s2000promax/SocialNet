import React from "react"
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../Utils/Validators/validators";
import styles from "./FormsControls.module.css"

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {

    const hasError = touched && error

    return <div className= {styles.formControl + " " + (hasError ? styles.error : "" )  } >
                                    <div> {children} </div>
                                   {hasError && <span> { error } </span>}
            </div>    

}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    //const { input, meta, child, ...restProps } = props;
    const { input, meta, ...restProps } = props;
    return <FormControl { ...props } > <textarea { ...input } {...restProps } /></FormControl >
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  //const { input, meta, child, ...restProps } = props;
    const { input, meta, ...restProps } = props;
    return <FormControl { ...props } > <input { ...input } {...restProps } /></FormControl >
    }



export function createField<FormKeysType extends string> (
    placeholder: string | undefined,
    name: FormKeysType,
    validators: Array<FieldValidatorType>,
    component: React.FC<WrappedFieldProps>,
    props = {},
    text = ""
) {
    return (<div>
        <Field placeholder={ placeholder } 
        name = { name }
        validate = { validators }
        component = { component }
        {...props } /> {text}
        </div>
        )
}

export type GetStringKeys<T> = Extract<keyof T, string>


/*
export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error: "") }>
            <div>
            <textarea {...input} {...props} />
            </div>
    {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error: "") }>
            <div>
            <input {...input} {...props} />
            </div>
    {hasError && <span>{meta.error}</span>}
        </div>
    )
}
*/