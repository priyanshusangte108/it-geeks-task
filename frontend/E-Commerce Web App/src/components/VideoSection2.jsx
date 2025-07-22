import React from 'react';
import promoVideo from '../assets/video-2.jpg'; // ✅ Ensure it's a .mp4 or .webm file

const VideoSection2 = () => {
  return (
    <div className="w-full mt-20 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Left: Video */}
        <div className="w-full lg:w-1/2 h-[380px] sm:h-[420px] md:h-[480px] lg:h-[520px] rounded-xl overflow-hidden shadow-2xl mb-10 lg:mb-0">
          <video
            src={promoVideo}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls={false} // Hide all player UI
          />
        </div>

        {/* Right: Text */}
        <div className="w-full lg:w-1/2 px-4 lg:px-10">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            Smarter Shopping Starts Here
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Experience a modern, secure, and lightning-fast e-commerce platform with a focus on user experience and technology.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Enjoy seamless checkout, real-time updates, and stunning visuals powered by Cloudinary and Stripe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoSection2;
