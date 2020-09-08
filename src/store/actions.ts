import { 
    IFetchArticleAction, 
    IArticle, 
    IUpdateArticlesListAction, 
    ISetIsLoadingAction,
    IDeleteArticleAction,
    IChangeLikeArticleAction,
} from "../interfaces";

export enum actionTypes {
    FETCH_ARTICLES = 'FETCH_ARTICLES',
    UPDATE_ARTICLES_LIST = 'UPDATE_ARTICLES_LIST',
    SET_IS_LOADING = 'SET_IS_LOADING',
    DELETE_ARTICLE = 'DELETE_ARTICLE',
    CHANGE_LIKE_ARTICEL = 'CHANGE_LIKE_ARTICLE',
}

export const fetchArticles = (subreddit: string): IFetchArticleAction => ({
    type: actionTypes.FETCH_ARTICLES,
    subreddit,
});

export const updateArticlesList = (articles: IArticle[]): IUpdateArticlesListAction => ({
    type: actionTypes.UPDATE_ARTICLES_LIST,
    articles,
})

export const setIsLoading = (isLoading: boolean): ISetIsLoadingAction => ({
    type: actionTypes.SET_IS_LOADING,
    isLoading,
})

export const deleteArticle = (id: string): IDeleteArticleAction => ({
    type: actionTypes.DELETE_ARTICLE,
    id
})

export const changeLikeArticle = (id: string, isLiked: boolean): IChangeLikeArticleAction => ({
    type: actionTypes.CHANGE_LIKE_ARTICEL,
    id,
    isLiked
})