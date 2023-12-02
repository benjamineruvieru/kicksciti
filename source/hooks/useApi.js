import {useNavigation} from '@react-navigation/native';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {deleteItem} from '../utilis/storage';

export const useApi = ({queryKey, queryFn, onSuccess}) => {
  const navigation = useNavigation();
  const data = useQuery({
    queryKey,
    queryFn,
    onError: error => {
      switch (error?.response?.status) {
        case 401:
          {
            // deleteItem('token');
            // navigation.reset({
            //   index: 0,
            //   routes: [{name: 'LoginScreen'}],
            // });
          }
          break;
        default:
          console.log(queryKey, ' errorr ', error?.response.data);
      }
    },
    onSuccess,
  });

  return data;
};

export function useInfiniteApi({queryKey, queryFunction, onSuccess}) {
  return useInfiniteQuery(queryKey, queryFunction, {
    retry: true,
    failureCount: 3,
    getNextPageParam: (lastPage, pages) => {
      console.log('pages', pages, lastPage);

      if (lastPage?.hasNextPage) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    onSuccess,
  });
}
