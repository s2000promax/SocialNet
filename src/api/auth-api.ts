import { instanse, ResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum } from './api';

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

const Auth = {
    me() {
        return instanse.get<ResponseType<MeResponseDataType>>('auth/me/')
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instanse.post<ResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>('auth/login/',
            { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() { return instanse.delete('auth/login/'); }
}

export default Auth