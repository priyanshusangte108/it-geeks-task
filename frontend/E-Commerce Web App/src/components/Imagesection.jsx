import React from 'react';
import Image1 from '../assets/image1.jpg';
import Image2 from '../assets/image2.jpg';
import Image3 from '../assets/image3.jpg';
import Image4 from '../assets/image4.jpg';

const ImageSection = () => {
  const images = [
    { src: Image1, label: 'Modern Furniture' },
    { src: Image2, label: 'Luxury Sofa' },
    { src: Image3, label: 'Smart Lighting' },
    { src: Image4, label: 'Elegant Decor' },
  ];

  return (
    <div className="flex justify-center gap-6 flex-wrap mb-16">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative w-[250px] h-[300px] overflow-hidden group transition-all duration-500 ease-in-out"
        >
          <img
            src={image.src}
            alt={`image-${index}`}
            className="w-full h-full object-cover brightness-90 rounded-xl
              group-hover:w-[180px] group-hover:h-[300px] group-hover:rounded-full
              transition-all duration-500"
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-lg font-semibold">
            <span>{image.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageSection;
