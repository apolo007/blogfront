import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import PostPage from './pages/PostPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/post/:slug" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;