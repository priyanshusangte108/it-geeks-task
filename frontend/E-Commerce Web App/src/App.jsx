


// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Layoutwrapper from "./components/Layout/Layoutwrapper";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import { CartContext } from "./context/CartContext";

const App = () => {
  return (
    <CartContext>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layoutwrapper>
                  <ProductListPage />
                </Layoutwrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <PrivateRoute>
                <Layoutwrapper>
                  <ProductDetailPage testId={1} />
                </Layoutwrapper>
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </CartContext>
  );
};

export default App;
