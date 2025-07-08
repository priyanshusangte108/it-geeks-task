import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login to Your Account</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        )}

       <form onSubmit={handleSubmit} className="flex flex-col items-center">
  <motion.input
    type="email"
    placeholder="Email"
    required
    value={email}
    onChange={e => setEmail(e.target.value)}
    whileFocus={{ scale: 1.05, boxShadow: '0 0 8px rgb(59 130 246)' }}
    className="w-1/2 px-4  py-3 border border-gray-300 rounded focus:outline-none mt-5 mb-3"
  />

  <motion.input
    type="password"
    placeholder="Password"
    required
    value={password}
    onChange={e => setPassword(e.target.value)}
    whileFocus={{ scale: 1.05, boxShadow: '0 0 8px rgb(59 130 246)' }}
    className="w-1/2 px-4 py-3 border border-gray-300 rounded focus:outline-none mb-5"
  />

  <motion.button
    type="submit"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-1/2   bg-blue-600 text-white py-3 rounded font-semibold shadow-md hover:bg-blue-700 transition mb-5"
  >
    Login
  </motion.button>
</form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
