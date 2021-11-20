import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

const useRefetchOnRemount = (refetch = () => {}) => {
  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        console.log('refetching....');
        await refetch();
      }

      fetchData();
    }, []),
  );
};

export default useRefetchOnRemount;

const styles = StyleSheet.create({});
