// Simple Post page without node polyfills
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import '../styles/Posts.css';

const calcReadingTime = (text) => {
  const words = (text || '').trim().split(/\s+/).length || 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(data);
        if (data.tags?.length) {
          const { data: relatedData } = await axios.get(`http://localhost:5000/api/posts/search?q=${data.tags[0]}`);
          setRelatedPosts(relatedData.filter(p => p._id !== id).slice(0, 3));
        } else {
          const { data: recentData } = await axios.get('http://localhost:5000/api/posts');
          setRelatedPosts(recentData.filter(p => p._id !== id).slice(0, 3));
        }
      } catch (e) {
        toast.error('Failed to load the post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  const handleDelete = async () => {
    if (!user) return;
    if (!window.confirm('Delete this post?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`http://localhost:5000/api/posts/${id}`, config);
      toast.success('Post deleted');
      navigate('/');
    } catch {
      toast.error('Failed to delete post');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div className="text-center">Post not found. <Link to="/">Go home</Link></div>;

  const isAuthor = user && post.author && user._id === post.author._id;
  const formattedContent = post.content.split('\n\n').map((p, i) => <p key={i} style={{ marginBottom: '1.25rem' }}>{p}</p>);
  const stats = calcReadingTime(post.content);

  return (
    <>
      <article className="post-page-container">
        <header style={{ marginBottom: 24 }}>
          {post.tags?.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              {post.tags.map((t, i) => (
                <span key={i} className="badge badge-primary" style={{ marginRight: 8 }}>{t}</span>
              ))}
            </div>
          )}
          <h1 className="post-page-title">{post.title}</h1>
          <div className="post-page-meta">
            {post.author?.name || 'Anonymous'} • {format(new Date(post.createdAt), 'MMM d, yyyy')} • {stats}
          </div>
        </header>

        {post.featuredImage && (
          <img src={post.featuredImage} alt={post.title} style={{ width: '100%', borderRadius: 12, marginBottom: 24 }} />
        )}

        <div className="post-page-content">{formattedContent}</div>

        {isAuthor && (
          <div style={{ marginTop: 24 }}>
            <button onClick={handleDelete} className="btn btn-secondary">Delete Post</button>
          </div>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ marginBottom: 16 }}>Related Posts</h2>
          <div className="posts-grid">
            {relatedPosts.map(r => (
              <Link key={r._id} to={`/post/${r._id}`} className="post-card">
                <div className="post-card-content">
                  <h3 className="post-card-title">{r.title}</h3>
                  <p className="post-card-meta">
                    By {r.author?.name || 'Anonymous'} • {format(new Date(r.createdAt), 'MMM d, yyyy')}
                  </p>
                  <p className="post-card-excerpt">{(r.content || '').slice(0, 120)}...</p>
                </div>
                <div className="post-card-footer">Read More</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;