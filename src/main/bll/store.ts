import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from './authReducer'

const reducers = combineReducers({
    authReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type RootStoreType = typeof reducers