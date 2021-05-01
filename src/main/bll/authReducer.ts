import {AuthActionsTypes, AuthEnum} from './auth-actions'

const initialState = {
  name: null as string | null,
  _id: null as string | null,
  avatar: null as string | null,
  isLoading: false,
  isAuth:false,
}

export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsTypes): InitialStateType => {
  switch (action.type) {
    case AuthEnum.LOGIN:
      return {...state, ...action.value}
    case AuthEnum.LOGOUT:
      return {...state,name: null, _id: null, avatar: null}
    case AuthEnum.UPDATE_USER:
      return {...state, ...action.value}
    case AuthEnum.IS_LOADING:
      return {...state,isLoading: true}
    default:
      return state
  }
}
