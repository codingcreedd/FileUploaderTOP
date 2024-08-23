import React from 'react';
import { useState, useContext } from 'react';
import { Context } from './ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import folders_api from '../apis/folders'

const FolderList = () => {

    const [dotsClicked, setDotsClicked] = useState(false);
    const [deleteOption, setDeleteOption] = useState(false);
    const [cancelOption, setCancelOption] = useState(false);
    const [updateOption, setUpdateOption] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [updatedFolder, setUpdatedFolder] = useState('');

    const navigate = useNavigate();

    const {folders, user} = useContext(Context);

    const deleteFolder = async (folder_id) => {
        try {
            await folders_api.delete(`/${folder_id}`)
                .then(response => {
                    navigate(0);
                })
        } catch(err) {
            console.log(err);
        }
    }

    const updateFolder = async (e) => {
        e.preventDefault();
        console.log(updatedFolder)
        try {
            console.log('updating folder...')
            await folders_api.put(`/${updatedFolder}`, {
                name: name,
                description: description,
                user_id: user.id
            }).then(response => {
                console.log(user);
                console.log(response)
                navigate(0);
            })
                
        } catch(err) {
            console.log(err);
        }
    }
    
    if(updateForm) {
        return (
            <div className="flex  h-screen">
                <div className="w-full max-w-md">
                    <div className="space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Update Folder</h2>
                        <p className="text-muted-foreground">Update your folder's name and/or description.</p>
                    </div>
                    <form className="space-y-4" onSubmit={updateFolder}>
                        <div className="space-y-2">
                        <label htmlFor="name" className="block">
                            Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            id="name"
                            placeholder="Enter folder name"
                            className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus-visible:ring-1 focus-visible:ring-ring"
                        />
                        </div>

                        <div className="space-y-2 mb-4">
                        <label htmlFor="user" className="block">
                            User
                        </label>
                        <div
                            id="user"
                            className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus-visible:ring-1 focus-visible:ring-ring"
                        > {user.first_name} {user.last_name} - ID: {user.id} </div>
                        </div>

                        <div className="space-y-2">
                        <label htmlFor="description" className="block">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
                            id="description"
                            placeholder="Update folder description"
                            className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus-visible:ring-1 focus-visible:ring-ring min-h-[100px]"
                        />
                        </div>
                        <div className="mt-4 text-right">
                        <button type='submit' className="inline-flex h-9 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-white disabled:pointer-events-none disabled:opacity-50">
                            Update Folder
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
        )
    }

  return (
    <div>
        <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold mb-5'>Folders</h1>
                <div className='relative flex gap-5 items-center'>
                    {
                        cancelOption && <button className='px-10 py-2 bg-transparent border border-black rounded-xl hover:bg-black transition-all hover:text-white'
                        onClick={() => {setDeleteOption(false); setCancelOption(false); setUpdateOption(false)}}>Cancel Updates</button>
                    }
                    <div className='relative'>
                        <i className='bx bx-dots-vertical-rounded text-2xl cursor-pointer' onClick={() => {setDotsClicked(!dotsClicked)}}></i>
                        {
                            dotsClicked && (
                                <div className='absolute flex flex-col py-4 bg-white z-10 rounded-xl -left-40 border border-black'>
                                    <Link to="/home/add-folder" className='hover:bg-gray-200 px-10 py-2 cursor-pointer'
                                    onClick={() => {}}>Add Folder</Link>
                                    <p className='hover:bg-gray-200 px-10 py-2 cursor-pointer text-sm' onClick={() => {setUpdateOption(true); setCancelOption(true)}}>Update Folder</p>
                                    <p className='hover:bg-gray-200 px-10 py-2 cursor-pointer'
                                    onClick={() => {setDeleteOption(true); setCancelOption(true); setDotsClicked(false)}}>Delete Folder</p>
                                </div>
                            )
                            
                        }
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-5'>
                {
                    folders.map(folder => (
                        <div key={folder?.id} className='relative flex flex-col cursor-pointer px-10 py-10 items-center max-w-[250px] bg-white rounded-2xl'>
                            <i className='bx bx-folder text-[3rem]' ></i>
                            <p className='mt-5 text-xl font-bold'>{folder?.name}</p>
                            <p className='font-bold text-sm text-gray-600 mt-4'>{folder?.files} Files</p>
                            {
                                deleteOption ? (<button className='px-10 py-2 bg-red-600 text-white absolute -bottom-3 rounded-xl'
                                onClick={() => {deleteFolder(folder.id)}}>Delete</button>) : updateOption ?  (
                                    <button className='px-10 py-2 bg-gray-600 text-white absolute -bottom-3 rounded-xl'
                                onClick={() => {setUpdateForm(true); setName(folder?.name); setDescription(folder.description); setUpdatedFolder(folder?.id)}}>Update</button>
                                ) : (null)
                            }
                        </div>
                    ))
                }
            </div>
    </div>
  )
}

export default FolderList