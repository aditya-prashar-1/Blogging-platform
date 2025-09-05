import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import '../styles/Posts.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return toast.error('Title and content are required');
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      }, config);
      toast.success('Post created');
      navigate(`/post/${data._id}`);
    } catch {
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-container">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input id="title" className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a catchy title..." />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="tags">Tags (comma separated)</label>
          <input id="tags" className="form-input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="technology, programming, webdev" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="content">Content</label>
          <textarea id="content" className="form-textarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post here..." />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Publishing...' : 'Publish Post'}</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;