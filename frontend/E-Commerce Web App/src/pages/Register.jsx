import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role , setRole] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/api/auth/', { name, email, password , role });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Create an Account</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            whileFocus={{ scale: 1.05, boxShadow: '0 0 8px rgb(139 92 246)' }}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none"
          />

          <motion.input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            whileFocus={{ scale: 1.05, boxShadow: '0 0 8px rgb(139 92 246)' }}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none"
          />

          <motion.input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            whileFocus={{ scale: 1.05, boxShadow: '0 0 8px rgb(139 92 246)' }}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-600 text-white py-3 rounded font-semibold shadow-md hover:bg-purple-700 transition"
          >
            Register
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
