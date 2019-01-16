import axios from 'axios';
/**
 * Creates and instance of axios
 */
const instance = axios.create({
  baseURL: 'https://todo-react-sminmgr.herokuapp.com/todo',
  responseType: 'json'
});

/**
 * GET method to retrieve data from todo server.
 *
 * @returns {Object<Promise>} Returns promise either resolved or rejected.
 */
export async function get() {
  try {
    const data = await instance.get('');

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * POST method to post or save data into the server.
 *
 * @param {Object} obj Object to be saved in server.
 *
 * @returns {Object<Promise>} Returns promise either resolved or rejected.
 */
export async function post(obj) {
  try {
    const data = await instance.post('', obj);

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * DELETE method to delete todo in server with id.
 *
 * @param {Integer} id Todo to be removed with param id.
 *
 * @returns {Object<Promise>} Returns promise either resolved or rejected.
 */
export async function remove(id) {
  try {
    const data = await instance.delete(`/${id}`);

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * PUT method to replace todo with param object having param id.
 *
 * @param {Integer} id Id of todo to be edited.
 * @param {Object} obj Changed object of an editing todo.
 *
 * @returns {Object<Promise>} Returns promise either resolved or rejected.
 */
export async function edit(id, obj) {
  try {
    const data = await instance.put(`/${id}`, { ...obj });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Search method is used to search for pattern searchQuery in server.
 *
 * @param {String} searchQuery Pattern used to search for.
 *
 * @returns {Object<Promise>} Returns promise either resolved or rejected.
 */
export async function search(searchQuery) {
  try {
    const data = await instance.get(`?q=${searchQuery}`);

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
