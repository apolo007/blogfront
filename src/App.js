import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import PostPage from './pages/PostPage';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // True if token exists
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/admin/login" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: '1 0 auto' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/admin/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="/post/:slug" element={<PostPage />} />
            </Routes>
          </main>
          <Footer style={{ flexShrink: 0 }} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;