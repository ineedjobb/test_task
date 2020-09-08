import React, { useCallback } from 'react';
import {
    IArticle,
    IChangeLikeArticleAction,
    IDeleteArticleAction
} from '../interfaces';
import { changeLikeArticle, deleteArticle } from '../store/actions';
import { connect } from 'react-redux';

interface Props extends IArticle {
    changeLikeArticle: (id: string, isLiked: boolean) => IChangeLikeArticleAction;
    deleteArticle: (id: string) => IDeleteArticleAction;
}

const Article: React.FC<Props> = ({ title, url, id, isLiked, changeLikeArticle, deleteArticle }) => {

    const likeClickHandler = useCallback(() => {
        changeLikeArticle(id, isLiked)
    }, [id, isLiked])

    const deleteHandler = useCallback(() => {
        deleteArticle(id)
    }, [])

    return (
        <div className="article">
            <div onClick={likeClickHandler} className={`like${isLiked ? ' is_liked' : ''}`} />
            <div onClick={deleteHandler} className="bucket" />
            <a href={url} target="_blank">{title}</a>
        </div>
    )
};

const mapDispatchToProps = {
    changeLikeArticle,
    deleteArticle
}

export default connect(null, mapDispatchToProps)(Article);