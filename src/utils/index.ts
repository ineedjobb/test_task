import { IArticle, IBuffer } from '../interfaces';

export const getRandomIndex = (length: number): number => {
    const randomNumber = Math.random() * length;
    return Math.round(randomNumber);
}

export const updateStorageArticles = (articles: IArticle[]): void => {
    localStorage.setItem('articles', JSON.stringify(articles));
}

export const getStorageBuffer = (): IBuffer => {
    const storageBuffer = localStorage.getItem('buffer')
    return storageBuffer ? JSON.parse(storageBuffer) : {}
}

export const updateStorageBuffer = (buffer: IBuffer): void => {
    localStorage.setItem('buffer', JSON.stringify(buffer));
}

export const removeBufferField = (subreddit: string): IBuffer => {
    const storageBuffer = getStorageBuffer();
    console.log(storageBuffer, storageBuffer[subreddit])
    if (storageBuffer[subreddit]) {
        delete storageBuffer[subreddit];
        updateStorageBuffer(storageBuffer);
    }
    return storageBuffer;
}

export const runClearBuferTimer = (subreddit: string, buffer: IBuffer): void => {
    setTimeout(() => {
        buffer = removeBufferField(subreddit)
    }, 120000)
}