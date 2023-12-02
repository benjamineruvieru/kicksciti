import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const setItem = (key, value, shouldStringify) => {
  console.log('SAVING', value);
  const mainvalue = shouldStringify ? JSON.stringify(value) : value;
  storage.set(key, mainvalue);
};

export const getItem = (key, shouldParse) => {
  const value = storage.getString(key);
  if (value) {
    return shouldParse ? JSON.parse(value) : value;
  } else {
    return shouldParse ? [] : null;
  }
};

export const deleteItem = key => {
  storage.delete(key);
};
