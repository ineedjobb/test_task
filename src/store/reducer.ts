import { actionTypes } from './actions';
import { IArticle, AppAction } from '../interfaces';

const storageItems = localStorage.getItem('articles')

const initialState = {
    articles: storageItems ? JSON.parse(storageItems) : [] as IArticle[],
    isLoading: false,
};

export type AppSate = typeof initialState

export const reducer = (state: AppSate = initialState, action: AppAction) => {
    switch (action.type) {
        case actionTypes.UPDATE_ARTICLES_LIST:
            return {
                ...state,
                articles: action.articles,
            }
        case actionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            }
        default:
            return state;
    }
}