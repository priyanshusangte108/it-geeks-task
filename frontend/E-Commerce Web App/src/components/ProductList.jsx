



// import ProductCard from './ProductCard';
// import { motion } from 'framer-motion';

// const ProductList = ({ products }) => {
//   return (
//     <div className="flex flex-wrap justify-center gap-6">
//       {products.map((product, index) => (
//         <motion.div
//           key={product._id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: index * 0.05 }}
//           whileHover={{ scale: 1.05 }}
//           className="cursor-pointer flex-shrink-0 w-[30%]"
//         >
//           <ProductCard {...product} />
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;






import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const ProductList = ({ products }) => {
  console.log('---product',products)
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-10 mb-10"> {/* <-- added mt-10 */}
      {products.map((product, index) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer flex-shrink-0 w-[30%]"
        >
          <ProductCard {...product} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductList;
