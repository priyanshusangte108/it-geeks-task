import React from 'react';
import Image1 from '../assets/image1.jpg';
import Image2 from '../assets/image2.jpg';
import Image3 from '../assets/image3.jpg';
import Image4 from '../assets/image4.jpg';

const ImageSection = () => {
  const images = [
    { src: Image1, label: 'Womens' },
    { src: Image2, label: 'jewelery' },
    { src: Image3, label: 'Mens' },
    { src: Image4, label: 'electronics' },
  ];

  return (
    <div className="w-full flex justify-center items-center gap-8 px-6 ">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative w-[300px] h-[350px] overflow-hidden group transition-all duration-500"
        >
          <img
            src={image.src}
            alt={`image-${index}`}
            className="w-full h-full object-cover brightness-90 rounded-xl transition-all duration-500 ease-in-out
              group-hover:rounded-full group-hover:w-[250px] group-hover:h-[300px] group-hover:mx-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-lg font-semibold">
            {image.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageSection;
