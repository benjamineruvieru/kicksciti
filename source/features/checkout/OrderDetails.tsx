import {View, ActivityIndicator, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import Mainbackground from '../../components/Mainbackground';
import PageHeader from '../../components/PageHeader';
import {useApi} from '../../hooks/useApi';
import {getOrder, retryPayment} from '../../api/order';
import Colors from '../../constants/Colors';
import LottieView from 'lottie-react-native';
import {SCREEN_WIDTH} from '../../constants/Variables';
import {
  MediumText,
  RegularText,
  RegularTextB,
  SmallText,
  SmallTextB,
} from '../../components/Text';
import {formatNumberWithCommas, showNotification} from '../../utilis/Functions';
import {formatTimestamp} from '../bottomtabs/profile/OrderHistory';
import TimeLine from './components/TimeLine';
import PaymentModal from './components/PaymentModal';
import useRefetchOnRemount from '../../hooks/useRefetchOnRemount';

const OrderDetailsView = ({}) => {
  return (
    <View>
      <View></View>
    </View>
  );
};
const PaymentPending = ({order_id, modalRef, setLink}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 120,
        flex: 1,
      }}>
      <LottieView
        loop
        autoPlay
        style={{
          width: SCREEN_WIDTH / 1.8,
          height: SCREEN_WIDTH / 1.8,
          top: 4,
        }}
        source={require('../../assets/lottie/pendingpayment.json')}
      />
      <RegularTextB style={{marginBottom: 5}}>
        Your payment is being confirmed
      </RegularTextB>
      <SmallText style={{textAlign: 'center'}}>
        We are confirming the payment for{'\n'}this order, please be patient
      </SmallText>
      <SmallText
        onTextPress={() => {
          retryPayment({order_id})
            .then(data => {
              console.log('dat', data.data);
              setLink(data?.data?.link);
              modalRef.current.open();
            })
            .catch(err => {
              console.log('err', err?.response?.data);
              showNotification({error: true, msg: err?.response?.data?.error});
            });
        }}
        style={{
          marginTop: 30,
          color: Colors.primary,
          textDecorationLine: 'underline',
        }}>
        Retry payment
      </SmallText>
    </View>
  );
};

const OrderInfo = ({order}) => {
  const {
    order_id,
    products,
    status_color,
    status,
    state,
    address,
    lga,
    phone,
    paid,
    subtotal,
    totalamount,
    deliveryfee,
    createdAt,
    progress,
  } = order ?? {};
  console.log('products', products);
  return (
    <View>
      <RegularTextB style={{marginBottom: 10}}>Order details</RegularTextB>
      <View
        style={{
          backgroundColor: Colors.highlight,
          padding: 10,
          borderRadius: 10,
          paddingVertical: 15,
          marginBottom: 20,
        }}>
        <SmallTextB style={{marginBottom: 5}}>Items</SmallTextB>
        {products.map((data, i) => {
          const {name, discount, price, quantity} = data.item ?? {};
          const displayPrice = price - (discount ?? 0);

          return (
            <View
              key={i}
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <SmallTextB>
                {i + 1}. {name} x{data?.quantity}
              </SmallTextB>
              <SmallText
                style={{marginLeft: 10, flex: 1, textAlign: 'right'}}
                dim>
                ₦ {formatNumberWithCommas(displayPrice)}
              </SmallText>
            </View>
          );
        })}
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SmallTextB>Sub-total</SmallTextB>
          <SmallText style={{marginLeft: 10, flex: 1, textAlign: 'right'}} dim>
            ₦ {formatNumberWithCommas(subtotal)}
          </SmallText>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SmallTextB>Total</SmallTextB>
          <SmallText style={{marginLeft: 10, flex: 1, textAlign: 'right'}} dim>
            ₦ {formatNumberWithCommas(totalamount)}
          </SmallText>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SmallTextB>Date</SmallTextB>
          <SmallText dim style={{marginLeft: 10, flex: 1, textAlign: 'right'}}>
            {formatTimestamp(createdAt)}
          </SmallText>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SmallTextB>Status</SmallTextB>

          <SmallText
            style={{
              color: status_color,
              marginLeft: 10,
              flex: 1,
              textAlign: 'right',
            }}>
            {status}
          </SmallText>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SmallTextB>Payment</SmallTextB>
          <SmallText
            style={{
              color: paid ? Colors.green : '#F29339',
              marginLeft: 10,
              flex: 1,
              textAlign: 'right',
            }}>
            {paid ? 'Paid' : 'Pending'}
          </SmallText>
        </View>

        <RegularTextB style={{marginBottom: 4, marginTop: 20}}>
          Order ID
        </RegularTextB>

        <SmallText>{order_id}</SmallText>
      </View>
      <RegularTextB style={{marginBottom: 10}}>Delivery details</RegularTextB>

      <View
        style={{
          backgroundColor: Colors.highlight,
          padding: 10,
          borderRadius: 10,
          paddingVertical: 10,
          marginBottom: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SmallTextB>Delivery fee</SmallTextB>
          <SmallText style={{marginLeft: 10, flex: 1, textAlign: 'right'}} dim>
            ₦ {formatNumberWithCommas(deliveryfee)}
          </SmallText>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SmallTextB>Address</SmallTextB>
          <SmallText style={{marginLeft: 10, flex: 1, textAlign: 'right'}} dim>
            {address}
          </SmallText>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SmallTextB>Local government area</SmallTextB>
          <SmallText style={{marginLeft: 10, flex: 1, textAlign: 'right'}} dim>
            {lga}
          </SmallText>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SmallTextB>State</SmallTextB>
          <SmallText style={{marginLeft: 10, flex: 1, textAlign: 'right'}} dim>
            {state}
          </SmallText>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SmallTextB>Contact phone number</SmallTextB>
          <SmallText dim>{phone}</SmallText>
        </View>
      </View>
      <TimeLine {...{progress}} />
    </View>
  );
};

const OrderDetails = ({route}) => {
  const {order_id} = route?.params ?? {};
  const {data, isLoading, refetch} = useApi({
    queryFn: getOrder,
    queryKey: ['getOrder', order_id],
  });
  const order = data?.order ?? {};
  const [link, setLink] = useState();

  const modalRef = useRef();

  console.log('da', data?.order);
  useRefetchOnRemount(refetch);
  return (
    <>
      <Mainbackground padding={20}>
        <PageHeader title={'Order Details'} />
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center', paddingBottom: 50}}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : order?.active ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <OrderInfo {...{order}} />
          </ScrollView>
        ) : (
          <PaymentPending {...{order_id, modalRef, setLink}} />
        )}
      </Mainbackground>
      <PaymentModal
        {...{
          modalRef,
          link,
          order_id,
          callBack: () => {
            refetch();
          },
        }}
      />
    </>
  );
};

export default OrderDetails;
