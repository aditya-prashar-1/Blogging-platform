import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/posts');
        setPosts(data);
        
        // Set the most recent post as featured
        if (data.length > 0) {
          setFeaturedPost(data[0]);
        }
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return (
    <div className="text-center mt-4">
      <h2>Loading posts...</h2>
    </div>
  );

  if (error) return (
    <div className="text-center mt-4">
      <h2>Something went wrong</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="home-page">
      <section className="hero mb-4">
        <h1>Welcome to Blogify</h1>
        <p>Discover stories, ideas, and expertise from writers on any topic.</p>
      </section>

      {featuredPost && (
        <section className="featured-post mb-4">
          <h2 className="mb-2">Featured Post</h2>
          <div className="card">
            <Link to={`/post/${featuredPost._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              <div style={{ padding: '1.5rem' }}>
                <h3>{featuredPost.title}</h3>
                <p className="mb-2" style={{ color: 'var(--text-light)' }}>
                  By {featuredPost.author?.name || 'Anonymous'} • {format(new Date(featuredPost.createdAt), 'MMM d, yyyy')}
                </p>
                <p>
                  {featuredPost.content.substring(0, 200)}
                  {featuredPost.content.length > 200 ? '...' : ''}
                </p>
                
                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <div className="mt-2">
                    {featuredPost.tags.map((tag, idx) => (
                      <span key={idx} className="badge badge-primary">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="latest-posts">
        <h2 className="mb-3">Latest Posts</h2>
        {posts.length === 0 ? (
          <p>No posts found. Be the first to create one!</p>
        ) : (
          <div className="posts-grid">
            {posts.slice(featuredPost ? 1 : 0).map(post => (
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
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="badge badge-primary">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;