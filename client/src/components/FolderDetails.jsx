import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import folders_api from '../apis/folders';
import files_api from '../apis/files';

const FolderDetails = () => {
  const [selectedFolder, setSelectedFolder] = useState({});
  const [activeFileId, setActiveFileId] = useState(null);
  const [activeEditFile, setActiveEditFile] = useState(null);
  const [editClicked, setEditClicked] = useState(false);

  const [fileName, setFileName] = useState('');
  const [absDiv, setAbsDiv] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(0);

  const { folder_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await folders_api.get(`/${folder_id}`);
        setSelectedFolder(response.data.folder);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [folder_id]);

  useEffect(() => {
    console.log(selectedFolder);
  }, [selectedFolder]);

  // Helper function to format file size
  const formatSize = (size) => {
    if (size === null) return 'N/A';
    return `${size} Bytes`;
  };

  const handleActionsClick = (fileId) => {
    setActiveFileId((prevFileId) => (prevFileId === fileId ? null : fileId));
    setAbsDiv(true);
  };

  const handleEditAction = (fileId) => {
    console.log(fileId);
    setCurrentFileId(fileId);
    setActiveEditFile(fileId);
  }

  const handleFileUpdate = async (e) => {
    e.preventDefault();
    console.log(currentFileId)
    try {
        await files_api.put(`/${currentFileId}/update`, {
          name: fileName
        })
          .then(response => {
              console.log(response.data.message);
              navigate(0);

          })
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='flex flex-col px-20'>
      <h1 className='text-4xl font-bold mb-5'>{selectedFolder?.name}</h1>
      <p className='text-xl text-gray-600 mb-10'>
        Folder Admin: {selectedFolder?.user?.first_name}
      </p>

      <div className='w-full bg-white rounded-lg shadow-md'>
        <h1 className='font-bold text-2xl mb-4 px-6 py-4 border-b border-gray-300'>
          All Files
        </h1>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-800 text-white'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                  Size
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                  Created At
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                  Updated At
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {selectedFolder && selectedFolder.files && selectedFolder.files.length > 0 ? (
                selectedFolder.files.map((file) => (
                  <tr key={file.id}>
                    <td className='px-6 py-4 whitespace-nowrap hover:text-blue-600 hover:underline transition-all cursor-pointer'>
                      {
                        !editClicked || activeEditFile !== file.id ? (
                          <div>
                            {file.name ? file.name : file.filename}
                          </div>
                        ) : (
                          <div>
                            {
                              editClicked && activeEditFile === file.id && (
                                <form onSubmit={handleFileUpdate}>
                                    <input type="text" value={fileName} onChange={(e) => {setFileName(e.target.value)}}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"/>
                                    <button type='submit' className='hidden'>submit</button>
                                </form>
                              )
                            }
                          </div>
                        )
                      }
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {formatSize(file.size)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {new Date(file.createdAt).toLocaleString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {new Date(file.updatedAt).toLocaleString()}
                    </td>
                    <td className='relative px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <i
                        className='bx bx-dots-horizontal-rounded text-2xl fas fa-ellipsis-v text-gray-500 cursor-pointer'
                        onClick={() => handleActionsClick(file.id)}
                      ></i>
                      {(activeFileId === file.id && absDiv) && (
                        <div className='z-10 top-0 absolute right-0 mt-2 px-4 py-2 flex flex-col bg-white rounded-xl border shadow-lg'>
                          <div className='flex items-center gap-5 cursor-pointer'>
                            <i className='bx bx-download text-2xl'></i>
                            <p>Download</p>
                          </div>

                          <div className='flex items-center gap-5 cursor-pointer'
                          onClick={() => {setEditClicked(true); setAbsDiv(false); handleEditAction(file.id)}}>
                            <i className='bx bxs-edit-alt text-2xl'></i>
                            <p>Edit</p>
                          </div>

                          <div className='flex items-center gap-5 cursor-pointer'>
                            <i className='bx bx-message-square-x text-2xl'></i>
                            <p>Delete</p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='5' className='px-6 py-4 text-center'>
                    No files found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FolderDetails;
