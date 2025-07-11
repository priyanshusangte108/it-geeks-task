



import React, { useEffect, useState } from "react";
import api from "../services/api";

import VideoSection from "../components/videosection";
import ImageSection from "../components/Imagesection";
import ProductList from "../components/ProductList";
import ProductFilter from "../components/ProductFilter";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
        setFiltered(res.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredData = products;

    if (search.trim() !== "") {
      filteredData = filteredData.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      filteredData = filteredData.filter((p) => p.category === category);
    }

    setFiltered(filteredData);
  }, [search, category, products]);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <VideoSection />

        <h1 className="text-3xl font-extrabold mb-10 text-center text-gray-900">
          🛍️ All Products
        </h1>

        <ImageSection />

        {/* Filter Controls */}
        <div className="mb-10">
          <ProductFilter
            categories={categories}
            selectedCategory={category}
            onCategoryChange={setCategory}
            searchTerm={search}
            onSearchChange={setSearch}
          />
        </div>

        {/* Product Grid - 3 items per row */}
        {filtered.length === 0 ? (
          <p className="text-gray-600 text-lg text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ProductList products={filtered} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
