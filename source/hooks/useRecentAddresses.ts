import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useMMKVObject} from 'react-native-mmkv';
import {addItemIfNotExists} from '../utilis/Functions';

const useRecentAddresses = () => {
  const [recentAddress, setrecentAddress] = useMMKVObject('recentAddress');
  const addAddress = item => {
    if (!recentAddress || recentAddress?.length === 0) {
      setrecentAddress([item]);
    } else {
      const arr = addItemIfNotExists(recentAddress, item);
      console.log('ret arr', arr);
      setrecentAddress(arr);
    }
  };

  return {recentAddress, addAddress};
};

export default useRecentAddresses;
