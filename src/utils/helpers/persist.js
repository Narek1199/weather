import { LOCAL_STORAGE } from "utils/constants/data";

export const getFromStorage = (key, storage = LOCAL_STORAGE) => {
  try {
    const serializedState = window[storage].getItem(key);

    if (serializedState === null) {
      return;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
  }
};

export const saveToStorage = (key, state, storage = LOCAL_STORAGE) => {
  try {
    const serializedState = JSON.stringify(state);

    window[storage].setItem(key, serializedState);
  } catch (err) {
    console.error(err);
  }
};

export const removeFromStorage = (key, storage = LOCAL_STORAGE) => {
  try {
    window[storage].removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
