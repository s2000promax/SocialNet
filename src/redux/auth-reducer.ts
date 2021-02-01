import { Action } from 'redux'
import { FormAction, stopSubmit } from 'redux-form'
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from '../api/api'
import  Auth from '../api/auth-api'
import { securityAPI } from '../api/security-api'
import {BaseThunkType, InferActionsTypes} from './redux-store'

// s2000promax@gmail.com
// qh5S!C2s!x3MNvB
/*
export type InitialStateType2 = {
    userId : number | null, 
    email: string | null, 
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}
*/

let initialState = { 
    userId : null as number | null, 
    email: null as string | null, 
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null  //if null, then captcha is not required
                   };

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType= BaseThunkType<ActionsType | FormAction>

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch(action.type) {
                         case 'SET_USER_DATA': 
                         case 'GET_CAPTCHA_URL_SUCCESS':
                         
                         return {
                             //userId: 123,
                                  ...state, 
                                  ...action.payload
                                 }
                          
    default: 
            return state;
       } 

    }

   

 export const actions = {
    setAuthUserData : (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA', payload: {userId, email, login, isAuth} 
           } as const ),

    getCaptchaUrlSuccess : (captchaUrl: string) => ({
                type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
            } as const )

 }  

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await Auth.me();
    
            if (meData.resultCode === ResultCodeEnum.Success) {
            let {email, id, login} = meData.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }       
}
/*
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await Auth.login(email, password, rememberMe);
         if (response.data.resultCode === 0) {}
}
  */           

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
   let loginData = await Auth.login(email, password, rememberMe, captcha);
        if (loginData.resultCode === 0) {
             dispatch(getAuthUserData());
        } else {
            
            if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
        
            let message = loginData.messages.length > 0 ? loginData.messages[0]: "Some error"
            let action = stopSubmit("login", {_error: message});
            dispatch(action);
        }                                       
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}
   
export const logout = (): ThunkType => async (dispatch) => {
    let response = await Auth.logout();
            if (response.data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }                                       
}
   

export default authReducer;