import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div style={{ columnCount: 3, columnGap: "1.5rem" }} className="space-y-6">
      {products.map(({ _id, title, description, price, image }) => (
        <ProductCard
          key={_id}
          _id={_id}
          title={title}
          description={description}
          price={price}
          image={image}
        />
      ))}
    </div>
  );
};

export default ProductList;
