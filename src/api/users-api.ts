import {GetUsersItems, instanse, ResponseType} from './api';

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instanse.get<GetUsersItems>('users?page=' + currentPage + '&count=' + pageSize)
            .then(res => res.data )
    },

    unFollowUser(userId: number) {
        return instanse.delete('follow/' + userId)
            .then(res=> res.data );
    },

    followUser(userId: number) {
        return instanse.post<ResponseType>('follow/' + userId, {})
            .then(res => res.data ) as Promise<ResponseType>
    },

}