

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        const fetched = res.data.product || res.data;
        setProduct(fetched);

        const first = fetched.images?.[0];
        const url = typeof first === "string" ? first : first?.url;
        setSelectedImage(url || fetched.image || null);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`Added "${product.title}" to cart!`);
  };

  if (loading) return <div className="p-6">Loading product...</div>;
  if (!product) return <div className="p-6 text-red-600">Product not found.</div>;

  return (
    <>
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
                  className="rounded-lg shadow-lg object-contain w-full h-[400px] md:h-[500px] cursor-zoom-in"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/500?text=No+Image"; }}
                />
              ) : (
                <div className="w-full h-[400px] md:h-[500px] bg-gray-200 flex items-center justify-center rounded-lg">
                  No Image Available
                </div>
              )}
            </AnimatePresence>

            <div className="mt-4 flex gap-3 overflow-x-auto">
              {(product.images || []).map((img, i) => {
                const url = typeof img === "string" ? img : img.url;
                return (
                  <img
                    key={i}
                    src={url}
                    alt={`Thumb ${i + 1}`}
                    className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${selectedImage === url ? "border-blue-700" : "border-transparent"}`}
                    onClick={() => setSelectedImage(url)}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/64?text=No"; }}
                  />
                );
              })}
            </div>

            {/* View Image Button */}
            {selectedImage && (
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
              >
                View Image
              </button>
            )}
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

            <motion.button
              onClick={handleAddToCart}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.img
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-full rounded-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetailPage;
