import {addItemIfNotExists} from '../utilis/Functions';
import {getItem, setItem} from '../utilis/storage';

const useAffilateRefer = () => {
  const addAffilateRefer = ({item}) => {
    const arr = addItemIfNotExists(getItem('affilateRefer', true), item);
    console.log('ret arr', arr);
    setItem('affilateRefer', arr, true);
  };
  return {addAffilateRefer};
};

export default useAffilateRefer;
