// LISTS ENDPOINTS
const BASE_URL = 'http://0.0.0.0:3001/api/lists';

export const fetchLists = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Error: get lists');
    return response.json();
};

export const createList = async (name) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error: create list');
    return response.json();
};

export const deleteList = async (list_id) => {
    const response = await fetch(`${BASE_URL}/${list_id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error: delete list');
    return true; //success
};

export const fetchOneList = async (list_id) => {
    const response = await fetch(`${BASE_URL}/${list_id}`);
    if (!response.ok) throw new Error('Error: get list');
    return response.json();
};


// ITEM ENDPOINTS
export const createItem = async (list_id, label) => {
    const response = await fetch(`${BASE_URL}/${list_id}/items`, {
        method: 'POST',
        body: JSON.stringify({ label }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error: create item');
    return response.json();
};

export const deleteItem = async (list_id, item_id) => {
    const response = await fetch(`${BASE_URL}/${list_id}/items/${item_id}`, { 
        method: 'DELETE' });
    if (!response.ok) throw new Error('Error: delete item');
    return true; //success
};

export const setCheckedState = async (list_id, item_id, checked_state) => {
    const response = await fetch(`${BASE_URL}/${list_id}/checked_state`,{ 
        method: 'PATCH',
        body: JSON.stringify({ item_id, checked_state }),
        headers: { 'Content-Type': 'application/json' }, 
    });
    if(!response.ok) throw new Error('Error: set checked state');
    return true;
}