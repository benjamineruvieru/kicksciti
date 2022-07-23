import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Icon, {Icons} from '../components/Icons';

const Phonepad = props => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
        }}>
        <View style={styles.keypad}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={props.phoneFun.bind(this, 1)}
            style={styles.keypad}>
            <Text style={styles.keypadnum}>1</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypad}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={props.phoneFun.bind(this, 2)}
            style={styles.keypad}>
            <Text style={styles.keypadnum}>2</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypad}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={props.phoneFun.bind(this, 3)}
            style={styles.keypad}>
            <Text style={styles.keypadnum}>3</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-around',
          width: '100%',
        }}>
        <View style={styles.keypad}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={props.phoneFun.bind(this, 4)}
            style={styles.keypad}>
            <Text style={styles.keypadnum}>4</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypad}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={props.phoneFun.bind(this, 5)}
            style={styles.keypad}>
            <Text style={styles.keypadnum}>5</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypad}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={props.phoneFun.bind(this, 6)}
            style={styles.keypad}>
            <Text style={styles.keypadnum}>6</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-around',
          width: '100%',
        }}>
        <View style={styles.keypad}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={props.phoneFun.bind(this, 7)}
            style={styles.keypad}>
            <Text style={styles.keypadnum}>7</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypad}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={props.phoneFun.bind(this, 8)}
            style={styles.keypad}>
            <Text style={styles.keypadnum}>8</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypad}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={props.phoneFun.bind(this, 9)}
            style={styles.keypad}>
            <Text style={styles.keypadnum}>9</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-around',
          width: '100%',
        }}>
        <View style={styles.keypad} />
        <View style={styles.keypad}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={props.phoneFun.bind(this, 0)}
            style={styles.keypad}>
            <Text style={styles.keypadnum}>0</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypad}>
          <TouchableOpacity
            delayPressIn={0}
            onLongPress={props.clearFunl}
            onPress={props.clearFun}
            style={styles.keypad}>
            <Icon
              type={Icons.Feather}
              name={'delete'}
              color={Colors.white}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keypad: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  keypadnum: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 25,
    color: Colors.white,
  },

  numbview: {
    height: 40,
    width: 25,
    backgroundColor: Colors.bag4Bg,
    borderRadius: 7,
  },
});
export default Phonepad;
