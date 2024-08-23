import React, { useContext, useState } from 'react'
import { Context } from './ContextProvider'
import { useNavigate } from 'react-router-dom';
import logs from '../apis/logs';

const Nav = () => {

  const [navClicked, setNavClicked] = useState(0);

  const {user, setAuthState} = useContext(Context);

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await logs.get('/logout')
        .then(() => {
          setAuthState(false);
          navigate('/signin');
        })
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <nav className='flex flex-col py-5 w-[20%] shadow-2xl h-screen rounded-tr-lg'>
        <div className='flex flex-col justify-between items-center mb-10'>
            <h1 className='text-xl font-bold mb-4'>Miro Drive</h1>
            <p className='text-sm font-bold'>User: {user.first_name} {user.last_name}</p>
        </div>
        
        <div className={`flex flex-col gap-3`}>
            <div className={`flex items-center gap-6 py-2 px-10 ${navClicked === 1 && 'bg-blue-300'}`} 
            onClick={() => {setNavClicked(1)}}>
              <i className='bx bx-hdd'></i>
              <div>Storage</div>
            </div>

            <div className={`flex items-center gap-6 py-2 px-10 ${navClicked === 2 && 'bg-blue-300'}`} onClick={() => {setNavClicked(2)}}>
              <i className='bx bx-log-out'></i>
              <button onClick={logOut} className='cursor-pointer'>Logout</button>
            </div>
            
        </div>

    </nav>
  )
}

export default Nav