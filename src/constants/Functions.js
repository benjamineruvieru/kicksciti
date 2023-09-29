import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, StatusBar} from 'react-native';
import Colors from './Colors';
import firestore from '@react-native-firebase/firestore';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export async function buildLink(id, name, price, url) {
  const link = await dynamicLinks().buildShortLink(
    {
      link: 'https://instagram.com/kicks.citi?id=' + id,
      domainUriPrefix: 'https://kicksciti.page.link',

      android: {
        packageName: 'com.kicksciti.android',
        minimumVersion: '2',
      },
      navigation: {
        forcedRedirectEnabled: true,
      },
      social: {
        title: name,
        descriptionText: `₦ ${price}`,
        imageUrl: url,
      },
    },
    dynamicLinks.ShortLinkType.UNGUESSABLE,
  );
  return link;
}

export const navToID = async (id, navigation) => {
  const map = await getData('map', true);
  navigation.navigate('Details', {
    item: map.filter(m => m.id === id)[0],
  });
};

export const getData = async (id, shouldParse = true) => {
  let data = '';
  try {
    data = await AsyncStorage.getItem(id);
  } catch (e) {}
  return shouldParse ? JSON.parse(data) : data;
};

export const storeData = async (id, data) => {
  try {
    await AsyncStorage.setItem(id, data);
  } catch (e) {}
};

export const deleteData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (exception) {}
};

export const StatusBarController = route => {
  if (route.name === 'Tab') {
    Platform.OS !== 'ios' && StatusBar.setBackgroundColor(Colors.bag2Bg);
    StatusBar.setBarStyle('light-content', true);
    Platform.OS !== 'ios' && StatusBar.setTranslucent(false);
  } else if (route.name === 'Details') {
    StatusBar.setBarStyle('light-content', true);

    Platform.OS !== 'ios' && StatusBar.setBackgroundColor('transparent');
    Platform.OS !== 'ios' && StatusBar.setTranslucent(true);
  } else if (route.name === 'Notifications') {
    StatusBar.setBarStyle('light-content', true);

    Platform.OS !== 'ios' && StatusBar.setBackgroundColor(Colors.bag2Bg);
    Platform.OS !== 'ios' && StatusBar.setTranslucent(false);
  } else if (route.name === 'Chat') {
    StatusBar.setBarStyle('light-content', true);

    Platform.OS !== 'ios' && StatusBar.setBackgroundColor('transparent');
    Platform.OS !== 'ios' && StatusBar.setTranslucent(true);
  } else if (route.name === 'Contact') {
    StatusBar.setBarStyle('light-content', true);

    Platform.OS !== 'ios' && StatusBar.setBackgroundColor('transparent');
    Platform.OS !== 'ios' && StatusBar.setTranslucent(true);
  } else if (route.name === 'Search') {
    Platform.OS !== 'ios' && StatusBar.setBackgroundColor(Colors.bag2Bg);
    StatusBar.setBarStyle('light-content', true);
    Platform.OS !== 'ios' && StatusBar.setTranslucent(false);
  }
};

export const DBAddFav = async favorites => {
  const id = await getData('uid', false);
  if (id === null) {
    return null;
  }

  firestore()
    .collection('Users')
    .doc(id)
    .update({
      favorites: firestore.FieldValue.arrayUnion(favorites),
    });
};

export const DBRevFav = async favorites => {
  const id = await getData('uid', false);
  if (id === null) {
    return null;
  }
  firestore()
    .collection('Users')
    .doc(id)
    .update({
      favorites: firestore.FieldValue.arrayRemove(favorites),
    });
};

export const DBAddCart = async cart => {
  const id = await getData('uid', false);
  if (id === null) {
    return null;
  }

  firestore()
    .collection('Users')
    .doc(id)
    .update({
      cart: firestore.FieldValue.arrayUnion(cart),
    });
};

export const DBRevCart = async cart => {
  const id = await getData('uid', false);
  if (id === null) {
    return null;
  }

  firestore()
    .collection('Users')
    .doc(id)
    .update({
      cart: firestore.FieldValue.arrayRemove(cart),
    });
};

export const DBSubprice = async subprice => {
  const id = await getData('uid', false);
  if (id === null) {
    return null;
  }

  firestore().collection('Users').doc(id).update({
    subprice: subprice,
  });
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const sendMessage = async ({
  email = '',
  message = '',
  phonenumber = '',
  name = '',
}) => {
  const id = await getData('uid', false);

  firestore().collection('Messages').add({
    name: name,
    email: email,
    message: message,
    phonenumber: phonenumber,
    uid: id,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

export const deLCart = async () => {
  const id = await getData('uid', false);
  if (id === null) {
    return null;
  }
  firestore().collection('Users').doc(id).update({
    cart: firestore.FieldValue.delete(),
    subprice: 0,
  });
};

export const AddOrder = async map => {
  const id = await getData('uid', false);
  if (id === null) {
    return null;
  }

  firestore()
    .collection('Orders')
    .doc(id)
    .get()
    .then(doc => {
      if (!doc.exists) {
        firestore()
          .collection('Orders')
          .doc(id)
          .set({
            orders: [map],
          });
      } else {
        firestore()
          .collection('Orders')
          .doc(id)
          .update({
            orders: firestore.FieldValue.arrayUnion(map),
          });
      }
    });
};
