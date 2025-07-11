import React from 'react';
import PromoVideo from '../assets/video1.mp4';  // Adjust path to video

const VideoSection = () => {
  return (
    <div className="relative mb-8">
      <video className="w-full h-[400px] object-cover rounded-xl" autoPlay loop muted>
        <source src={PromoVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Text on Video */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white text-3xl font-bold text-center px-6">
        <h1>Welcome to Our E-Commerce Store</h1>
        <p>Discover amazing products just for you!</p>
      </div>
    </div>
  );
};

export default VideoSection;
