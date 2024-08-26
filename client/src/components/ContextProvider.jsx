import React, { useState, createContext, useEffect } from 'react';
import logs from '../apis/logs';
import folders_api from '../apis/folders'

export const Context = createContext(null);

const ContextProvider = ({children}) => {

    const [authState, setAuthState] = useState(false);
    const [userId, setUserId] = useState(0);
    const [user, setUser] = useState({});
    const [folders, setFolders] = useState([]);
    const [uploadFile, setUploadFile] = useState(false);
    const [files, setFiles] = useState(null);

    const states = {
        authState, setAuthState,
        userId, setUserId,
        user, setUser,
        folders, setFolders,
        uploadFile, setUploadFile,
        files, setFiles
    }

    let hasFetched = false;

    useEffect(() => {
      if (!hasFetched) {
        const fetchData = async () => {
          var response = await logs.get(`/protected`)
          
          if(response.data.message === 'Authenticated') {
            setUser(response.data.user);
            setAuthState(true);
            setFolders(response.data.folders)
            setFiles(response.data.folders.files);
          } else {
            setAuthState(false)
          }
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