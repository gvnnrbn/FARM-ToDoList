import { useState, useEffect } from 'react';
import { fetchLists, fetchOneList, createList, deleteList, setCheckedState } from '../services/api';

// GET LISTS
export const useGetLists = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
      setIsLoading(true);
      try {
          const lists = await fetchLists();
          setData(lists);
      } catch (err) {
          setIsError(true);
          setError(err.message);
      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);

  return { data, isLoading, isError, error, refetch: fetchData };
};

// CREATE LIST
export const useCreateList = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const mutate = async (name) => {
        setIsSuccess(false);
        setIsError(false);
        setError(null)
        try {
            const newList = await createList(name);
            setIsSuccess(true);
        } catch (err) {
            setIsError(true);
            setError(err.message);
        }
    };

    return { mutate, isSuccess, isError, error };
};

// DELETE LIST
export const useDeleteList = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const mutate = async (list_id) => {
        setIsSuccess(false);
        setIsError(false);
        try {
            await deleteList(list_id);
            setIsSuccess(true);
        } catch (err) {
            setIsError(true);
            setError(err.message);
        }
    };

    return { mutate, isSuccess, isError, error };
};

// GET ONE LIST
export const useGetOneList = (list_id) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const list = await fetchOneList(list_id);
        setData(list);
    } catch (err) {
        setIsError(true);
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
};

useEffect(() => {
  fetchData();
}, []);

return { data, isLoading, isError, error, refetch: fetchData };
};