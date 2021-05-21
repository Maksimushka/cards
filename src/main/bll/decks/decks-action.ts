import {DeskType, ParamsType} from './decks-types';

export type DecksActionType = ReturnType<typeof setNewParams> | ReturnType<typeof setDecks>

export enum DecksActionsTypes {
    SET_NEW_PARAMS = 'SET_NEW_PARAMS',
    SET_DECKS = 'SET_DECKS',
}

export const setNewParams = (payload: ParamsType) => ({
    type: DecksActionsTypes.SET_NEW_PARAMS,
    payload
} as const)

export const setDecks = (payload: DeskType[]) => ({
    type: DecksActionsTypes.SET_DECKS,
    payload
} as const)