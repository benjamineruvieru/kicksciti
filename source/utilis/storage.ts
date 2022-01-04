import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const setItem = (key: string, value: any, shouldStringify?: boolean) => {
  console.log('SAVING', value);
  const mainvalue = shouldStringify ? JSON.stringify(value) : value;
  storage.set(key, mainvalue);
};

export const getItem = (key: string, shouldParse?: boolean) => {
  const value = storage.getString(key);
  if (value) {
    return shouldParse ? JSON.parse(value) : value;
  } else {
    return shouldParse ? [] : null;
  }
};

export const deleteItem = (key: string) => {
  storage.delete(key);
};
