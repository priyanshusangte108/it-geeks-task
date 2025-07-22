// src/pages/HomePage.jsx
import React from "react";

import ProductListPage from "./ProductListPage"; // Reuse existing list page
import VideoSection2 from "../components/VideoSection2";


const Home = () => {
  return (
    <div className="w-full">
     
      <ProductListPage />
      <VideoSection2 className="mt-12" />

    </div>
  );
};

export default Home;
