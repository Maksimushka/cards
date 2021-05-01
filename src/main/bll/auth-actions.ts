import { Dispatch } from "redux"
import {authAPI, AuthObjType} from '../dal/API'
import {ThunkType} from './store';

// TYPES
export enum AuthEnum {
    LOGIN = 'AUTH/LOGIN',
    LOGOUT = 'AUTH/LOGOUT',
    UPDATE_USER = 'AUTH/UPDATE_USER',
    IS_LOADING = 'AUTH/IS_LOADING',
}
export type AuthActionsTypes = ReturnType<typeof loginAC>
    | ReturnType<typeof logOutAC>
    | ReturnType<typeof updateUserAC>
    | ReturnType<typeof loadingSpinner>

// ACTION CREATORS
export const loginAC = (value: { name: string, _id: string, avatar?: string }) => ({
    type: AuthEnum.LOGIN,
    value
} as const)
export const logOutAC = () => ({ type: AuthEnum.LOGOUT } as const)
export const updateUserAC = (value: {name?: string, avatar?: string}) => ({ type: AuthEnum.UPDATE_USER, value } as const)
export const loadingSpinner = (value:boolean) => ({ type: AuthEnum.IS_LOADING,value} as const)

// THUNK CREATORS
export const setLogOut = ():ThunkType =>
    async (dispatch) => {
    try {
        let resp = await authAPI.logOut()
        console.log(resp)
        logOutAC()
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        alert(error)
    }
}
export const login = (data:AuthObjType):ThunkType =>
    async (dispatch) => {
  try{
    dispatch(loadingSpinner(true))
    const user = await authAPI.login(data)

  }catch (e) {
    const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
    alert(error)
  }finally {
    dispatch(loadingSpinner(false))
  }
    }


