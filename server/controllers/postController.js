import Post from '../models/PostModel.js';

// @desc    Create a new post
export const createPost = async (req, res) => {
  const { title, content, featuredImage, tags } = req.body;
  try {
    const post = new Post({
      title,
      content,
      featuredImage,
      tags,
      author: req.user._id,
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('author', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Update a post
export const updatePost = async (req, res) => {
  const { title, content, featuredImage, tags } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if the user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.featuredImage = featuredImage || post.featuredImage;
    post.tags = tags || post.tags;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Search for posts
export const searchPosts = async (req, res) => {
  const query = req.query.q;
  try {
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ],
    }).populate('author', 'name');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};