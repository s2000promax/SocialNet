import { profileAPI, usersAPI } from '../api/api';

const ADD_POST = 'ADD-POST';

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS='SET_STATUS';

let initialState = {
    posts : [
        {id: 1, message: 'Hi, how are you?', likescount: 12},
        {id: 2, message: 'Its my first post', likescount: 11},
        {id: 3, message: 'Da-Da', likescount: 112},
        {id: 4, message: 'Na-Na-NNNNNNNfff', likescount: 888}
      ],

profile: null,
status: ''
};

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
                          case ADD_POST: 
                                            return {
                                                      ...state,
                                                      posts: [...state.posts, {
                                                      id: 7,
                                                      message: action.newPostText,
                                                      likescount: 0
                                                      }],
                                                   newPostText : ''
                                                    }
     case SET_USER_PROFILE:       
                                        return {
                                                ...state,
                                               profile: action.profile
                                                }

     case SET_STATUS:       
                                        return {
                                                ...state,
                                               status: action.status
                                                }
    default: 
            return state;
       } 

    }

    
export const addPostActionCreator = (newPostText) => { return ( { type: ADD_POST, newPostText } ) }

export const setUserProfile = (profile) => { return ( { type: SET_USER_PROFILE, profile  } ) }
export const setStatus = (status) => { return ( { type: SET_STATUS, status  } ) }

export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId).
    then( data => { dispatch(setUserProfile(data)); });
} 

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).
    then( data => {/*debugger;*/ dispatch(setStatus(data)); });
} 

export const updateStatus = (status) => (dispatch) => {
    profileAPI.getUpdateStatus(status).
    then( data => {
        if (data.resultCode === 0)
         dispatch(setStatus(status)); });
} 

export default profileReducer;