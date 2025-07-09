// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Layoutwrapper from './components/Layout/Layoutwrapper';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layoutwrapper>
                <Dashboard />
              </Layoutwrapper>
            </PrivateRoute>
          }
        />
        
        {/* Catch-all route for redirecting unknown paths */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
