import axios from 'axios';
import { UserType } from '../types/types';

export const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "API-KEY": "19885861-da3c-4b2b-9b8b-10b1cd5ca0a5" }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetUsersItems = {
items: Array<UserType>
totalCount: number
error: string | null
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}