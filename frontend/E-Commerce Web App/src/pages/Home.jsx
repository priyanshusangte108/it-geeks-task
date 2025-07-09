

import { motion } from 'framer-motion';
import Layoutwrapper from '../components/Layout/Layoutwrapper';

const Home = () => {
  return (
    <Layoutwrapper>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold text-primary">Welcome to Our E-Commerce Store</h1>
        <p className="text-lg text-gray-600">
          Explore our collection of amazing products.
        </p>
      </motion.div>
    </Layoutwrapper>
  );
};

export default Home;
