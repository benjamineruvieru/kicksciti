import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Modalize} from 'react-native-modalize';
import WebView from 'react-native-webview';
import {getPercentHeight} from '../../../utilis/Functions';
import Colors from '../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {BASEURL} from '../../../api/base';

const PaymentModal = ({modalRef, link, order_id, callBack}) => {
  const navigation = useNavigation();
  return (
    <Modalize
      onClose={() => {
        navigation.navigate('OrderDetails', {order_id});
      }}
      modalStyle={{backgroundColor: Colors.bg}}
      ref={modalRef}
      modalHeight={getPercentHeight(80)}>
      <View
        style={{
          height: getPercentHeight(80),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        }}>
        <WebView
          startInLoadingState={true}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          nestedScrollEnabled
          source={{uri: link ?? ''}}
          style={{
            // height: getPercentHeight(80),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flex: 1,
          }}
          onLoadStart={navState => {
            console.log('navState lo', navState.nativeEvent.url);
            if (
              navState.nativeEvent.url.startsWith(`${BASEURL}/payment-redirect`)
            ) {
              modalRef.current.close();
              navigation.navigate('OrderDetails', {order_id});
              if (callBack) {
                callBack();
              }
            }
          }}
        />
      </View>
    </Modalize>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({});
