import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required } from '../../Utils/Validators/validators';
import { createField, Input } from '../Common/FormControls/FormsControls';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import styles from "./../Common/FormControls/FormsControls.module.css"
import { AppStateType } from '../../redux/redux-store';

type LoginFormOwnPropsType = {
    captchaUrl: null | string
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType>
 = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
{createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
{createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type:"password"} )}
{createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type:"checkbox"}, "remember me" )}

{captchaUrl && <img src={captchaUrl} />}
{captchaUrl && createField<LoginFormValuesTypeKeys>("symbols from image", "captcha", [required], Input, {})}


            { error && 
            <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
   
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: 'login' })(LoginForm)


type mapStateToPropsType = {
    captchaUrl: null | string
    isAuth: boolean

}

type mapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void 
}

type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string 
}

type LoginFormValuesTypeKeys =Extract< keyof LoginFormValuesType, string>





const Login: React.FC<mapStateToPropsType & mapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => { 
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha); }

    if (props.isAuth) return <Redirect to={"/profile"} />

    return <div>
        <h1>Login</h1>
        <LoginReduxForm 
                      onSubmit={onSubmit}  
                      captchaUrl={props.captchaUrl}
                      
                      />
    </div>
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({ 
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login} )(Login);