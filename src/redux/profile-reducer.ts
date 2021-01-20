import { stopSubmit } from 'redux-form';
import { profileAPI, usersAPI } from '../api/api';
import {PostType, ContactsType, ProfileType, PhotosType} from '../types/types'

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS='SET_STATUS';
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS='SAVE_PHOTO_SUCCESS'



let initialState = {
    posts : [
        {id: 1, message: 'Hi, how are you?', likescount: 12},
        {id: 2, message: 'Its my first post', likescount: 11},
        {id: 3, message: 'Da-Da', likescount: 112},
        {id: 4, message: 'Na-Na-NNNNNNNfff', likescount: 888}
      ]as Array<PostType>,

profile: null as ProfileType | null,
status: '',
newPostText : ''
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any):InitialStateType => {
    

    switch(action.type) {
        
                          case ADD_POST: {
                              let newPost = {
                                id: 7,
                                message: action.newPostText,
                                likescount: 0   
                              }
                              return {
                                ...state,
                                posts: [...state.posts, newPost],
                             newPostText : ''
                              }
                          }
                                            
     case SET_USER_PROFILE:       /*debugger*/
                                        return {
                                                ...state,
                                               profile: action.profile
                                                }

     case SET_STATUS:       
                                        return {
                                                ...state,
                                               status: action.status
                                                }

     case DELETE_POST:       
                                        return {
                                                ...state,
                                               posts: state.posts.filter(p=>p.id != action.postId)
                                                }
                                                
     case SAVE_PHOTO_SUCCESS:       
                                        return {
                                                ...state,
                                               profile: {...state.profile, photos: action.photos} as ProfileType
                                                }

    default: 
            return state;
       } 

    }

    type AddPostActionCreatorActionType = {
        type: typeof ADD_POST
        newPostText: string
    }
    
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => { return ( { type: ADD_POST, newPostText } ) }

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => { return ( { type: SET_USER_PROFILE, profile  } ) }

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

export const setStatus = (status: string):SetStatusActionType => { return ( { type: SET_STATUS, status  } ) }

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}

export const deletePost = (postId: number):DeletePostActionType => {return ( { type: DELETE_POST, postId } ) }

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => {return ( { type: SAVE_PHOTO_SUCCESS, photos } ) }



export const getUserProfile = (userId: number) => async (dispatch: any) => {
   const response = await usersAPI.getProfile(userId);

   dispatch(setUserProfile(response.data));
} 

export const getStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userId);
    //debugger
    dispatch(setStatus(response.data));
} 

export const updateStatus = (status: string) => async (dispatch: any) => {
    try
    {
    let response = await profileAPI.getUpdateStatus(status);
            if (response.data.resultCode === 0) {
                        dispatch(setStatus(status));
                         }
                        }
                        catch(error) {
                            //
                        }
} 

export const savePhoto = (file: any) => async (dispatch: any) => {
       let response = await profileAPI.savePhoto(file);
            if (response.data.resultCode === 0) {
                        dispatch(savePhotoSuccess(response.data.data.photos));
                         }
                      
} 

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
       let response = await profileAPI.saveProfile(profile);
            if (response.data.resultCode === 0) {
                        dispatch(getUserProfile(userId));
                         } else {
                             dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
                             return Promise.reject(response.data.messages[0])
                         }
                      
} 


export default profileReducer;