// LISTS ENDPOINT
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
