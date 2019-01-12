export const getLocalStorageItem = (item) =>
  window.localStorage.getItem(item);

export const setLocalStorageItem = (key, value) =>
  window.localStorage.setItem(key, value);
