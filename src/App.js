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
import AboutUs from "./pages/AboutUs";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import AdvertiseWithUs from "./pages/AdvertiseWithUs";
import Careers from "./pages/Careers";
import ContactExperts from "./pages/ContactExperts";
import ContactUs from "./pages/ContactUs";
import CookiesPolicy from "./pages/CookiesPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

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
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/AccessibilityStatement" element={<AccessibilityStatement />} />
              <Route path="/AdvertiseWithUs" element={<AdvertiseWithUs />} />
              <Route path="/Careers" element={<Careers />} />
              <Route path="/ContactExperts" element={<ContactExperts />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/CookiesPolicy" element={<CookiesPolicy />} />
              <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
              <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
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