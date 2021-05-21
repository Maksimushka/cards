import {DecksThunkType, ThunkType} from '../store';
import {cardsAPI} from '../../dal/API';
import {setDecks} from './decks-action';

export const getDecks = (): DecksThunkType =>
    async (dispatch, getState) => {
        try {
            const params = getState().decks.params
            const {data} = await cardsAPI.getDecks(params)
            console.log(data.cardPacks)
            dispatch(setDecks(data.cardPacks))
        } catch (e) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            alert(error)
        }
    }