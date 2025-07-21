
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import your local image (adjust filename if needed)
import registerBg from '../assets/register.webp';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/api/auth/', { name, email, password, role });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom right,
            rgba(94, 82, 122, 0.7),
            rgba(121, 73, 97, 0.7)
          ),
          url(${registerBg})
        `,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Get Started - Create Your Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            whileFocus={{ scale: 1.03 }}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <motion.input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            whileFocus={{ scale: 1.03 }}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <motion.input
            type="password"
            placeholder="Create Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.03 }}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Optional Role Input (can be used for admin/user selection) */}
          <motion.input
            type="text"
            placeholder="Role (optional)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            whileFocus={{ scale: 1.03 }}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-600 text-white py-3 rounded font-semibold shadow-md hover:bg-purple-700 transition"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already registered?{' '}
          <Link to="/login" className="text-purple-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
