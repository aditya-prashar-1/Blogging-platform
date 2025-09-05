import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import '../styles/Posts.css';

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchMyPosts = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/posts/myposts', config);
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/posts/${id}`, config);
        toast.success('Post deleted.');
        fetchMyPosts(); // Refresh the list
      } catch (error) {
        toast.error('Failed to delete post.');
      }
    }
  };

  if (loading) return <div>Loading your posts...</div>;

  return (
    <div className="form-page-container">
      <h1>My Dashboard</h1>
      <ul className="dashboard-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post._id} className="dashboard-item">
              <span className="dashboard-item-title">{post.title}</span>
              <div className="dashboard-item-actions">
                <button onClick={() => handleDelete(post._id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>You haven't written any posts yet.</p>
        )}
      </ul>
    </div>
  );
};

export default DashboardPage;