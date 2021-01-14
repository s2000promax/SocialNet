import { stopSubmit } from 'redux-form';
import { Auth } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
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

export type InitialStateType = typeof initialState;

let initialState = { 
    userId : null as number | null, 
    email: null as string | null, 
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
                   };

const authReducer = (state = initialState, action: any): InitialStateType => {

    switch(action.type) {
                         case SET_USER_DATA: 
                         case GET_CAPTCHA_URL_SUCCESS:
                         
                         return {
                             userId: 123,
                                  ...state, 
                                  ...action.payload
                                 }
                          
    default: 
            return state;
       } 

    }

type setAuthUserDataPayloadType = {
    userId: number | null,
    email: string | null, 
    login: string | null, 
    isAuth: boolean | null 
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA, 
    payload: setAuthUserDataPayloadType
}    

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean):setAuthUserDataActionType => {
     return ( { 
         type: SET_USER_DATA, 
         payload: {userId, email, login, isAuth} 
        } ) }

   type getCaptchaUrlSuccessActionType = {
       type: typeof GET_CAPTCHA_URL_SUCCESS
       payload: { captchaUrl: string }

   }

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => {
    return ({
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}

    } ) }

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await Auth.me();
    
            if (response.data.resultCode === 0) {
            let {email, id, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }       
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await Auth.login(email, password, rememberMe);
         if (response.data.resultCode === 0) {}
}
             
/*   
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
   let response = await Auth.login(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData());
        } else {
            
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
        
            let message = response.data.messages.length > 0 ? response.data.messages[0]: "Some error"
            let action = stopSubmit("login", {_error: message});
            dispatch(action);
        }                                       
}
*/
   
export const logout = () => async (dispatch: any) => {
    let response = await Auth.logout();
            if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }                                       
}
   

export default authReducer;