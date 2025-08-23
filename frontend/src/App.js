import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PostPage from './pages/PostPage.jsx';
import Login from './pages/Login.jsx';
import PrivateRoute from'./components/PrivateRoutes.jsx';
import ProblemRegister from './pages/ProblemRegister.jsx';
import ProblemDetail from './pages/ProblemDetail.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<ProblemPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/problems/new"
            element={
              <PrivateRoute>
                <ProblemRegister />
              </PrivateRoute>
            }
        ></Route>
        <Route path="/problems/:id" element={<ProblemDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
