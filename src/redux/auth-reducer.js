import { stopSubmit } from 'redux-form';
import { Auth } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
// s2000promax@gmail.com
// qh5S!C2s!x3MNvB

let initialState = { 
    userId : null, 
    email: null, 
    login: null,
    isAuth: false
                   };

const authReducer = (state = initialState, action) => {

    switch(action.type) {
                         case SET_USER_DATA: 
                         
                         return {
                                  ...state, 
                                  ...action.payload
                                 }
                          
    default: 
            return state;
       } 

    }

    
export const setAuthUserData = (userId, email, login, isAuth) => { return ( { type: SET_USER_DATA, payload: {userId, email, login, isAuth} } ) }
export const getAuthUserData = () => (dispatch) => {
    return Auth.me().then( response => { 
        if (response.data.resultCode === 0) {
            let {email, id, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }                                   
      });  
       
}
   
export const login = (email, password, rememberMe) => (dispatch) => {
    Auth.login(email, password, rememberMe).then( response => { 
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData());
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0]: "Some error"
            let action = stopSubmit("login", {_error: message});
            dispatch(action);
        }                                   
      });     
}
   
export const logout = () => (dispatch) => {
    Auth.logout().then( response => { 
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }                                   
      });     
}
   

export default authReducer;