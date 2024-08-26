import React from 'react'
import { useParams } from 'react-router-dom'
import LogInForm from '../components/LogInForm'
import SignUpForm from '../components/SignUpForm';

const Log = () => {

  const {authType} = useParams();
    
  return (
    <div className='flex h-screen mx-5 my-5'>
        <div className='w-[40%] bg-black text-white flex flex-col px-8 py-5 rounded-xl'>
            <h1 className='font-bold mb-20'>Miro Drive</h1>
            <h2 className='text-4xl font-bold mb-6'>{authType === 'signup' ? 'Upload all your files in one place' : 'Keep using Miro Drive!'}</h2>
            <p className='text-sm'>{authType === 'signup' ? 'You can create folders, upload files and whatever you need in this app, start now!' : 'Log back in to keep your files safe and secured!'}</p>

            <div className='mt-auto px-4 py-4 bg-white text-black flex flex-col rounded-xl'>
                <p className='text-sm mb-3'>Best app I have used for uploading my files, it's secure and easy to use!</p>
                <p className='font-bold text-[0.8rem]'>@Adam K</p>
            </div>
        </div>

        <div className='w-[60%] px-16 h-screen py-20 flex flex-col'>
            <div>
                {
                    authType === 'signin' ? (
                        <LogInForm />
                    ) : (
                        <SignUpForm />
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Log