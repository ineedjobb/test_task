import { Action } from "redux";
import { actionTypes } from './store/actions';

export interface IArticle {
    title: string;
    url: string;
    id: string;
    isLiked: boolean;
}

export interface IBuffer {
    [key: string]: any[];
}

export interface IFetchArticleAction extends Action<actionTypes.FETCH_ARTICLES> {
    subreddit: string;
}

export interface IUpdateArticlesListAction extends Action<actionTypes.UPDATE_ARTICLES_LIST> {
    articles: IArticle[];
}

export interface ISetIsLoadingAction extends Action<actionTypes.SET_IS_LOADING> {
    isLoading: boolean;
}

export interface IDeleteArticleAction extends Action<actionTypes.DELETE_ARTICLE> {
    id: string;
}

export interface IChangeLikeArticleAction extends Action<actionTypes.CHANGE_LIKE_ARTICEL> {
    id: string;
    isLiked: boolean;
}

export type AppAction =
    IFetchArticleAction |
    IUpdateArticlesListAction |
    ISetIsLoadingAction |
    IDeleteArticleAction |
    IChangeLikeArticleAction