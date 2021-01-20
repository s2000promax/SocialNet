import { type } from 'os';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../api/api';
import { UserType } from '../types/types';
import { AppStateType } from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT    ';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const url1 = 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Dmitry_Nagiev_2017_3.jpg';
const url2 = 'https://roscongress.org/upload/resize_cache/iblock/36c/289_289_2/rian_03054251.hr_.ru_.jpg';
const url3 = 'https://mk0fertilizerda3n4hh.kinstacdn.com/wp-content/uploads/2020/03/Mazepin-Dmitry-coronavirus-1044x686.webp';
const url4 = 'https://culturalforum.ru/content/participants/56/5650f3dd61f8e9e31a73573f717f2187-cropped.jpg';



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // Array of user Id's
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                                           ...state, 
                                           users: state.users.map ( u => {
                                                                           if (u.id === action.userId) {
                                                                             return {...u, followed: true}
                                                                         }
                                                                   return u;
                                                                   })
                                                                
/*
...state,
users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
*/
            }



        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }

        case SET_USERS: {
            return { ...state, users: action.users }
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }

        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId] //true
                    : state.followingInProgress.filter(id => id != action.userId) //false

            }
        }


        default:
            return state;
    }

}

type ActionsTypes = FollowSucessActionType | 
                    UnFollowSucessActionType |
                    SetUsersActionType |
                    SetCurrentPageActionType |
                    SetUsersTotalCountActionType |
                    ToggleIsFetchingActionType |
                    ToggleFollowingProgressActionType


type FollowSucessActionType = {
    type: typeof FOLLOW 
    userId: number
}

export const followSucess = (userId: number): FollowSucessActionType => { return ({ type: FOLLOW, userId }) }

type UnFollowSucessActionType = {
    type: typeof UNFOLLOW 
    userId: number
}

export const unfollowSucess = (userId: number): UnFollowSucessActionType => { return ({ type: UNFOLLOW, userId }) }

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => { return ({ type: SET_USERS, users }) }

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE 
    currentPage: number
}

export const setCurrentPage = (currentPage: number):SetCurrentPageActionType => { return ({ type: SET_CURRENT_PAGE, currentPage }) }

type SetUsersTotalCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT 
    totalUsersCount: number
}

export const setUsersTotalCount = (totalUsersCount: number):SetUsersTotalCountActionType => { return ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount }) }

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingActionType => { return ({ type: TOGGLE_IS_FETCHING, isFetching }) }

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number):ToggleFollowingProgressActionType => { return ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId }) }


// Типизация Thunk
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const requestUsers = (page: number, pageSize: number): ThunkType  => {
    return async (dispatch, getState ) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            
            dispatch(setUsersTotalCount(data.totalCount));
          //  debugger;
        
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        let data = await usersAPI.followUser(userId);
        
            if (data.resultCode == 0) { dispatch(followSucess(userId)); }
            dispatch(toggleFollowingProgress(false, userId));
        
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        let data = await usersAPI.unFollowUser(userId);
        
            if (data.resultCode == 0) { dispatch(unfollowSucess(userId)); }
            dispatch(toggleFollowingProgress(false, userId));
       
    }
}

export default usersReducer;