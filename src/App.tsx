import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Playlists from './pages/Playlists';
import MoodSelection from './pages/MoodSelection';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuthStore } from './store/authStore';
import PlaylistDetail from './pages/PlaylistDetail';
import NotFound from './pages/Explore';

function App() {
  const { checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          
          {/* Protected Routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="playlists" element={
            <ProtectedRoute>
              <Playlists />
            </ProtectedRoute>
          } />
          <Route path="playlists/:id" element={
            <ProtectedRoute>
              <PlaylistDetail />
            </ProtectedRoute>
          } />
          <Route path="moods" element={
            <ProtectedRoute>
              <MoodSelection />
            </ProtectedRoute>
          } />
          
          {/* 404 and redirects */}
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;