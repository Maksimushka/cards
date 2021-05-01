import axios from "axios"

const instanceLocal = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
})

const instanceHeroku = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
})

type AuthObjType = {
    email: string
    password: string
    rememberMe?: boolean
}
type UpdateMeObjType = {
    name: string
    avatar: string
}
type NewPasswordObjType = {
    password: string
    resetPasswordToken: string
}
// type RecoveryObjType = {
//     email: "nya@nya.nya"
//     from: "test-front-admin <m.billsrc@gmail.com>", // можно указать разработчика фронта)
// }

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
        return instanceLocal.get(`ping?frontTime=${Date.now()}`)
    },
    login(loginObj: AuthObjType) {
        return instanceLocal.post<AuthMeResponseType>('auth/login', loginObj)
    },
    logOut() {
        return instanceLocal.delete<AuthResponseType>(`auth/me`)
    },
    signUp(singUpObj: AuthObjType) {
        return instanceLocal.post<{error?: string, addedUser: any}>('auth/register', singUpObj)
    },
    me() {
        return instanceLocal.post<AuthMeResponseType>('auth/me')
    },
    updateMe(updateMeObj: UpdateMeObjType) {
        return instanceLocal.put<{ updatedUser: AuthMeResponseType, error?: string }>('auth/me', updateMeObj)
    },
    // recovery(recoveryObj: ) {
    //     return instanceHeroku.put('auth/forgot', updateMeObj)
    // },
    setNewPassword(newPasswordObj: NewPasswordObjType) {
        return instanceLocal.post<AuthResponseType>('auth/set-new-password', newPasswordObj)
    }
}