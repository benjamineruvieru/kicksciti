import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, storeData} from '../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch} from 'react-redux';
import {
  put_delivery,
  put_gender,
  put_name,
} from '../redux/actions/headeraction';
import {nigeriaStates} from '../constants';
import DropdownAlert from 'react-native-dropdownalert';

const EditProfile = props => {
  const [nigeriaState, setNigeriaState] = useState(nigeriaStates);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        textinputref1.current.blur();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  let nameE, addressE;
  const textinputref1 = useRef(null);
  const route = useRoute();
  const dispatch = useDispatch();
  const {name, address, genderG, state} = route.params;
  const [open2, setOpen2] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(state);
  const [value2, setValue2] = useState(genderG);
  const [gender, setGender] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);

  const saveProfile = () => {
    if (!(nameE === name || !nameE)) {
      Notify('Saved', 'Profile updated successfully', 'success');

      storeData('name', nameE);
      dispatch(put_name(nameE));
    }
    if (!(addressE === address || !addressE)) {
      Notify('Saved', 'Profile updated successfully', 'success');

      storeData('address', addressE);
    }
    if (!(genderG === value2 || !value2)) {
      Notify('Saved', 'Profile updated successfully', 'success');

      storeData('gender', value2);
      dispatch(put_gender(value2));
    }
    if (!(state === value || !value)) {
      Notify('Saved', 'Profile updated successfully', 'success');

      storeData('state', value);
      if (value === 'Lagos') {
        storeData('2000', 'delivery');
        dispatch(put_delivery(2000));
      } else {
        storeData('2500', 'delivery');
        dispatch(put_delivery(2500));
      }
    }
  };

  const editName = value => {
    nameE = value;
  };
  const editAdd = value => {
    addressE = value;
  };
  let dropDownAlertRef = useRef();

  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };

  const Tab = props => {
    return (
      <>
        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            color: Colors.white,
            marginVertical: 10,
          }}>
          {props.title}
        </Text>
        <View
          style={{
            backgroundColor: Colors.bag1Bg,
            height: 50,
            width: '100%',
            alignSelf: 'center',
            borderRadius: 15,
            marginTop: 5,
            padding: 3,
            paddingHorizontal: 12,
          }}>
          <TextInput
            ref={textinputref1}
            placeholder={props.title}
            placeholderTextColor={Colors.darkGray}
            onChangeText={props.fun}
            defaultValue={props.default}
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 13,
              flex: 1,
              color: Colors.white,
            }}
          />
        </View>
      </>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Colors.bag4Bg, padding: 16}}>
      <View
        style={{
          paddingVertical: 16,
          width: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: Colors.white,
            width: 50,
            height: 5,
            borderRadius: 360,
          }}
        />
        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 17,
            color: Colors.white,
            marginTop: 15,
          }}>
          Edit Profile
        </Text>
      </View>
      <Tab title={'Name'} fun={editName} default={name} />
      <Tab title={'Address'} fun={editAdd} default={address} />
      <Text
        style={{
          fontFamily: 'Gilroy-SemiBold',
          color: Colors.white,
          marginVertical: 15,
        }}>
        Select State
      </Text>
      <DropDownPicker
        listMode={'MODAL'}
        open={open}
        value={value}
        items={nigeriaState}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setNigeriaState}
        placeholder="Gender"
        placeholderStyle={{color: Colors.textGrey}}
        style={{backgroundColor: Colors.bag1Bg}}
        textStyle={{
          fontFamily: 'Gilroy-SemiBold',
          color: Colors.white,
        }}
        modalProps={{
          animationType: 'slide',
        }}
        modalTitle="Gender"
        modalContentContainerStyle={{
          backgroundColor: Colors.bag1Bg,
        }}
      />
      <Text
        style={{
          fontFamily: 'Gilroy-SemiBold',
          color: Colors.white,
          marginVertical: 15,
        }}>
        Select Gender
      </Text>
      <DropDownPicker
        listMode={'MODAL'}
        open={open2}
        value={value2}
        items={gender}
        setOpen={setOpen2}
        setValue={setValue2}
        setItems={setGender}
        placeholder="Gender"
        placeholderStyle={{color: Colors.textGrey}}
        style={{backgroundColor: Colors.bag1Bg}}
        textStyle={{
          fontFamily: 'Gilroy-SemiBold',
          color: Colors.white,
        }}
        modalProps={{
          animationType: 'slide',
        }}
        modalTitle="Gender"
        modalContentContainerStyle={{
          backgroundColor: Colors.bag1Bg,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignItems: 'flex-end',
          flex: 1,
        }}>
        <View
          style={{
            height: 55,
            width: '100%',
            borderRadius: 360,
            marginTop: 15,
          }}>
          <TouchableOpacity
            delayPressIn={0}
            style={{
              width: '100%',
              backgroundColor: Colors.primaryDark,
              height: 55,
              borderRadius: 360,
              flexDirection: 'row',
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={saveProfile}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 15,
                color: Colors.white,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <DropdownAlert
        zIndex={1000}
        updateStatusBar={false}
        defaultContainer={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 12,
          margin: 10,
          borderRadius: 15,
        }}
        messageStyle={{fontFamily: 'Gilroy-Regular', color: 'white'}}
        titleStyle={{fontFamily: 'Gilroy-SemiBold', color: 'white'}}
        imageStyle={{height: 25, width: 25, alignSelf: 'center'}}
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
