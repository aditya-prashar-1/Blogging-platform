import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const SearchResultsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/api/posts/search?q=${encodeURIComponent(searchQuery)}`);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="search-results">
      <h1>Search Results for "{searchQuery}"</h1>
      
      {loading ? (
        <p>Searching...</p>
      ) : posts.length === 0 ? (
        <div className="mt-3">
          <p>No results found for "{searchQuery}".</p>
          <p className="mt-2">Try another search term or browse our <Link to="/">latest posts</Link>.</p>
        </div>
      ) : (
        <>
          <p className="mb-3">Found {posts.length} result{posts.length !== 1 ? 's' : ''}</p>
          <div className="posts-grid">
            {posts.map(post => (
              <Link key={post._id} to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ padding: '1.25rem' }}>
                    <h3>{post.title}</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                      By {post.author?.name || 'Anonymous'} • {format(new Date(post.createdAt), 'MMM d, yyyy')}
                    </p>
                    <p style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                      {post.content.substring(0, 120)}
                      {post.content.length > 120 ? '...' : ''}
                    </p>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div>
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="badge badge-primary">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;