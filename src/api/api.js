import * as axios from 'axios';

const instanse = axios.create({
                               withCredentials: true,
                               baseURL: 'https://social-network.samuraijs.com/api/1.0/',
                               headers: {"API-KEY": "19885861-da3c-4b2b-9b8b-10b1cd5ca0a5"}
                              });

export const usersAPI = {
            getUsers(currentPage, pageSize) {
                        return instanse.get('users?page=' + currentPage + '&count='+ pageSize)
                                           .then(response => { return response.data });
                        },

            unFollowUser(userId) {
                            return instanse.delete('follow/' + userId)
                                               .then(response => { return response.data });
                            },                        

            followUser(userId) {
                            return instanse.post('follow/' + userId, {} )
                                               .then(response => { return response.data });
                            },                        

            getProfile(userId) {
                console.warn('Obsolete method. Please profileAPI object.')
                            return profileAPI.getProfile(userId);
                            }                     
}

export const profileAPI = {                     
    getProfile(userId) { return instanse.get('profile/' + userId).then(response => { return response.data }); },
    getStatus(userId) { return instanse.get('profile/status/' + userId).then(response => { return response.data }); },
    getUpdateStatus(status) { return instanse.put('profile/status/', { status: status } ); }
}

export const Auth = {
    me() { return instanse.get('auth/me/'); },
    login(email, password, rememberMe = false) { return instanse.post('auth/login/', {email, password, rememberMe}); },
    logout() { return instanse.delete('auth/login/'); }
    }



/*
import * as axios from 'axios';

const instanse = axios.create({
                               withCredentials: true,
                               baseURL: 'https://social-network.samuraijs.com/api/1.0/',
                               headers: {"API-KEY": "19885861-da3c-4b2b-9b8b-10b1cd5ca0a5"}
                              });

export const usersAPI = {
            getUsers(currentPage, pageSize) {
                        return instanse.get('users?page=' + currentPage + '&count='+ pageSize)
                                           .then(response => { return response.data });
                        },

            unFollowUser(userId) {
                            return instanse.delete('follow/' + userId)
                                               .then(response => { return response.data });
                            },                        

            followUser(userId) {
                            return instanse.post('follow/' + userId, {} )
                                               .then(response => { return response.data });
                            },                        

            getProfile(userId) {
                console.warn('Obsolete method. Please profileAPI object.')
                            return profileAPI.getProfile(userId);
                            }                     
}

export const profileAPI = {                     
    getProfile(userId) { return instanse.get('profile/' + userId).then(response => { return response.data }); },
    getStatus(userId) { return instanse.get('profile/status/' + userId).then(response => { return response.data }); },
    getUpdateStatus(status) { return instanse.put('profile/status/', { status: status } ); }
}

export const Auth = {
    me() {
        return instanse.get('auth/me/')
                           .then(response => { return response.data });
        }  
    }
*/










/*
axios.delete('https://social-network.samuraijs.com/api/1.0/follow/' + u.id, {
                            withCredentials: true,
                            headers: {"API-KEY": "19885861-da3c-4b2b-9b8b-10b1cd5ca0a5"} 
                                })
                                */
/*                               
                               axios.post('https://social-network.samuraijs.com/api/1.0/follow/' + u.id, {}, {
                                withCredentials: true,
                                headers: {"API-KEY": "19885861-da3c-4b2b-9b8b-10b1cd5ca0a5"} 
                                    })
*/