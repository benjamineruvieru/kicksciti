import {Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import Colors from '../../../../constants/Colors';
import {RegularTextB, SmallText} from '../../../../components/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Input, {ModalSelector} from '../../../../components/Input';
import Button from '../../../../components/Button';
import {getWithdrawFee, verifyBankDetails} from '../../../../api/user';
import useDebounce from '../../../../hooks/useDebounce';

const WithdrawModal = ({
  modalRef,
  account_bank,
  pinmodalRef,
  account_number,
  setaccount_number,
  fee,
  setFee,
  amount,
  setAmount,
  bank,
  setBank,
  bankData,
  name,
  setName,
}) => {
  const insets = useSafeAreaInsets();

  const [load, setLoad] = useState();
  useEffect(() => {
    if (account_number?.length === 10 && bank) {
      setLoad(true);
      verifyBankDetails({account_number, account_bank: account_bank.code})
        .then(data => {
          console.log('datsss rr', data.data);
          setName(data.data.data.account_name);
        })
        .catch(() => {
          Alert.alert('Account verification failed');
          setName();
          setFee();
        })
        .finally(() => {
          setLoad(false);
        });
    }
  }, [bank, account_number]);

  useDebounce(
    () => {
      if (amount && parseFloat(amount) > 0) {
        setLoad(true);
        getWithdrawFee({amount})
          .then(data => {
            console.log('datsss rr', data.data);

            setFee(data.data.fee);
          })
          .catch(() => {
            Alert.alert('Error getting transaction fee');
            setFee();
          })
          .finally(() => {
            setLoad(false);
          });
      }
    },
    [amount],
    900,
  );

  const withdrawFun = () => {
    // pinmodalRef.current.open();

    if (fee && amount && parseFloat(amount) > 0) {
      if (parseFloat(amount) > 200) {
        pinmodalRef.current.open();
        modalRef.current.close();
      } else {
        Alert.alert('Amount cannot be less than ₦200');
      }
    }
  };

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
        <RegularTextB style={{marginBottom: 20}}>Withdraw Balance</RegularTextB>
        <ModalSelector
          search
          text={bank}
          setText={setBank}
          data={bankData?.data.map(item => item?.name).sort()}
          placeholderText={'Select Bank'}
        />
        <Input
          maxLength={10}
          text={account_number}
          setText={setaccount_number}
          placeholderText="Account Number"
          keyboard="numeric"
        />
        {name && (
          <>
            <Input
              editable={false}
              text={name}
              placeholderText="Account Name"
            />
            <Input
              text={amount}
              setText={setAmount}
              placeholderText="Amount"
              keyboard={'numeric'}
              bottom={10}
            />
            <SmallText style={{marginBottom: 20}}>Fee: {fee}</SmallText>
          </>
        )}
        <Button
          title="Withdraw"
          onPress={withdrawFun}
          disable={!fee}
          bottom={30}
          load={load}
        />
      </View>
    </Modalize>
  );
};

export default WithdrawModal;

const styles = StyleSheet.create({});
