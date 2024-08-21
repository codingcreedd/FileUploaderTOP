import { useContext, useState } from 'react'
import { Context } from './components/ContextProvider'
import logs from './apis/logs';
import { useNavigate } from 'react-router-dom';

function App() {

  const {user, authState, setAuthState} = useContext(Context);

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
    <div className=''>
       {
          authState ? (
            <div>
                Welcome back {user.first_name}!
                <button onClick={logOut}>Logout</button>
            </div>
          ) : (
            <div>
              
            </div>
          )
       }
    </div>
  )
}

export default App
