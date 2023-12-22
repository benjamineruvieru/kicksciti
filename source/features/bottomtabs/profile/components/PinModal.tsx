import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import Colors from '../../../../constants/Colors';
import {MediumText, RegularTextB} from '../../../../components/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import LayoutAnimationComponent from '../../../../components/LayoutAnimationComponent';
import {getPercentHeight, showNotification} from '../../../../utilis/Functions';
import useKeyboardOpen from '../../../../hooks/useKeyboardOpen';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import {login} from '../../../../api/auth';
import {getItem, setItem} from '../../../../utilis/storage';
import {setRemotePin, validatePin, withdraw} from '../../../../api/user';

export const PinInput = ({setPin, pin, num = 4}) => {
  //   const ref = useBlurOnFulfill({value: pin, cellCount: 4});
  //   const [props, getCellOnLayoutHandler] = useClearByFocusCell({
  //     value: pin,
  //     setValue: setPin,
  //   });
  const SIZE = 55;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
      }}>
      <CodeField
        // ref={ref}
        // {...props}
        value={pin}
        onChangeText={setPin}
        cellCount={4}
        rootStyle={{marginBottom: 30, justifyContent: 'space-between'}}
        keyboardType="number-pad"
        textContentType="password"
        secureTextEntry={true}
        renderCell={({index, symbol, isFocused}) => (
          <LayoutAnimationComponent
            key={index}
            leftInOut
            exitDelay={100 + index * 100}
            delay={100 + index * 100}>
            <View
              style={{
                width: SIZE,
                height: SIZE,
                marginRight: index + 1 === num ? 0 : 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 3,
                borderRadius: 10,
                borderColor: symbol || isFocused ? Colors.primary : '#ffffff30',
              }}>
              <MediumText
                style={{color: Colors.primary}}
                // onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol ? '•' : isFocused ? <Cursor /> : null}
              </MediumText>
            </View>
          </LayoutAnimationComponent>
        )}
      />
    </View>
  );
};

const PinModal = ({
  modalRef,
  refetch,
  account_number,
  amount,
  fee,
  account_bank,
  setFee,
  setBank,
  setaccount_number,
  setAmount,
  setName,
}) => {
  const {email, hasPin} = getItem('userdetails', true);

  const insets = useSafeAreaInsets();
  const [pin, setPin] = useState('');
  const [pos, setPos] = useState(hasPin ? 3 : 1);
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);
  const [pinConfirm, setPinConfirm] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const withDraw = async () => {
    await withdraw({
      account_number,
      amount,
      fee,
      account_bank: account_bank.code,
      pin,
    })
      .then(data => {
        console.log('datsss rr', data.data);

        refetch();
        modalRef.current.close();
        showNotification({msg: 'Withdrawal successful'});
        setFee();
        setBank();
        setaccount_number();
        setAmount();
        setPin();
        setPinConfirm();
        setName();
      })
      .catch(err => {
        Alert.alert(err.response.data.error);
      });
  };
  useKeyboardOpen(
    () => {
      setKeyboardOpen(true);
    },
    () => {
      setKeyboardOpen(false);
    },
    [],
  );
  useEffect(() => {
    if (pin?.length === 4) {
      console.log('yes', pin);
      if (pos === 1) {
        setPinConfirm(pin);
        setPin('');
        setPos(2);
      } else if (pos === 2) {
        if (pinConfirm === pin) {
          setLoad(true);

          setRemotePin({pin})
            .then(async data => {
              console.log(data?.data);
              setItem('userdetails', data?.data?.user, true);
              await withDraw();
            })
            .catch(err => {
              console.log('err', err.response?.data);
              Alert.alert(err.response?.data?.error);
            })
            .finally(() => {
              setLoad(false);
            });
        } else {
          Alert.alert('PINs do not match');
        }
      } else if (pos === 3) {
        setLoad(true);
        validatePin({pin})
          .then(async () => {
            await withDraw();
          })
          .catch(err => {
            console.log('err', err.response?.data);
            Alert.alert(err.response?.data?.error);
          })
          .finally(() => {
            setLoad(false);
          });
      }
    }
  }, [pin, pos, pinConfirm]);
  console.log('pin', pin);
  return (
    <Modalize
      adjustToContentHeight
      modalStyle={{
        backgroundColor: Colors.bg,
        padding: 20,
        paddingBottom: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
      ref={modalRef}>
      <View style={{paddingBottom: insets.bottom}}>
        <RegularTextB
          style={{marginBottom: 30, marginTop: 10, alignSelf: 'center'}}>
          {pos === 0 || pos === 1
            ? 'Create a new PIN'
            : pos === 2
            ? 'Re-enter PIN'
            : 'Enter your PIN'}
        </RegularTextB>
        {pos === 0 && (
          <>
            <Input
              placeholderText="Enter your password"
              password
              setText={setPassword}
              text={password}
            />
            <Button
              title="Verify"
              bottom={20}
              onPress={() => {
                setLoad(true);
                login({identifier: email, password})
                  .then(async data => {
                    setPos(1);
                  })
                  .catch(err => {
                    console.log('err', err.response?.data);
                    Alert.alert('Incorrect password');
                  })
                  .finally(() => {
                    setLoad(false);
                  });
              }}
              load={load}
            />
          </>
        )}
        {pos > 0 && (
          <>
            <PinInput {...{pin, setPin}} />
            <ActivityIndicator
              color={Colors.primary}
              style={{
                marginBottom: keyboardOpen ? 0 : getPercentHeight(25),
                opacity: load ? 1 : 0,
              }}
            />
          </>
        )}
      </View>
    </Modalize>
  );
};

export default PinModal;

const styles = StyleSheet.create({});
