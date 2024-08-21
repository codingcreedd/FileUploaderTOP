import React, { useState, createContext, useEffect } from 'react';
import logs from '../apis/logs';

export const Context = createContext(null);

const ContextProvider = ({children}) => {

    const [authState, setAuthState] = useState(false);
    const [userId, setUserId] = useState(0);
    const [user, setUser] = useState({});

    const states = {
        authState, setAuthState,
        userId, setUserId,
        user, setUser
    }

    useEffect(() => {
      const fetchData = async () => {
        await logs.get(`/protected`)
          .then(response => {
            console.log(response);
            setUser(response.data.user)
            setAuthState(true);
          })
          .catch(error => {
            console.log(error);
          })
      }

      fetchData();

    }, [])

  return (
    <Context.Provider value={states}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider