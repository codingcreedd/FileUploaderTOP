import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LogInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <div className="mb-10">
        Don't have an account?{' '}
        <Link to="/signup" className="text-sm text-blue-600 underline">
          Click here to sign up
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer w-full bg-transparent border-b-2 border-blue-600 text-lg focus:outline-none focus:border-blue-400 text-white"
          />
          <label
            htmlFor="email"
            className="absolute left-0 top-0 transform -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 text-blue-600 transition-all duration-300"
          >
            Email
          </label>
        </div>

        <div className="relative">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            className="peer w-full bg-transparent border-b-2 border-blue-600 text-lg focus:outline-none focus:border-blue-400 text-white"
          />
          <label
            htmlFor="password"
            className="absolute left-0 top-0 transform -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 text-blue-600 transition-all duration-300"
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold text-lg transition-all duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LogInForm;
