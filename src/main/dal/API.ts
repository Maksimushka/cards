import axios from "axios"
import {ParamsType} from '../bll/decks/decks-types';

const HEROKU_URL = 'https://neko-back.herokuapp.com/2.0';
const LOCAL_URL = 'http://localhost:7542/2.0/';
const baseURL = LOCAL_URL;

const instance = axios.create({
    baseURL,
    withCredentials: true
})

export type AuthObjType = {
    email: string
    password: string
    rememberMe?: boolean
}
type UpdateMeObjType = {
    name: string
    avatar: string
}
export type NewPasswordObjType = {
    password: string
    resetPasswordToken: string
}

export type AuthMeResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string;
}

type AuthResponseType = {
    info: string,
    error?: string
}

type cardsResponseType = {
    cardPacksTotalCount: 14 // количество колод
    maxCardsCount: 4
    minCardsCount: 0
    page: 1 // выбранная страница
    pageCount: 4 // количество элементов на странице
}

export const authAPI = {
    ping() {
        return instance.get(`ping?frontTime=${Date.now()}`)
    },
    login(loginObj: AuthObjType) {
        return instance.post<AuthMeResponseType>('auth/login', loginObj).then(res=>res.data)
    },
    logOut() {
        return instance.delete<AuthResponseType>(`auth/me`)
    },
    signUp(singUpObj: AuthObjType) {
        return instance.post<{error?: string, addedUser: any}>('auth/register', singUpObj)
    },
    me() {
        return instance.post<AuthMeResponseType>('auth/me')
    },
    updateMe(updateMeObj: UpdateMeObjType) {
        return instance.put<{ updatedUser: AuthMeResponseType, error?: string }>('auth/me', updateMeObj)
    },
    recovery(email: string) {
        return instance.post<AuthResponseType>('auth/forgot', {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">
                        password recovery link:
	                <a href='https://maksimushka.github.io/cards/#/SetNewPassword/$token$'>link</a>
	            </div>`
        }).then(res=>res.data)
    },
    setNewPassword(newPasswordObj: NewPasswordObjType) {
        return instance.post<AuthResponseType>('auth/set-new-password', newPasswordObj).then(res=>res.data)
    }
}

export const cardsAPI = {
    getDecks(params: ParamsType) {
        return instance.get('cards/pack', {params: {...params}})
    },
}