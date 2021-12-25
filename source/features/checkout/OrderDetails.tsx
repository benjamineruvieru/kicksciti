import {
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
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
import {
  formatNumberWithCommas,
  getPercentWidth,
  showNotification,
} from '../../utilis/Functions';
import {formatTimestamp} from '../bottomtabs/profile/OrderHistory';
import TimeLine from './components/TimeLine';
import PaymentModal from './components/PaymentModal';
import useRefetchOnRemount from '../../hooks/useRefetchOnRemount';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';
import Button from '../../components/Button';

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
        onPress={() => {
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

const OrderInfo = ({order, modalRef, setLink}) => {
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
    deliveryfeePaid,
    paymentOnDelivery,
  } = order ?? {};
  console.log('order', order);

  const sortedProgress = progress
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .reverse();
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
        {paymentOnDelivery && (
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <SmallTextB>Payment Type</SmallTextB>

            <SmallText
              dim
              style={{
                marginLeft: 10,
                flex: 1,
                textAlign: 'right',
              }}>
              Payment On Delivery
            </SmallText>
          </View>
        )}
        {paymentOnDelivery ? (
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <SmallTextB>Delivery Fee Payment</SmallTextB>
            <SmallText
              style={{
                color: deliveryfeePaid ? Colors.green : '#F29339',
                marginLeft: 10,
                flex: 1,
                textAlign: 'right',
              }}>
              {deliveryfeePaid ? 'Paid' : 'Pending'}
            </SmallText>
          </View>
        ) : (
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
        )}

        {!deliveryfeePaid && paymentOnDelivery && (
          <>
            <SmallText style={{marginTop: 10}}>
              Kindly note that payment of the delivery fee is required for the
              processing of your order. To ensure a swift delivery, please
              proceed with the payment of the delivery fee.
            </SmallText>
            <SmallText
              onPress={() => {
                retryPayment({order_id})
                  .then(data => {
                    console.log('dat', data.data);
                    setLink(data?.data?.link);
                    modalRef.current.open();
                  })
                  .catch(err => {
                    console.log('err', err?.response?.data);
                    showNotification({
                      error: true,
                      msg: err?.response?.data?.error,
                    });
                  });
              }}
              style={{
                marginTop: 10,
                color: Colors.primary,
                textDecorationLine: 'underline',
              }}>
              Retry payment
            </SmallText>
          </>
        )}

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
      <TimeLine {...{progress: sortedProgress}} />
    </View>
  );
};
const OrderNotFound = ({navigation}) => {
  return (
    <View style={{flex: 1, paddingVertical: 20, alignItems: 'center'}}>
      <View style={{flex: 1}} />
      <LayoutAnimationComponent delay={300}>
        <Image
          resizeMode="contain"
          style={{
            width: getPercentWidth(80),
            height: getPercentWidth(75),
          }}
          source={require('../../assets/images/illustrations/notfound.png')}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={400}>
        <RegularTextB style={{marginBottom: 5}}>Order Not Found!</RegularTextB>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={500}>
        <SmallText style={{textAlign: 'center'}}>
          Oops! It looks like the order you're trying to find is not available.
          Please double-check the link or create a new order now.
        </SmallText>
      </LayoutAnimationComponent>

      <View style={{flex: 1}} />
      <LayoutAnimationComponent delay={600}>
        <Button
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'AniStackNav',
                  params: {screen: 'BottomNav'},
                },
              ],
            });
          }}
          top={15}
          title="Go Home"
        />
      </LayoutAnimationComponent>
    </View>
  );
};

const OrderDetails = ({route, navigation}) => {
  const {order_id} = route?.params ?? {};
  const {data, isLoading, refetch, isError} = useApi({
    queryFn: getOrder,
    queryKey: ['getOrder', order_id],
  });
  const order = data?.order ?? {};
  const [link, setLink] = useState();

  const modalRef = useRef();

  useRefetchOnRemount(refetch);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <>
      <Mainbackground padding={20}>
        <PageHeader title={'Order Details'} />
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center', paddingBottom: 50}}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : isError ? (
          <OrderNotFound {...{navigation}} />
        ) : order?.active ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}>
            <OrderInfo {...{order, modalRef, setLink}} />
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={{justifyContent: 'center', flex: 1}}
            style={{flex: 1}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <PaymentPending {...{order_id, modalRef, setLink}} />
          </ScrollView>
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
