import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import AniStackNav from './AniStack';
import {getItem, setItem} from '../utilis/storage';
import OrderDetails from '../features/checkout/OrderDetails';
import OrderHistory from '../features/bottomtabs/profile/OrderHistory';
import {Linking, Platform} from 'react-native';
import LoadProduct from '../features/productdetails/LoadProduct';
import AffilateEarnings from '../features/bottomtabs/profile/AffilateEarnings';
import UpdateScreen from '../features/updateapp/UpdateScreen';
import DeviceInfo from 'react-native-device-info';
import {getAppVersion} from '../api/user';
import DeleteAccount from '../features/bottomtabs/profile/DeleteAccount';

interface DeepLinkResult {
  product_id: string;
  username?: string;
}

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink({url: initialUrl});
    };

    getUrlAsync();
    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);
  useEffect(() => {
    let version = parseFloat(DeviceInfo.getVersion());
    console.log('device version', Platform.OS, version);
    getAppVersion().then(data => {
      console.log('api app ver', data.data);
      const {android, ios} = data?.data ?? {};
      if (Platform.OS === 'android') {
        if (parseFloat(android) > version) {
          navigation.reset({
            index: 0,
            routes: [{name: 'UpdateScreen'}],
          });
        }
      } else {
        if (parseFloat(ios) > version) {
          navigation.reset({
            index: 0,
            routes: [{name: 'UpdateScreen'}],
          });
        }
      }
    });
  }, []);

  function parseLink(link: string): DeepLinkResult | null {
    const pattern = /\/product\/(\d+)(?:\?id=([a-zA-Z0-9]+))?$/;
    const match = link.match(pattern);
    if (match) {
      const [, productId, username] = match;

      // Create an object with the extracted information
      const result: DeepLinkResult = {product_id: productId};

      if (username) {
        result.username = username;
      }

      return result;
    }

    return null;
  }

  function getSearchParams(url: string): Record<string, string> {
    const queryString = url.split('?')[1];
    const paramsObject: Record<string, string> = {};

    if (queryString) {
      const paramsArray = queryString.split('&');

      for (const param of paramsArray) {
        const [key, value] = param.split('=');
        if (key && value) {
          paramsObject[key] = decodeURIComponent(value.replace(/\+/g, ' '));
        }
      }
    }

    return paramsObject;
  }
  function extractOrderId(url: string): string | null {
    // A regular expression to match the order ID in the URL
    const regex = /(?:www\.)?kicksciti\.com\/order\/(\w+)/;

    // Match and extract the order ID
    const match = url.match(regex);

    // Check if a match is found and return the order ID, or null if no match
    return match ? match[1] : null;
  }
  const handleDeepLink = (prop: {url: string | null} | undefined) => {
    const {url} = prop ?? {};
    if (url) {
      console.log('initialUrl', url);
      if (url.includes('search')) {
        const searchParams = getSearchParams(url);
        console.log(searchParams);
        navigation.navigate('AniStackNav', {
          screen: 'BottomNav',
          params: {
            screen: 'Shop',
            params: {
              screen: 'StackShopScreen',
              params: {searchPassed: searchParams?.q},
            },
          },
        });
      } else if (url.includes('product')) {
        const result = parseLink(url);
        console.log('result1', result);
        if (getItem('token') && result?.product_id) {
          navigation.navigate('LoadProduct', result);
        } else {
          setItem('affilateRefer', result, true);
        }
      } else if (url.includes('order') && getItem('token')) {
        console.log('order id', extractOrderId(url));
        navigation.navigate('OrderDetails', {order_id: extractOrderId(url)});
      } else if (url.includes('delete-account') && getItem('token')) {
        navigation.reset({
          index: 0,
          routes: [{name: 'DeleteAccount'}],
        });
      }
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={getItem('token') ? 'AniStackNav' : 'OnboardingScreen'}
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="AniStackNav" component={AniStackNav} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />

      <Stack.Screen name="LoadProduct" component={LoadProduct} />
      <Stack.Screen name="AffilateEarnings" component={AffilateEarnings} />
      <Stack.Screen name="UpdateScreen" component={UpdateScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
    </Stack.Navigator>
  );
};

export default StackNav;
