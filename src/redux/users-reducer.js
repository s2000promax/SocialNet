import { usersAPI } from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const url1 = 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Dmitry_Nagiev_2017_3.jpg';
const url2 = 'https://roscongress.org/upload/resize_cache/iblock/36c/289_289_2/rian_03054251.hr_.ru_.jpg';
const url3 = 'https://mk0fertilizerda3n4hh.kinstacdn.com/wp-content/uploads/2020/03/Mazepin-Dmitry-coronavirus-1044x686.webp';
const url4 = 'https://culturalforum.ru/content/participants/56/5650f3dd61f8e9e31a73573f717f2187-cropped.jpg';

let initialState = { 
    users : [ ], 
    pageSize: 5, 
    totalUsersCount: 0,
    currentPage: 1, 
    isFetching: false,
    followingInProgress: []
                   };

const usersReducer = (state = initialState, action) => {

    switch(action.type) {
                         case FOLLOW: 
                         return {
                                           ...state, 
                                           users: state.users.map ( u => {
                                                                           if (u.id === action.userId) {
                                                                             return {...u, followed: true}
                                                                         }
                                                                   return u;
                                                                   })
                                        }



                         case UNFOLLOW:
                            return {
                                ...state, 
                                users: state.users.map ( u => {
                                                                if (u.id === action.userId) {
                                                                  return {...u, followed: false}
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
                            return { ...state, totalUsersCount: action.count }
                        }

                        case TOGGLE_IS_FETCHING: {
                            return { ...state, isFetching: action.isFetching }
                        }
                        
                        case TOGGLE_IS_FOLLOWING_PROGRESS: {
                            return { ...state, 
                                     followingInProgress: action.isFetching 
                                        ? [...state.followingInProgress, action.userId] //true
                                           : state.followingInProgress.filter(id => id !=action.userId) //false

                                    }
                        }
                        
                          
    default: 
            return state;
       } 

    }

    
export const followSucess = (userId) => {return ( { type: FOLLOW, userId } ) }  
export const unfollowSucess = (userId) => { return ( { type: UNFOLLOW, userId } ) }
export const setUsers = (users) => { return ( { type: SET_USERS, users } ) }
export const setCurrentPage = (currentPage) => { return ( { type: SET_CURRENT_PAGE, currentPage } ) }
export const setUsersTotalCount = (totalUsersCount) => { return ( { type: SET_TOTAL_USERS_COUNT, count: totalUsersCount } ) }
export const toggleIsFetching = (isFetching) => { return ( { type: TOGGLE_IS_FETCHING, isFetching} ) }
export const toggleFollowingProgress = (isFetching, userId) => { return ( { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} ) }

export const requestUsers = (page, pageSize) => {
             return (dispatch) => {
                                   dispatch(toggleIsFetching(true));
                                   dispatch(setCurrentPage(page));

                     usersAPI.getUsers(page, pageSize).then( data => { 
                              dispatch(toggleIsFetching(false));
                              dispatch(setUsers(data.items)); 
                              dispatch(setUsersTotalCount(data.totalCount));
                                                });
                                  }
 }

export const follow = (userId) => {
             return (dispatch) => {
                dispatch(toggleFollowingProgress(true, userId)); 
                usersAPI.followUser(userId).then( data => { if (data.resultCode == 0) { dispatch(followSucess(userId)); }
                dispatch(toggleFollowingProgress(false, userId)); 
                                                      });  
                                  }
 }

export const unfollow = (userId) => {
             return (dispatch) => {
                dispatch(toggleFollowingProgress(true, userId)); 
                usersAPI.unFollowUser(userId).then( data => { if (data.resultCode == 0) { dispatch(unfollowSucess(userId)); }
                dispatch(toggleFollowingProgress(false, userId)); 
                                                      });  
                                  }
 }

export default usersReducer;