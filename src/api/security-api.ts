import {instanse} from './api';

type GetCaptchaUrlResponseType = {
url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instanse.get<GetCaptchaUrlResponseType>('security/get-captcha-url')
         .then(res => res.data )
    }
}