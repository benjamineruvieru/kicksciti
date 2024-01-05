import {useMMKVObject} from 'react-native-mmkv';
import {addItemIfNotExists} from '../utilis/Functions';

interface RecentAddress {
  address: string;
  lga: string;
  phone: string;
  state: string;
}
const useRecentAddresses = () => {
  const [recentAddress, setrecentAddress] =
    useMMKVObject<RecentAddress[]>('recentAddress');
  const addAddress = (item: RecentAddress) => {
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
