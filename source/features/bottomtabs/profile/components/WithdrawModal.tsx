import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import Colors from '../../../../constants/Colors';
import {RegularTextB, SmallText} from '../../../../components/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Input, {ModalSelector} from '../../../../components/Input';
import Button from '../../../../components/Button';
import {ListDialog} from '../../../../components/Dialog';
import {useApi} from '../../../../hooks/useApi';
import {
  getBanks,
  getWithdrawFee,
  verifyBankDetails,
  withdraw,
} from '../../../../api/user';
import useDebounce from '../../../../hooks/useDebounce';
import {showNotification} from '../../../../utilis/Functions';

const WithdrawModal = ({modalRef, refetch}) => {
  const insets = useSafeAreaInsets();
  const [bank, setBank] = useState();
  const [account_number, setaccount_number] = useState('');
  const [name, setName] = useState();
  const [fee, setFee] = useState();
  const [amount, setAmount] = useState();
  const [load, setLoad] = useState();

  const {data} = useApi({queryFn: getBanks, queryKey: ['getBanks']});

  const account_bank = data?.data?.find(item => item.name === bank);
  console.log('account_bank', account_bank);
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
            // const item = data.data.data.find(item => item?.currency === 'NGN');
            // console.log('datsss rr', item);
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
    if (fee && amount && parseFloat(amount) > 0) {
      setLoad(true);
      withdraw({account_number, amount, fee, account_bank: account_bank.code})
        .then(data => {
          console.log('datsss rr', data.data);

          refetch();
          modalRef.current.close();
          showNotification({msg: 'Withdrawal successful'});
        })
        .catch(err => {
          Alert.alert(err.response.data.error);
        })
        .finally(() => {
          setLoad(false);
        });
    }
  };

  return (
    <Modalize
      adjustToContentHeight
      modalStyle={{
        backgroundColor: Colors.bg,
        padding: 20,
        paddingBottom: 20,
      }}
      ref={modalRef}>
      <View style={{paddingBottom: insets.bottom}}>
        <RegularTextB style={{marginBottom: 20}}>Withdraw Balance</RegularTextB>
        <ModalSelector
          search
          text={bank}
          setText={setBank}
          data={data?.data.map(item => item?.name).sort()}
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
