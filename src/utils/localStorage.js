const localStorage = window.localStorage;

/**
 * Retrieve String data stored in local storage having key item.
 *
 * @param {String} item Key of an Object String stored in local storage.
 */
export const getLocalStorageItem = (item) => localStorage.getItem(item);

/**
 * Set Stringfy Object= value data with key.
 *
 * @param {String} key Key with which data is saved in local storage.
 * @param {String} value Value which is stored in local storage.
 */
export const setLocalStorageItem = (key, value) => localStorage.setItem(key, value);
