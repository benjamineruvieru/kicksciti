import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Modalize} from 'react-native-modalize';
import WebView from 'react-native-webview';
import {getPercentHeight} from '../../../utilis/Functions';
import Colors from '../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const PaymentModal = ({modalRef, link, order_id}) => {
  const navigation = useNavigation();

  return (
    <Modalize
      modalStyle={{backgroundColor: Colors.bg}}
      ref={modalRef}
      modalHeight={getPercentHeight(80)}>
      <WebView
        nestedScrollEnabled
        source={{uri: link}}
        style={{
          height: getPercentHeight(80),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        onLoadStart={navState => {
          console.log('navState lo', navState.nativeEvent.url);
          if (
            navState.nativeEvent.url.startsWith(
              'https://kicksciti.com/payment/redirect',
            )
          ) {
            modalRef.current.close();
            navigation.navigate('OrderDetails', {order_id});
          }
        }}
      />
    </Modalize>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({});
