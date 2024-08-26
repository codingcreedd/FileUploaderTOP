import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import folders_api from '../apis/folders';

const FolderDetails = () => {
  const [selectedFolder, setSelectedFolder] = useState({});
  const { folder_id } = useParams();

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
                      {file.name ? file.name : file.filename}
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
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <i className='bx bx-dots-horizontal-rounded text-2xl fas fa-ellipsis-v text-gray-500 cursor-pointer'></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className='px-6 py-4 text-center'>
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
