

import React, { useEffect, useState } from "react";
import api from "../services/api";

import VideoSection from "../components/videosection";
import ImageSection from "../components/Imagesection";
import ProductList from "../components/ProductList";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 max-w-6xl mx-auto">
      <VideoSection />
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">🛍️ All Products</h1>
      <ImageSection />
      {products.length === 0 ? (
        <p className="text-gray-600 text-lg">No products found.</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default ProductListPage;
