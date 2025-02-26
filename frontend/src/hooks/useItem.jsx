import { useState, useEffect } from 'react';
import { createItem, deleteItem, setCheckedState } from '../services/api';

// CREATE ITEM
export const useCreateItem = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const mutate = async (list_id, label) => {
        setIsSuccess(false);
        setIsError(false);
        setError(null)
        try {
            const newList = await createItem(list_id, label);
            setIsSuccess(true);
        } catch (err) {
            setIsError(true);
            setError(err.message);
        }
    };

    return { mutate, isSuccess, isError, error };
};

// DELETE ITEM
export const useDeleteItem = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const mutate = async (list_id, item_id) => {
        setIsSuccess(false);
        setIsError(false);
        try {
            await deleteItem(list_id, item_id);
            setIsSuccess(true);
        } catch (err) {
            setIsError(true);
            setError(err.message);
        }
    };

    return { mutate, isSuccess, isError, error };
};

// CHECK LIST
export const useCheckItem = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (list_id, item_id, checked_state) => {
      setIsSuccess(false);
      setIsError(false);
      try {
          await setCheckedState(list_id, item_id, checked_state);
          setIsSuccess(true);
      } catch (err) {
          setIsError(true);
          setError(err.message);
      }
  };

  return { mutate, isSuccess, isError, error };
};
