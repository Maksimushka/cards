import axios from "axios"

const instanceLocal = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
})

const instanceHeroku = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
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

type AuthMeResponseType = {
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

export const authAPI = {
    ping() {
        return instanceHeroku.get(`ping?frontTime=${Date.now()}`)
    },
    login(loginObj: AuthObjType) {
        return instanceHeroku.post<AuthMeResponseType>('auth/login', loginObj).then(res=>res.data)
    },
    logOut() {
        return instanceHeroku.delete<AuthResponseType>(`auth/me`)
    },
    signUp(singUpObj: AuthObjType) {
        return instanceHeroku.post<{error?: string, addedUser: any}>('auth/register', singUpObj)
    },
    me() {
        return instanceHeroku.post<AuthMeResponseType>('auth/me')
    },
    updateMe(updateMeObj: UpdateMeObjType) {
        return instanceHeroku.put<{ updatedUser: AuthMeResponseType, error?: string }>('auth/me', updateMeObj)
    },
    recovery(email: string) {
        return instanceHeroku.post<AuthResponseType>('auth/forgot', {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">
                        password recovery link:
	                <a href='https://maksimushka.github.io/cards/#/SetNewPassword/$token$'>link</a>
	            </div>`
        }).then(res=>res.data)
    },
    setNewPassword(newPasswordObj: NewPasswordObjType) {
        return instanceHeroku.post<AuthResponseType>('auth/set-new-password', newPasswordObj).then(res=>res.data)
    }
}
