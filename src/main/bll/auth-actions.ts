import {authAPI, AuthObjType} from '../dal/API'
import {ThunkType} from './store';

// TYPES
export enum AuthEnum {
  LOGIN = 'AUTH/LOGIN',
  LOGOUT = 'AUTH/LOGOUT',
  UPDATE_USER = 'AUTH/UPDATE_USER',
  IS_LOADING = 'AUTH/IS_LOADING',
  IS_AUTH = 'AUTH/IS_AUTH',
}

export type AuthActionsTypes = ReturnType<typeof login>
    | ReturnType<typeof logOut>
    | ReturnType<typeof updateUser>
    | ReturnType<typeof loadingSpinner>
    | ReturnType<typeof authentication>

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


