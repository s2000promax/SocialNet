import axios from 'axios';
import { ProfileType } from '../types/types';

const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "API-KEY": "19885861-da3c-4b2b-9b8b-10b1cd5ca0a5" }
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instanse.get('users?page=' + currentPage + '&count=' + pageSize)
            .then(response => { return response.data });
    },

    unFollowUser(userId: number) {
        return instanse.delete('follow/' + userId)
            .then(response => { return response.data });
    },

    followUser(userId: number) {
        return instanse.post('follow/' + userId, {})
            .then(response => { return response.data });
    },

    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId: number) { return instanse.get('profile/' + userId).then(response => { return response.data }); },
    getStatus(userId: number) { return instanse.get('profile/status/' + userId).then(response => { return response.data }); },
    getUpdateStatus(status: string) { return instanse.put('profile/status/', { status: status }); },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instanse.put('profile/photo/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    saveProfile(profile: ProfileType) {
        return instanse.put('profile', profile)
    }

}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
            id: number
            email: string
            login: string
        }
    resultCode: ResultCodeEnum 
    messages: Array<string>
}

type LoginResponseType = {
    data: {
            userId: number
        }
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

export const Auth = {
    me() {
           return instanse.get<MeResponseType>('auth/me/').then( res => res.data)
          },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
         return instanse.post<LoginResponseType>('auth/login/', { email, password, rememberMe, captcha }).then( res => res.data) },
    logout() { return instanse.delete('auth/login/'); }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instanse.get('security/get-captcha-url');
    }
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