import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RegularTextB} from '../../../components/Text';
import Colors from '../../../constants/Colors';

export const QuantityCounter = ({
  paddingHorizontal,
  quantity,
  setQuantity,
  editQuantity,
  isInCart,
  cartQuan,
  removeFromCart,
}) => {
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: paddingHorizontal,
      }}>
      <TouchableOpacity
        onPress={() => {
          if (isInCart) {
            const newquan = `${parseInt(cartQuan) - 1}`;
            if (parseInt(newquan) > -1) {
              editQuantity(newquan);
              setQuantity(newquan);
            }
            if (parseInt(newquan) === 0) {
              removeFromCart();
            }
          } else {
            setQuantity(prev => {
              const newquan = `${parseInt(prev) - 1}`;
              if (parseInt(newquan) > -1) {
                return newquan;
              } else {
                return '0';
              }
            });
          }
        }}
        style={{
          backgroundColor: Colors.primary,
          height: 20,
          width: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}>
        <RegularTextB>-</RegularTextB>
      </TouchableOpacity>
      <TextInput
        value={isInCart ? cartQuan : quantity}
        onChangeText={text => {
          if (isInCart) {
            editQuantity(text);
          }
          setQuantity(text);
        }}
        style={{
          color: 'white',
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 18,
          padding: 0,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (isInCart) {
            const newquan = `${parseInt(cartQuan) + 1}`;
            editQuantity(newquan);
            setQuantity(newquan);
          } else {
            setQuantity(prev => {
              const newquan = `${parseInt(prev) + 1}`;
              return newquan;
            });
          }
        }}
        style={{
          backgroundColor: Colors.primary,
          height: 20,
          width: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}>
        <RegularTextB>+</RegularTextB>
      </TouchableOpacity>
    </View>
  );
};
const Quantity = ({
  quantity,
  setQuantity,
  editQuantity,
  isInCart,
  cartQuan,
  removeFromCart,
}) => {
  return (
    <View>
      <RegularTextB>Quantity</RegularTextB>
      <QuantityCounter
        {...{
          quantity,
          setQuantity,
          editQuantity,
          isInCart,
          cartQuan,
          removeFromCart,
        }}
        paddingHorizontal={10}
      />
    </View>
  );
};

export default Quantity;

const styles = StyleSheet.create({});
