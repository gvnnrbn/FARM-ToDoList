import { useState, useEffect } from 'react'
import './App.css'
import { useCreateList, useGetLists, useDeleteList} from './hooks/useList'

function App() {
//   // GET 
//   const [lists, setLists] = useState([]);
//   useEffect(() => {
//     getAllLists();
//   },[]);
//   const getAllLists = () => {
//     fetch('http://0.0.0.0:3001/api/lists')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setLists(data)
//       })// return data (json obj)
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//   // POST
//   const [name, setName] = useState('');
//   const createList = async (name) => {
//     await fetch('http://0.0.0.0:3001/api/lists',{
//       method: 'POST',
//       body:JSON.stringify({name: name}),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     })
//     .then(setName(''))//return success/true
//     .catch((err) => {
//       console.log(err.message);
//     });

//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await createList(name);
//     getAllLists();
//   }; 

//  //DELETE
//  const deleteList = async (list_id) => {
//   await fetch(`http://0.0.0.0:3001/api/lists/${list_id}`, {
//      method: 'DELETE',
//   }) //.then(//return success/true)
//     .catch((err) => {
//       console.log(err.message);
//     });
//   };
  
//   const handleDelete = async (id) => {
//     await deleteList(id);
//     getAllLists();
//   }; 

  const { data: lists, isLoading, isError, error, refetch } = useGetLists();
  const { mutate: createList, isSuccess: createSuccess } = useCreateList();
  const { mutate: deleteList, isSuccess: deleteSuccess } = useDeleteList();
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (createSuccess || deleteSuccess) {
      refetch();
    }
    if (createSuccess){
      setName('');
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
            <button>Go to items</button>
            <button id={"dlt-"+list.id} onClick={() => deleteList(list.id)}>Delete</button>
           </div>
        )}
      </div>
    </>
  )
}

export default App
