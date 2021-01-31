//Презентационная компонента

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';
import queryString from 'querystring'

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {
    
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)



    const dispatch = useDispatch()

    const history = useHistory()
/*
    useEffect( () => {
        //debugger
        history.push({
            pathname: "/developers",
            search: '?term=' + filter.term + '&friend='+ filter.friend+'&page='+currentPage
        })

    }, [filter, currentPage] ) */
    
    useEffect( () => {
        const parsed = queryString.parse(history.location.search.substr(1)) as {term: string, page: string, friend: string}

        let actualPage = currentPage
        let actualFilter = filter
        
        if (!!parsed.page) actualPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
switch(parsed.friend) {
    case "null":
        actualFilter = {...actualFilter, friend: null}
        break
     case "true":
        actualFilter = {...actualFilter, friend: true}
        break
     case "false":
        actualFilter = {...actualFilter, friend: false}
        break
}
        

        dispatch(requestUsers(actualPage, pageSize, actualFilter));
    }, [] )


    const onPageChanged = (pageNumber: number) => {
        
        dispatch(requestUsers(pageNumber, pageSize, filter));

    }

    const onFilterChanged = (filter: FilterType) => {
        
        dispatch(requestUsers(1, pageSize, filter))

    }

    const follo = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollo= (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>

<div>
<UsersSearchForm onFilterChanged={onFilterChanged}/>
</div>

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount} pageSize={pageSize}/>

            <div>
                {
                    users.map(u=> <User user={u}
                        followingInProgress={followingInProgress}
                        key={u.id}
                        unfollow={unfollo}
                        follow={follo}
                        />

                        )
                }
            </div>

             </div>)         
}

