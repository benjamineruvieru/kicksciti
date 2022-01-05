import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

const useRefetchOnRemount = (refetch: () => Promise<void> | void) => {
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
