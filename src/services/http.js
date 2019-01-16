import axios from 'axios';

/**
 * Creates and instance of axios
 */
const instance = axios.create({
  responseType: 'json',
  baseURL: 'https://todo-react-sminmgr.herokuapp.com/todo',
});

/**
 * GET method to retrieve data from todo server.
 *
 * @returns {Object<Promise>} Returns promise either resolved or rejected.
 */
async function get() {
  try {
    return await instance.get('');
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
async function post(obj) {
  try {
    return await instance.post('', obj);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * DELETE method to delete todo in server with id.
 *
 * @param {Number} id Todo to be removed with param id.
 *
 * @returns {Object<Promise>} Returns promise either resolved or rejected.
 */
async function remove(id) {
  try {
    return await instance.delete(`/${id}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * PUT method to replace todo with param object having param id.
 *
 * @param {Number} id Id of todo to be edited.
 * @param {Object} obj Changed object of an editing todo.
 *
 * @returns {Object<Promise>} Returns promise either resolved or rejected.
 */
async function edit(id, obj) {
  try {
    return await instance.put(`/${id}`, { ...obj });
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
async function search(searchQuery) {
  try {
    return await instance.get(`?q=${searchQuery}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export default {
  get,
  edit,
  post,
  remove,
  search
};
