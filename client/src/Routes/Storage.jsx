import React, { useContext, useState } from 'react'
import { Context } from '../components/ContextProvider';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import files from '../apis/files';

const Storage = () => {

    const [usedStoragePercentage, setUsedStoragePercentage] = useState(20);

    const [fileName, setFileName] = useState('');
    const [selectedFolder, setSelectedFolder] = useState('');
    const [selectedFolderId, setSelectedFolderId] = useState(0);
    const [file, setFile] = useState(null);

    const {setUploadFile, uploadFile, folders} = useContext(Context);

    const navigate = useNavigate();

    const {folder_id} = useParams();

    const uploadFileFun = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', fileName);
            formData.append('folderId', selectedFolderId);
    
            await files.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                if(response.data.message === 'Added File Successfully') {
                    navigate(`/home`)
                    navigate(0)
                }
            })
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <div className='flex flex-col'>
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    <h1 className='font-bold text-2xl'>Storage</h1>
                    <p className='text-[0.9rem] text-gray-600'>2.6 GB out of 5 GB used</p>
                </div>
                {
                    !folder_id && <button className='px-5 py-1 bg-black text-white rounded-lg'
                    onClick={() => {setUploadFile(true)}}>Upload Files</button> 
                }
            </div>
            <div className='flex'>
                <div className={`w-[${usedStoragePercentage}%] h-[2px] bg-black`}></div>
                <div className={`w-[${100-usedStoragePercentage}%] h-[2px] bg-gray-200`}></div>
            </div>
        </div>

        <div className='flex flex-col gap-5 mt-10'>
            {
                !uploadFile ? (
                    <Outlet />
                ) : (
                    <div className='flex flex-col gap-10'>
                        <h1 className='font-bold text-3xl'>Upload File</h1>
                        <form className="mt-8 space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" encType='multipart/form-data'>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                <label htmlFor="file-name" className="sr-only">
                                    File Name
                                </label>
                                <input
                                    id="file-name"
                                    name="fileName"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                    placeholder="File Name"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                />
                                </div>
                                <div>
                                <label htmlFor="file-upload" className="sr-only">
                                    Choose file
                                </label>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    onChange={(e) => {setFile(e.target.files[0])}}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                />
                                </div>
                                <div>
                                <label htmlFor="folder-select" className="sr-only">
                                    Select Folder
                                </label>
                                <select
                                    id="folder-select"
                                    name="folder"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                    value={selectedFolder}
                                >
                                    <option value="">Select a folder</option>
                                    {folders.map((folder) => (
                                    <option onClick={() => {setSelectedFolder(folder.name); setSelectedFolderId(folder.id)}} key={folder.id} value={folder.name}>
                                        {folder.name}
                                    </option>
                                    ))}
                                </select>
                                </div>
                            </div>

                            <div>
                                <button
                                onClick={uploadFileFun}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                >
                                Upload File
                                </button>
                            </div>
                            </form>
                    </div>
                )
            }
        </div>

        
    </div>
  )
}

export default Storage