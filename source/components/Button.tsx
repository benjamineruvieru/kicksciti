import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {SmallTextB} from './Text';
import Colors from '../constants/Colors';
import {getPercentWidth} from '../utilis/Functions';
import {isPhone} from '../constants/Variables';

interface ButtonProps {
  title: string;
  width?: number;
  style?: ViewStyle;
  load?: boolean;
  onPress?: () => void;
  backgroundColor?: string;
  bottom?: number;
  top?: number;
  small?: boolean;
  disable?: boolean;
  grey?: boolean;
  isSec?: boolean;
  Icon?: React.ElementType;
}

const Button: React.FC<ButtonProps> = ({
  title,
  width = isPhone ? 90 : 96,
  style,
  load,
  onPress,
  backgroundColor = Colors.primary,
  bottom = 0,
  top = 0,
  small,
  disable,
  grey,
  isSec,
  Icon,
}) => {
  const styles = StyleSheet.create({
    bg: {
      backgroundColor,
      borderRadius: small ? 5 : 8,
      justifyContent: 'center',
      alignItems: 'center',
      padding: small ? 8 : load ? 17 : 20,
      alignSelf: 'center',
      width: getPercentWidth(width),
      marginTop: top,
      marginBottom: bottom,
      opacity: disable || load ? 0.5 : 1,
      flexDirection: 'row',
      borderColor: Colors.primary,
      borderWidth: isSec ? 1 : 0,
      ...style,
    },
  });

  return (
    <TouchableOpacity
      disabled={load || disable}
      style={styles.bg}
      onPress={onPress}>
      {load && <ActivityIndicator color={'white'} style={{right: 15}} />}
      <SmallTextB
        style={{
          color: isSec ? Colors.primary : grey ? Colors.dim : 'white',
          fontFamily: small ? 'Gilroy-Medium' : 'Gilroy-SemiBold',
          fontSize: small ? 11 : 13,
        }}>
        {title}
      </SmallTextB>
      {Icon && <Icon style={{marginLeft: 10}} width={18} height={18} />}
    </TouchableOpacity>
  );
};

export default Button;
