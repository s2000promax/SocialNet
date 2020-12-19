import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../Utils/Validators/validators';
import { Input } from '../Common/FormControls/FormsControls';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import styles from "./../Common/FormControls/FormsControls.module.css"

const LoginForm = (props) => {
    return (<div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} placeholder={"Email"} name={"email"}
                validate={[required]} />
            </div>

            <div>
                <Field component={Input} placeholder={"Password"} name={"password"} type={"password"}
                validate={[required]} />
            </div>

            <div>
                <Field component={Input} type={"checkbox"} name={"rememberMe"} />remember me
            </div>
            { props.error && 
            <div className={styles.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    </div>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)



const Login = (props) => {
    const onSubmit = (formData) => { props.login(formData.email, formData.password, formData.rememberMe); }
    if (props.isAuth) return <Redirect to={"/profile"} />

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({ isAuth: state.isAuth})

export default connect(mapStateToProps, {login} )(Login);