import { all, call, put, takeLeading, takeEvery } from 'redux-saga/effects';
import { actionTypes, updateArticlesList, setIsLoading } from './actions';
import store from './index';
import { IFetchArticleAction, IBuffer, IDeleteArticleAction, IArticle, IChangeLikeArticleAction } from '../interfaces';
import { updateStorageArticles, updateStorageBuffer, getStorageBuffer, removeBufferField, runClearBuferTimer, getRandomIndex } from '../utils';

let buffer = getStorageBuffer();

for (let key in buffer) {
    runClearBuferTimer(key, buffer);
}

function* fetchArticles({ subreddit }: IFetchArticleAction) {
    const articles = store.getState().articles
    yield put(setIsLoading(true));
    console.log(buffer[subreddit]?.length, 'lenght')
    if (!buffer[subreddit]?.length) {
        const data = yield call(fetch, `https://www.reddit.com/r/${subreddit}.json`);
        const json = yield call(() => data.json());

        buffer[subreddit] = json.data.children.map((child: any) => child.data);
        updateStorageBuffer(buffer);
        runClearBuferTimer(subreddit, buffer);
    }
    const randomIndex = getRandomIndex(buffer[subreddit].length - 1)
    console.log(randomIndex, 'index')
    const newArticle = buffer[subreddit].splice(randomIndex, 1)[0];
    console.log(newArticle, 'new article')
    const { title, url, name } = newArticle;

    const updatedArticles = [
        ...articles,
        { title, url, id: `${name}_${performance.now()}`, isLiked: false }
    ];

    yield put(updateArticlesList(updatedArticles));

    updateStorageArticles(updatedArticles);
    updateStorageBuffer(buffer);
    yield put(setIsLoading(false));
}

function* changeLikeArticle({ id, isLiked }: IChangeLikeArticleAction) {
    const articles = store.getState().articles.slice();
    let articleIndex = articles.findIndex((article: IArticle) => article.id === id)
    if (articleIndex !== -1) {
        const clone = Object.assign({}, articles[articleIndex], { isLiked: !isLiked });
        articles.splice(articleIndex, 1, clone)

        yield put(updateArticlesList(articles));

        updateStorageArticles(articles);
    }
}

function* removeArticle({ id }: IDeleteArticleAction) {
    const articles = store.getState().articles.slice();
    let articleIndex = articles.findIndex((article: IArticle) => article.id === id)
    if (articleIndex !== -1) {
        articles.splice(articleIndex, 1)

        yield put(updateArticlesList(articles));

        updateStorageArticles(articles);
    }
}

function* watchFetchArticles() {
    yield takeLeading(actionTypes.FETCH_ARTICLES, fetchArticles)
}

function* watchDeleteArticle() {
    yield takeEvery(actionTypes.DELETE_ARTICLE, removeArticle)
}

function* watchChangeLikeArticle() {
    yield takeEvery(actionTypes.CHANGE_LIKE_ARTICEL, changeLikeArticle)
}

export default function* rootSaga() {
    yield all([
        watchFetchArticles(),
        watchChangeLikeArticle(),
        watchDeleteArticle(),
    ])
}