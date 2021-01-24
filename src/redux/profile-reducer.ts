import { FormAction, stopSubmit } from 'redux-form';
import { profileAPI } from '../api/profile-api';
import { usersAPI } from '../api/users-api';
import {PostType, ContactsType, ProfileType, PhotosType} from '../types/types'
import { BaseThunkType, InferActionsTypes } from './redux-store';

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

export const actions = {
     addPostActionCreator : (newPostText: string) => { return ( { type: 'ADD_POST', newPostText } ) as const },
     setUserProfile : (profile: ProfileType) => { return ( { type: 'SET_USER_PROFILE', profile  } ) as const },
     setStatus : (status: string) => { return ( { type: 'SET_STATUS', status  } ) as const },
     deletePost : (postId: number) => {return ( { type: 'DELETE_POST', postId } ) as const },
     savePhotoSuccess : (photos: PhotosType) => {return ( { type: 'SAVE_PHOTO_SUCCESS', photos } ) as const }
}
type ActionsType = InferActionsTypes<typeof actions>
type ThunkAction = BaseThunkType<ActionsType | FormAction>

const profileReducer = (state = initialState, action: ActionsType):InitialStateType => {
    

    switch(action.type) {
        
                          case 'ADD_POST': {
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
                                            
     case 'SET_USER_PROFILE':       /*debugger*/
                                        return {
                                                ...state,
                                               profile: action.profile
                                                }

     case 'SET_STATUS':       
                                        return {
                                                ...state,
                                               status: action.status
                                                }

     case 'DELETE_POST':       
                                        return {
                                                ...state,
                                               posts: state.posts.filter(p=>p.id != action.postId)
                                                }
                                                
     case 'SAVE_PHOTO_SUCCESS':       
                                        return {
                                                ...state,
                                               profile: {...state.profile, photos: action.photos} as ProfileType
                                                }

    default: 
            return state;
       } 

    }


    




export const getUserProfile = (userId: number): ThunkAction => async (dispatch) => {
   const data = await profileAPI.getProfile(userId);

   dispatch(actions.setUserProfile(data));
  //dispatch(getUserProfile(userId));
} 

export const getStatus = (userId: number): ThunkAction => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    //debugger
    dispatch(actions.setStatus(data));
} 

export const updateStatus = (status: string): ThunkAction => async (dispatch) => {
    try
    {
    let data = await profileAPI.getUpdateStatus(status);
            if (data.resultCode === 0) {
                        dispatch(actions.setStatus(status));
                         }
                        }
                        catch(error) {
                            //
                        }
} 

export const savePhoto = (file: File): ThunkAction => async (dispatch) => {
       let data = await profileAPI.savePhoto(file);
            if (data.resultCode === 0) {
                        dispatch(actions.savePhotoSuccess(data.data.photos));
                         }
                      
} 

export const saveProfile = (profile: ProfileType): ThunkAction => async (dispatch, getState) => {
    const userId = getState().auth.userId;
       let data = await profileAPI.saveProfile(profile);
            if (data.resultCode === 0) {
                 if (userId != null) {
                        dispatch(getUserProfile(userId));
                 } else {
                     throw new Error("userId can't be null")
                 }
                         } else {
                             dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
                             return Promise.reject(data.messages[0])
                         }
                      
} 


export default profileReducer;