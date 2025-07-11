



// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../context/CartContext";



const ProductDetailPage = ({ testId }) => {
  // Normally get id from route params
  const params = useParams();
  const id = testId || params.id || 1;

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Use addToCart function from context
  const { addToCart } = useContext(CartContext);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`); // your backend route
      setProduct(res.data.product); // backend returns { product: {...} }
      setSelectedImage(res.data.product.image); // assumes 'image' is a URL string
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product); // Add product to cart via context
    alert(`${product.title} added to cart!`);
  };

  if (!product) {
    return (
      <div className="p-6 text-gray-700 dark:text-gray-300">
        Loading product...
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image Gallery */}
        <div className="md:w-1/2 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={product.title}
              className="rounded-lg shadow-lg object-cover w-full h-[400px] md:h-[500px] cursor-zoom-in"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => window.open(selectedImage, "_blank")}
              whileHover={{ scale: 1.05 }}
            />
          </AnimatePresence>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images?.map((imgObj, idx) => {
              const url = imgObj.url || imgObj;
              return (
                <img
                  key={idx}
                  src={url}
                  alt={`${product.title} thumbnail ${idx + 1}`}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage === url ? "border-blue-700" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(url)}
                />
              );
            })}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {product.title}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {product.description}
            </p>
            <p className="text-2xl font-semibold text-blue-600 mb-6">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddToCart}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <path d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
