import React, { useState, createContext, useEffect } from 'react';
import logs from '../apis/logs';
import folders_api from '../apis/folders'

export const Context = createContext(null);

const ContextProvider = ({children}) => {

    const [authState, setAuthState] = useState(false);
    const [userId, setUserId] = useState(0);
    const [user, setUser] = useState({});
    const [folders, setFolders] = useState([]);

    const states = {
        authState, setAuthState,
        userId, setUserId,
        user, setUser,
        folders, setFolders,
    }

    let hasFetched = false;

    useEffect(() => {
      if (!hasFetched) {
        const fetchData = async () => {
          var response = await logs.get(`/protected`)
          
          setUser(response.data.user);
          setAuthState(true);

          console.log(response.data.user)
          var response2 = await folders_api.get(`/${response.data.user.id}/all-folders`)
          setFolders(response2.data.folders);

        }
        
        fetchData();
        hasFetched = true;
      }
    }, [])



  return (
    <Context.Provider value={states}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider