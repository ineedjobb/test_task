import React from 'react';
import Block from './components/Block';
import ArticleList from './components/ArticleList';

function App() {
  return (
    <div className="App">
      <div className="blocks_wrapper">
        <Block title="Frontend" subreddit="frontend" />
        <Block title="ReactJs" subreddit="reactjs" />
        <Block title="VueJs" subreddit="vuejs" />
        <Block title="Angular" subreddit="angular" />
        <ArticleList />
      </div>
    </div>
  );
}

export default App;
