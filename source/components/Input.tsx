import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useState} from 'react';
import {RegularText} from './Text';
// import OTPTextView from './otpinput';
import {SCREEN_WIDTH} from '../constants/Variables';
import Colors from '../constants/Colors';
// import SelectDropdown from 'react-native-select-dropdown';
// import Down from '../assets/svg/down.svg';
import Eyeopen from '../assets/svg/eyeopen.svg';
import Eyeclose from '../assets/svg/eyeclose.svg';

// export const DropDown = ({
//   placeholderText,
//   bottom = 20,
//   data = [],
//   onSelect,
// }) => {
//   return (
//     <>
//       <RegularText style={{marginBottom: 8, marginLeft: 4}}>
//         {placeholderText}
//       </RegularText>
//       <SelectDropdown
//         defaultButtonText="Wähle eine option"
//         data={data}
//         onSelect={(selectedItem, index) => {
//           console.log(selectedItem, index);
//           onSelect(selectedItem, index);
//         }}
//         buttonTextAfterSelection={(selectedItem, index) => {
//           // text represented after item is selected
//           // if data array is an array of objects then return selectedItem.property to render after item is selected
//           return selectedItem;
//         }}
//         rowTextForSelection={(item, index) => {
//           // text represented for each item in dropdown
//           // if data array is an array of objects then return item.property to represent item in dropdown
//           return item;
//         }}
//         renderDropdownIcon={() => <Down />}
//         buttonStyle={{
//           backgroundColor: 'white',
//           borderWidth: 1,
//           borderColor: '#0000004D',
//           borderRadius: 10,
//           width: '100%',
//           marginBottom: bottom,
//           height: 50,
//         }}
//         buttonTextStyle={{
//           fontFamily: 'Quicksand-SemiBold',
//           fontSize: 13,

//           flex: 0,
//         }}
//         dropdownStyle={{
//           backgroundColor: 'white',
//           borderRadius: 10,
//           shadowOpacity: 0,
//           elevation: 0,
//           borderWidth: 1,
//           borderColor: Colors.grey,
//           marginTop: 5,
//           borderTopWidth: 1,
//         }}
//         dropdownOverlayColor={'transparent'}
//         rowTextStyle={{
//           fontFamily: 'Quicksand-SemiBold',
//           fontSize: 13,

//           flex: 0,
//         }}
//         rowStyle={{
//           justifyContent: 'flex-start',
//           paddingHorizontal: 10,
//         }}
//         showsVerticalScrollIndicator={false}
//       />
//     </>
//   );
// };

// export const OtpInput = ({setOpt, opt, otpInputRef, dark}) => {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignSelf: 'center',
//       }}>
//       <OTPTextView
//         defaultValue={opt}
//         ref={otpInputRef}
//         handleTextChange={setOpt}
//         offTintColor={Colors.grey}
//         tintColor={Colors.primary}
//         inputCount={4}
//         textInputStyle={{
//           width: (SCREEN_WIDTH - 120) / 4,
//           color: 'black',
//           fontFamily: 'Quicksand-Medium',
//           borderBottomWidth: 1,
//           backgroundColor: 'white',
//           borderRadius: 15,
//           height: 70,
//           borderWidth: 1,
//           borderColor: Colors.grey,
//         }}
//       />
//     </View>
//   );
// };

interface InputProps {
  style?: ViewStyle;
  bottom?: number;
  placeholder?: string;
  placeholderText?: string;
  inputStyle?: TextStyle;
  password?: boolean;
  keyboard?: KeyboardTypeOptions;
  handleKeyPress?: (e: TextInputKeyPressEventData) => void;
  multiline?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  text: string;
  setText: (text: string) => void;
}

export const DescriptionInput = ({
  style,
  bottom = 20,
  placeholder,
  placeholderText,
  inputStyle,
  password,
  keyboard = 'default',
  text,
  setText,
}) => {
  return (
    <>
      <RegularText style={{marginBottom: 8, marginLeft: 4}}>
        {placeholderText}
      </RegularText>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#0000004D',
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: bottom,
          backgroundColor: 'white',
          ...style,
        }}>
        <TextInput
          value={text}
          onChangeText={setText}
          keyboardType={keyboard}
          secureTextEntry={password}
          placeholder={placeholder}
          placeholderTextColor={'#0000004D'}
          multiline
          style={{
            height: 130,
            fontFamily: 'Quicksand-Medium',
            color: 'black',
            textAlignVertical: 'top',
            ...inputStyle,
          }}
        />
      </View>
    </>
  );
};

export const PhoneInput = ({
  style,
  bottom = 20,
  placeholder,
  inputStyle,
  setCode,
  code,
  text,
  setText,
}) => {
  return (
    <>
      <RegularText style={{marginBottom: 8, marginLeft: 4}}>
        Telefonnummer
      </RegularText>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#0000004D',
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: bottom,
          backgroundColor: 'white',
          flexDirection: 'row',
          ...style,
        }}>
        <TextInput
          keyboardType={'numeric'}
          placeholderTextColor={'#0000004D'}
          value={code}
          onChangeText={setCode}
          style={{
            height: 50,
            fontFamily: 'Quicksand-Medium',
            color: 'black',
            paddingLeft: 8,
            ...inputStyle,
          }}
        />
        <View
          style={{
            backgroundColor: Colors.grey,
            width: 1,
            marginVertical: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        />
        <TextInput
          keyboardType={'numeric'}
          placeholder={placeholder}
          placeholderTextColor={'#0000004D'}
          value={text}
          onChangeText={setText}
          style={{
            height: 50,
            fontFamily: 'Quicksand-Medium',
            color: 'black',
            ...inputStyle,
          }}
        />
      </View>
    </>
  );
};

const Input: FC<InputProps> = ({
  style,
  bottom = 20,
  placeholder,
  placeholderText,
  inputStyle,
  password,
  keyboard = 'default',
  handleKeyPress,
  multiline,
  returnKeyType,
  onSubmitEditing,
  text,
  setText,
}) => {
  const [hide, setHide] = useState(password);
  return (
    <>
      {placeholderText && (
        <RegularText style={{marginBottom: 8, marginLeft: 4}}>
          {placeholderText}
        </RegularText>
      )}
      <View
        style={{
          borderBottomWidth: 3,
          borderColor: Colors.primary,
          marginBottom: bottom,
          flexDirection: 'row',
          alignItems: 'center',
          ...style,
        }}>
        <TextInput
          value={text}
          onChangeText={setText}
          returnKeyType={returnKeyType}
          multiline={multiline}
          keyboardType={keyboard}
          secureTextEntry={hide}
          placeholder={placeholder}
          placeholderTextColor={'#FFFFFF50'}
          style={{
            height: 50,
            fontSize: 17,
            fontFamily: 'Gilroy-Bold',
            color: 'white',
            flex: 1,
            ...inputStyle,
          }}
          onKeyPress={handleKeyPress}
          onSubmitEditing={onSubmitEditing}
        />
        {password && (
          <TouchableOpacity
            onPress={() => setHide(p => !p)}
            style={{marginRight: 5}}>
            {hide ? (
              <Eyeclose height={15} width={15} />
            ) : (
              <Eyeopen height={15} width={15} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({});
