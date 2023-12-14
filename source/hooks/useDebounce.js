import {useEffect} from 'react';

const useDebounce = (fun, arr = [], time = 1000) => {
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fun();
    }, time);

    return () => clearTimeout(delayDebounceFn);
  }, [...arr]);
};

export default useDebounce;
