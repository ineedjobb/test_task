import React from 'react';
import { connect } from 'react-redux';
import Preloader from './Preloader'
import Article from './Article';
import { IArticle } from '../interfaces';
import { AppSate } from '../store/reducer';

type Props = {
    articles: IArticle[];
    isLoading: boolean;
}

const ArticleList: React.FC<Props> = ({ articles, isLoading }) => {
    return (
        <>
            {articles.map(article => (
                <Article
                    key={article.id}
                    {...article}
                />
            ))}
            {isLoading && <Preloader />}
        </>
    )
}

const mapStateToProps = (state: AppSate) => ({
    articles: state.articles,
    isLoading: state.isLoading,
})

export default connect(mapStateToProps)(ArticleList)