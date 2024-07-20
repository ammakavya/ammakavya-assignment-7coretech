import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPostList from './component/BlogPostList';
import BlogPostDetails from './component/BlogPostDetails';
import './App.css';

function App() {
  const [Posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get('https://newsapi.org/v2/everything?q=tesla&from=2024-06-19&sortBy=publishedAt&apiKey=a84b647866634dfb9cdcb5ec1126bdd3')
      .then(res => {
        setPosts(res.data.articles);
      }).catch(error => console.log(error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<BlogPostList />} />
          <Route path="/post/:id" element={<BlogPostDetails posts={Posts} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
