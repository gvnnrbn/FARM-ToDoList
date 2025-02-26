import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import './App.css'
import { useGetOneList} from './hooks/useList'
import { useCheckItem, useCreateItem, useDeleteItem} from './hooks/useItem'

function Items(){
    const params = useParams();
    const listID = params.listId;
    const {data: list, error, isError, isLoading, refetch} = useGetOneList(listID);
    const {mutate: createItem, isSuccess: createSuccess } = useCreateItem();
    const {mutate: deleteItem, isSuccess: deleteSuccess } = useDeleteItem();
    const {mutate: setCheckState, isSuccess: checkSuccess } = useCheckItem();
    
    const [ name, setName ] = useState('');
    const [ items, setItems ] = useState([]);
    useEffect( () => {
        if(!isError & !isLoading){
            setItems(list.items);
        }
    }, [isError, isLoading])

    useEffect(() => {
        if (createSuccess || deleteSuccess || checkSuccess) {
          refetch();
        }
    }, [createSuccess, deleteSuccess, checkSuccess]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createItem(listID, name);
        setName('');
    };

    return (
        <>
          <h1>
            {list.name}
          </h1>
          <form >
            <input type='text' value={name} placeholder='new item name'
              onChange={(e) => setName(e.target.value)}/>
            <button type="submit" 
                onClick={handleSubmit}>Create Item</button>
          </form>
          <hr/>
          <h2>
            Items
          </h2>
          <div>
            {items.map((item) => 
              <div key={item.id} className="list-container">
                <input type='checkbox' disabled
                        checked={item.checked ? 'checked' : ''}/>
                <p>{item.label}</p>
                <button id={"dlt-"+item.id} value={item.checked}
                    onClick={() => deleteItem(listID, item.id)} >Delete</button>
                <button id={"chk-"+item.id} 
                    onClick={() => {
                        let check_value = true;
                        if(item.checked)
                            check_value = false;
                        setCheckState(listID, item.id, check_value);
                    } } >Check</button>
               </div>
            )}
          </div>
        </>
      )
}

export default Items