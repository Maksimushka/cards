import {DecksStateType} from './decks-types';
import {DecksActionsTypes, DecksActionType} from './decks-action';

const initialState: DecksStateType = {
    listOfDecks: [],
    params: {
        packName: null,
        min: null,
        max: null,
        userId: null,
        page: 1,
        pageCount: 10,
    }
}

export const decksReducer = (state = initialState, action: DecksActionType): DecksStateType => {
    switch (action.type) {
        case DecksActionsTypes.SET_NEW_PARAMS:
            return {
                ...state,
                params: {...state.params, ...action.payload}
            }
        case DecksActionsTypes.SET_DECKS:
            return {
                ...state,
                listOfDecks: action.payload
            }
        default:
            return state
    }
}