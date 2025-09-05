import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Toaster position="top-center" />
        <Routes>
          {/* Main layout routes */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Route>
          
          {/* Auth pages without main layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;