// src/Routes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
import LandingPage from './Pages/LandingPage';
import Register from './components/Registration'; // Ensure proper casing
import profile from './components/Profile'; // Ensure proper casing
import CreateCore from './Pages/CreateCore'; // Ensure proper casing
import ProtectedRoute from './components/ProtectedRoute';
import CorePage from './components/CorePage';
import HashtagPage from './components/HashtagPage';
import HashtagsSection from './components/HashtagsSection';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hashtag/:tag"
          element={
            <ProtectedRoute>
              <HashtagPage /> {/* Route for hashtag filtering */}
            </ProtectedRoute>
          }
        />
        {/* Additional routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-core"
          element={
            <ProtectedRoute>
              <CreateCore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/core/:id"
          element={
            <ProtectedRoute>
              <CorePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hashtags"
          element={
            <ProtectedRoute>
              <HashtagsSection />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
