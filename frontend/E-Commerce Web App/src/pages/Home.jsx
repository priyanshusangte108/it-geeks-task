// src/pages/HomePage.jsx
import React from "react";

import ProductListPage from "./ProductListPage"; // Reuse existing list page


const Home = () => {
  return (
    <div className="w-full">
     
      <ProductListPage />
    </div>
  );
};

export default Home;
