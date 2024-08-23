import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logs from '../apis/logs'

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      const response = await logs.post('/signup', {
        first_name: firstName,
        last_name: lastName,
        email,
        password
      })
        .then(response => {
          navigate('/signin');
        })
    } catch(err) {
      console.log(err);
    }
    
  };

  return (
    <div className="">
      <div>
        <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
        <p className="mb-8">
          Have an account?{' '}
          <Link to="/signin" className="text-blue-800 hover:text-blue-400 underline">
            Click here to sign in
          </Link>
        </p>
        <form onSubmit={handleSignUp} className="space-y-6">
          
            <div className='flex flex-col gap-2'>
              <label htmlFor="firstname" className='text-sm text-gray-800'>First Name</label>
              <input
                type="text"
                id='firstname'
                name="firstName"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-blue-800 outline-none px-4 py-2 rounded-lg"
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="lastname" className='text-sm text-gray-800'>Last Name</label>
              <input
                type="text"
                id='lastname'
                name="lastname"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                className="border border-blue-800 outline-none px-4 py-2 rounded-lg"
              />
            </div>

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
            className="px-4 bg-blue-800 hover:bg-blue-500 text-white py-3 rounded-lg font-bold text-lg transition-all duration-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
