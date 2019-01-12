export const HOME = -1;
export const COMPLETED = 0;
export const REMAINING = 1;

export const getLocalStorageItem = (item) =>
  window.localStorage.getItem(item);

export const setLocalStorageItem = (key, value) =>
  window.localStorage.setItem(key, value);
