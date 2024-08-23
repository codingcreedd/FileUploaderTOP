import React, { useContext, useState } from 'react'
import { Context } from './ContextProvider';
import folders from '../apis/folders'
import { useNavigate } from 'react-router-dom';

const AddFolder = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const {user} = useContext(Context);
    const navigate = useNavigate();

    const addFolder = async (e) => {
        e.preventDefault();
        try {
            await folders.post('/', {
                name: name,
                description: description,
                user_id: user.id
            })
            .then(() => {
                navigate('/home');
                navigate(0);
            })
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <div className="flex  h-screen">
      <div className="w-full max-w-md">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Add Folder</h2>
            <p className="text-muted-foreground">Create a new folder with a name and description.</p>
          </div>
          <form className="space-y-4" onSubmit={addFolder}>
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
                placeholder="Enter folder description"
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus-visible:ring-1 focus-visible:ring-ring min-h-[100px]"
              />
            </div>
            <div className="mt-4 text-right">
              <button type='submit' className="inline-flex h-9 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-white disabled:pointer-events-none disabled:opacity-50">
                Create Folder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
 
  )
}

export default AddFolder