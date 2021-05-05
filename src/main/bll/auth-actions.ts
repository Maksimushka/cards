import {authAPI, AuthObjType} from '../dal/API'
import {ThunkType} from './store';
import {Dispatch} from "redux";

// TYPES
export enum AuthEnum {
    LOGIN = 'AUTH/LOGIN',
    LOGOUT = 'AUTH/LOGOUT',
    UPDATE_USER = 'AUTH/UPDATE_USER',
    IS_LOADING = 'AUTH/IS_LOADING',
    IS_AUTH = 'AUTH/IS_AUTH',
    IS_REGISTER = "IS_REGISTER"
}

export type AuthActionsTypes = ReturnType<typeof login>
    | ReturnType<typeof logOut>
    | ReturnType<typeof updateUser>
    | ReturnType<typeof loadingSpinner>
    | ReturnType<typeof authentication>
    | ReturnType<typeof registerAC>

// ACTION CREATORS
export const login = (payload: { name: string, _id: string, avatar?: string }) => ({
    type: AuthEnum.LOGIN,
    payload
} as const)
export const logOut = () => ({type: AuthEnum.LOGOUT} as const)
export const updateUser = (payload: { name?: string, avatar?: string }) => ({
    type: AuthEnum.UPDATE_USER,
    payload
} as const)
export const registerAC = (name: string, _id: string, isRegister: boolean) => ({
    type: AuthEnum.IS_REGISTER,
    payload: {name, _id, isRegister}
} as const)
export const loadingSpinner = (value: boolean) => ({type: AuthEnum.IS_LOADING, payload: {isLoading: value}} as const)
export const authentication = (value: boolean) => ({type: AuthEnum.IS_AUTH, payload: {isAuth: value}} as const)

// THUNK CREATORS
export const setLogOut = (): ThunkType =>
    async (dispatch) => {
        try {
            let resp = await authAPI.logOut()
            console.log(resp)
            dispatch(logOut())
        } catch (e) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            alert(error)
        }
    }
export const setLogin = (data: AuthObjType): ThunkType =>
    async (dispatch) => {
        try {
            dispatch(loadingSpinner(true))
            const {name, avatar, _id} = await authAPI.login(data)
            dispatch(login({name, avatar, _id}))
            dispatch(authentication(true))
        } catch (e) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            alert(error)
        } finally {
            dispatch(loadingSpinner(false))
        }
    }
export const registerTC = (data: AuthObjType): ThunkType =>
    async dispatch => {
        dispatch(loadingSpinner(true))
        try {
            const res = await authAPI.signUp(data)
            const {name, _id} = res.data.addedUser
            dispatch(registerAC(name, _id, true))
            dispatch(authentication(true))
        } catch (e) {
            alert(e.response.data.error)
        } finally {
            dispatch(loadingSpinner(false))
        }
    }

