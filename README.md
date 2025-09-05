Blogify - Modern Blogging Platform
<img width="1339" height="813" alt="image" src="https://github.com/user-attachments/assets/7092fad8-3f5e-4fb3-a455-e953b9c5e210" />
Overview
Blogify is a clean, modern blogging platform that allows writers to share their thoughts, ideas, and expertise with the world. Built with a sleek dark-themed UI, Blogify provides an elegant reading and writing experience for both content creators and readers.

Features
User Authentication

Secure login/registration system
User profile management
Content Creation

Intuitive post editor
Tag support for categorization
Draft saving capability
Content Discovery

Featured post section for highlighted content
Latest posts feed
Comprehensive search functionality
User Dashboard

Post analytics
Content management
User settings
Responsive Design

Mobile-friendly interface
Dark/light theme toggle
Tech Stack
Frontend
React.js
CSS3 (Custom styling, no frameworks)
React Router for navigation
Backend
Node.js
Express.js
MongoDB for database
JWT for authentication
Installation
Prerequisites
Node.js (v14 or higher)
MongoDB
Setup Instructions
Clone the repository

Install dependencies

Environment Setup

Create a .env file in the server directory with the following variables:
Run the application

Access the application

Frontend: http://localhost:5173
Backend API: http://localhost:5000
Usage
Creating an Account
Navigate to the registration page
Enter your name, email, and password
Follow the verification process if enabled
Creating a Post
Log in to your account
Click on "Write" in the navigation bar
Fill in the post details (title, content, tags)
Click "Publish" to share your post
Browsing Content
The homepage displays featured and latest posts
Use the search bar to find posts by title, content, or tags
Click on a post to read the full content
Managing Your Content
Navigate to the Dashboard
View your published posts
Edit or delete your existing content
API Endpoints
Authentication
POST /api/auth/register - Register a new user
POST /api/auth/login - Login a user
GET /api/auth/profile - Get user profile
Posts
GET /api/posts - Get all posts
GET /api/posts/:id - Get a specific post
POST /api/posts - Create a new post
PUT /api/posts/:id - Update a post
DELETE /api/posts/:id - Delete a post
GET /api/posts/search - Search for posts
Contributing
We welcome contributions to Blogify! Please follow these steps:

Fork the repository
Create a new branch (git checkout -b feature/amazing-feature)
Make your changes
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
Email: support@blogify.com
Phone: +1 123 456 7890
© 2025 Blogify. All rights reserved.
