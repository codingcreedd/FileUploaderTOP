import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logs from '../apis/logs';
import {Context} from './ContextProvider';

const LogInForm = () => {
  const [email, setEmail] = useState('@gmail.com');
  const [password, setPassword] = useState('');

  const {setUser, setAuthState} = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await logs.post('/signin', {
            email: email,
            pw: password
        });
        if(response && response.data.authenticated) {
          setUser(response.data.user);
          setAuthState(true);
          navigate('/home');
          navigate(0);
        } else {
          setAuthState(false);
          navigate(0);
        }
    } catch (err) {
        console.error('Login error:', err.response ? err.response.data : err.message);
    }
};


  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <div className="mb-10">
        Don't have an account?{' '}
        <Link to="/signup" className="text-sm text-blue-800 underline">
          Click here to sign up
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className='flex flex-col gap-2'>
              <label htmlFor="email" className='text-sm text-gray-800'>Email</label>
              <input
                type="text"
                id='email'
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border border-blue-800 outline-none px-4 py-2 rounded-lg"
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="password" className='text-sm text-gray-800'>Password</label>
              <input
                type="password"
                id='password'
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-blue-800 outline-none px-4 py-2 rounded-lg"
              />
            </div>
        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-500 text-white py-3 rounded-lg font-bold text-lg transition-all duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LogInForm;
