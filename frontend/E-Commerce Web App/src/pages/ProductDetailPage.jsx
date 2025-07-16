
// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams(); // Correct way to get id

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!id) return; // Safety check

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);

        // Adjust based on your API response structure:
        // If API sends product inside res.data.product, use that.
        // If API sends product directly as res.data, use that instead.
        const fetchedProduct = res.data.product || res.data;

        setProduct(fetchedProduct);

        // Set first image or fallback to main image
        if (fetchedProduct.images && fetchedProduct.images.length > 0) {
          // images could be array of URLs or objects with url property
          const firstImage =
            typeof fetchedProduct.images[0] === "string"
              ? fetchedProduct.images[0]
              : fetchedProduct.images[0].url;

          setSelectedImage(firstImage);
        } else if (fetchedProduct.image) {
          setSelectedImage(fetchedProduct.image);
        } else {
          setSelectedImage(null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    alert(`${product.title} added to cart!`);
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-700 dark:text-gray-300">Loading product...</div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-red-600 dark:text-red-400">Product not found.</div>
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
        {/* Image Gallery */}
        <div className="md:w-1/2 flex flex-col">
          <AnimatePresence mode="wait">
            {selectedImage ? (
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
                onError={(e) => (e.target.src = "https://via.placeholder.com/500?text=No+Image")}
              />
            ) : (
              <div className="w-full h-[400px] md:h-[500px] bg-gray-200 flex items-center justify-center rounded-lg">
                No Image Available
              </div>
            )}
          </AnimatePresence>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {(product.images || []).map((imgObj, idx) => {
              const url = typeof imgObj === "string" ? imgObj : imgObj.url;
              return (
                <img
                  key={idx}
                  src={url}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage === url ? "border-blue-700" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(url)}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/64?text=No")}
                />
              );
            })}
          </div>
        </div>

        {/* Product Info */}
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
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
