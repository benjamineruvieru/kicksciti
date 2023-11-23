import {TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

// import Back from '../assets/svg/arrow-left.svg';
import Cart from '../assets/svg/icons/cart.svg';
import Bell from '../assets/svg/icons/bell.svg';

// export const BackButton = () => {
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
//       <Back />
//     </TouchableOpacity>
//   );
// };

export const NotificationButton = () => {
  return (
    <TouchableOpacity onPress={() => {}} style={{marginLeft: 18}}>
      <Bell height={26} width={26} />
    </TouchableOpacity>
  );
};

export const CartButton = () => {
  return (
    <TouchableOpacity onPress={() => {}} style={{}}>
      <Cart height={26} width={26} />
    </TouchableOpacity>
  );
};
