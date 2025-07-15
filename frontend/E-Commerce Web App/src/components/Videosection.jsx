
import React from 'react';
import PromoVideo from '../assets/video1.mp4'; // Adjust the path if needed

const VideoSection = () => {
  return (
    <div className="relative mb-8">
      {/* Video Background */}
      <video
        className="w-full h-[500px] object-cover rounded-xl"
        autoPlay
        loop
        muted
      >
        <source src={PromoVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Bottom Shadow for Text Visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-xl"></div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome to Our E-Commerce Store
        </h1>
        <p className="text-lg md:text-xl font-medium">
          Discover amazing products just for you!
        </p>
      </div>
    </div>
  );
};

export default VideoSection;
