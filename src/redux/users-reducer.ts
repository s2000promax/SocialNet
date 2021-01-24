import { usersAPI } from '../api/users-api';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../Utils/object-helpers';
import { BaseThunkType, InferActionsTypes } from './redux-store';


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
        case 'FOLLOW':
            return {
                /*
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })*/

                
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                
            }



        case 'UNFOLLOW':
            return {
                /*
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
                */
               ...state,
               users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }

        case 'SET_USERS': {
            return { ...state, users: action.users }
        }

        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }

        case 'SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }

        case 'TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }

        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
     followSucess : (userId: number) => { return ({ type: 'FOLLOW', userId } as const) },
     unfollowSucess : (userId: number) => { return ({ type: 'UNFOLLOW', userId } as const) }, 
     setUsers : (users: Array<UserType>) => { return ({ type: 'SET_USERS', users } as const) },
     setCurrentPage : (currentPage: number) => { return ({ type: 'SET_CURRENT_PAGE', currentPage } as const) },
     setUsersTotalCount : (totalUsersCount: number) => { return ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const) },
     toggleIsFetching : (isFetching: boolean) => { return ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const) },
     toggleFollowingProgress : (isFetching: boolean, userId: number) => { return ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const) }
}


// Типизация Thunk
type ThunkType = BaseThunkType<ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);

        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));

        dispatch(actions.setUsersTotalCount(data.totalCount));
        //  debugger;

    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId));
        let data = await usersAPI.followUser(userId);

        if (data.resultCode == 0) { dispatch(actions.followSucess(userId)); }
        dispatch(actions.toggleFollowingProgress(false, userId));

    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId));
        let data = await usersAPI.unFollowUser(userId);

        if (data.resultCode == 0) { dispatch(actions.unfollowSucess(userId)); }
        dispatch(actions.toggleFollowingProgress(false, userId));

    }
}

export default usersReducer;