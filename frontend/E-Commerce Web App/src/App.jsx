

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateRoute from "./components/PrivateRoute";
import Layoutwrapper from "./components/Layout/Layoutwrapper";

import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import PrivateAdminRoute from "./routes/PrivateAdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductPage from "./pages/admin/ProductPage";
import OrdersPage from "./pages/admin/OrdersPage";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import WishlistPage from "./pages/WishListPage";

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User protected routes */}
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
                    <CartPage />
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
              
               <Route
              path="/wishlist"
              element={
                <PrivateRoute>
                  <Layoutwrapper>
                    <WishlistPage />
                  </Layoutwrapper>
                </PrivateRoute>
              }
              />

            {/* Admin routes */}
            <Route
              path="/admin/*"
              element={
                <PrivateAdminRoute>
                  <AdminLayout />
                </PrivateAdminRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<ProductPage />} />
              <Route path="orders" element={<OrdersPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
