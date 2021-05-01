import { Dispatch } from "redux"
import { authAPI } from "../dal/API"

// TYPES
export enum AuthEnum {
    LOGIN = 'AUTH/LOGIN',
    LOGOUT = 'AUTH/LOGOUT',
    UPDATE_USER = 'AUTH/UPDATE_USER'
}
export type AuthActionsTypes = ReturnType<typeof loginAC> | ReturnType<typeof logOutAC> | ReturnType<typeof updateUserAC>

// ACTION CREATORS
export const loginAC = (value: { name: string, _id: string, avatar?: string }) => ({
    type: AuthEnum.LOGIN,
    value
} as const)
export const logOutAC = () => ({ type: AuthEnum.LOGOUT } as const)
export const updateUserAC = (value: {name?: string, avatar?: string}) => ({ type: AuthEnum.UPDATE_USER, value } as const)

// THUNK CREATORS
export const setLogOut = () => async (dispatch: Dispatch) => {
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