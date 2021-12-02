import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LayoutAnimationComponent from '../../../components/LayoutAnimationComponent';
import {RegularText, SmallText, SmallTextB} from '../../../components/Text';
import Colors from '../../../constants/Colors';

const RecentAddress = ({
  recentAddress,
  setState,

  setLga,

  setAddress,

  setPhone,
}) => {
  return (
    recentAddress &&
    recentAddress?.length > 0 && (
      <View style={{flex: 1, paddingBottom: 10}}>
        <LayoutAnimationComponent rightInOut delay={1150}>
          <SmallTextB style={{marginTop: 5, color: Colors.tabBlur}}>
            Recent Addresses
          </SmallTextB>
        </LayoutAnimationComponent>
        <ScrollView>
          {recentAddress
            .slice(0, 10)
            .reverse()
            .map((data, i) => {
              const {address, lga, phone, state} = data ?? {};
              return (
                <LayoutAnimationComponent
                  key={i}
                  rightInOut
                  delay={1350 + i * 200}>
                  <TouchableOpacity
                    onPress={() => {
                      setState(state);

                      setLga(lga);

                      setAddress(address);

                      setPhone(phone);
                    }}
                    style={{
                      backgroundColor: '#1c2429',
                      borderRadius: 10,
                      padding: 10,
                      marginTop: 10,
                    }}>
                    <RegularText>{address}</RegularText>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 3,
                      }}>
                      <SmallText>
                        {lga}, {state}
                      </SmallText>
                      <SmallText>Phone: {phone}</SmallText>
                    </View>
                  </TouchableOpacity>
                </LayoutAnimationComponent>
              );
            })}
        </ScrollView>
      </View>
    )
  );
};

export default RecentAddress;

const styles = StyleSheet.create({});
