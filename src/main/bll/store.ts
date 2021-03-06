import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {authReducer} from './auth/authReducer'
import {AuthActionsTypes} from './auth/auth-actions';
import {decksReducer} from "./decks/decks-reducer";
import {DecksActionType} from './decks/decks-action';

const rootReducer = combineReducers({
  user: authReducer,
  decks: decksReducer
})

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers((applyMiddleware(thunkMiddleware))))

export type RootStoreType =ReturnType<typeof rootReducer>
// типизация санки
export type ThunkType = ThunkAction<void, RootStoreType, unknown, AuthActionsTypes>

export type DecksThunkType = ThunkAction<void, RootStoreType, unknown, DecksActionType>




