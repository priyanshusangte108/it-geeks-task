


// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Layoutwrapper from "./components/Layout/Layoutwrapper";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CardPages";



const App = () => {
  return (
    <CartProvider>
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
                  <ProductDetailPage />
                </Layoutwrapper>
              </PrivateRoute>
            }
          />

          <Route
  path="/cart"
  element={
    <PrivateRoute>
      <Layoutwrapper>
        <CartPage />
      </Layoutwrapper>
    </PrivateRoute>
  }
/>

          {/* Fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
