import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
  getMyPosts, // Import new controller
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(protect, createPost);
router.get('/search', searchPosts);
router.get('/myposts', protect, getMyPosts); // Add route for user's posts

router
  .route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;