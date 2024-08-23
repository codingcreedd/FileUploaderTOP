import { useContext, useState } from 'react'
import { Context } from './components/ContextProvider'
import logs from './apis/logs';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';

function App() {

  const {user, authState, setAuthState} = useContext(Context);

  const navigate = useNavigate();

  return (
    <div className='flex'>
      <Nav />
       {
          authState && (
            <div className='px-10 py-10 rounded-tl-2xl w-[80%] bg-gray-100'>
              <Outlet />
            </div>
          ) 
       }
    </div>
  )
}

export default App
