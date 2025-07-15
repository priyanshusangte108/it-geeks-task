

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
import CartPage from "./pages/CardPages"; // fix: you wrote CardPages - assuming CartPage
import Home from "./pages/Home";
import SearchResultsPage from "./pages/SearchResultsPage";
import { WishlistProvider } from "./context/WishlistContext";
import ProfilePage from "./pages/ProfilePage";

import CheckoutPage from "./pages/CheckoutPage";         // New
import OrderSuccessPage from "./pages/OrderSuccessPage"; // New

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes with layout */}
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
              path="/"
              element={
                <PrivateRoute>
                  <Layoutwrapper>
                    <Home />
                  </Layoutwrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <Layoutwrapper>
                    <SearchResultsPage />
                  </Layoutwrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Layoutwrapper>
                    <CartPage/>
                  </Layoutwrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Layoutwrapper>
                    <ProfilePage />
                  </Layoutwrapper>
                </PrivateRoute>
              }
            />

            {/* NEW Checkout route */}
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Layoutwrapper>
                    <CheckoutPage />
                  </Layoutwrapper>
                </PrivateRoute>
              }
            />

            {/* NEW Order success route */}
            <Route
              path="/order-success"
              element={
                <PrivateRoute>
                  <Layoutwrapper>
                    <OrderSuccessPage />
                  </Layoutwrapper>
                </PrivateRoute>
              }
            />


            



            {/* Fallback */}
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
