import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {authReducer} from './authReducer'
import {AuthActionsTypes} from './auth-actions';

const reducers = combineReducers({
    authReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

// типизация санки
export type ThunkType = ThunkAction<void, RootStoreType, unknown, AuthActionsTypes>

export type RootStoreType = typeof reducers
