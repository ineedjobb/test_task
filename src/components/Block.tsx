import React from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from '../store/actions'
import { IFetchArticleAction } from '../interfaces';

type Props = {
    title: string;
    subreddit: string;
    fetchArticles: (subreddit: string) => IFetchArticleAction;
}

const Block: React.FC<Props> = ({ title, subreddit, fetchArticles }) => {
    return (
        <div
            onClick={() => fetchArticles(subreddit)}
            className="block"
        >
            {title}
        </div>
    )
};

const mapDispatchToProps = {
    fetchArticles
}


export default connect(null, mapDispatchToProps)(Block);