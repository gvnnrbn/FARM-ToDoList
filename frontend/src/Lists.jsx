import { useState, useEffect } from 'react'
import './App.css'
import { useCreateList, useGetLists, useDeleteList} from './hooks/useList'
import { NavLink, Link } from "react-router";

function Lists() {
  const { data: lists, isLoading, isError, error, refetch } = useGetLists();
  const { mutate: createList, isSuccess: createSuccess } = useCreateList();
  const { mutate: deleteList, isSuccess: deleteSuccess } = useDeleteList();
  const [ name, setNamecheck ]= useState('');
  useEffect(() => {
    if (createSuccess || deleteSuccess) {
      refetch();
    }
  }, [createSuccess, deleteSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createList(name);
    setName('');
  };
  

  return (
    <>
      <h1>
        To Do App
      </h1>
      <form onSubmit={(handleSubmit)}>
        <input type='text' value={name} placeholder='new list name'
          onChange={(e) => setName(e.target.value)}/>
        <button type="submit">Create List</button>
      </form>
      <hr/>
      <h2>
        Lists
      </h2>
      <div>
        {lists.map((list) => 
          <div key={list.id} className="list-container">
            <p>{list.name}: {list.item_count} items</p>
            <button>
              <Link to={`/list/${list.id}`}>Go to items</Link>
            </button>
            <button id={"dlt-"+list.id} onClick={() => deleteList(list.id)}>Delete</button>
           </div>
        )}
      </div>
    </>
  )
}

export default Lists
