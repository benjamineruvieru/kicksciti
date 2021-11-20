import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SmallText, SmallTextB} from './Text';
import Colors from '../constants/Colors';
import {getPercentWidth} from '../utilis/Functions';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {ANDROID_CLIENTID, IOS_CLIENTID, WEB_CLIENTID} from '@env';
import Google from '../assets/svg/google.svg';
import {logininGoogle, signupGoogle} from '../api/auth';
import {useNavigation} from '@react-navigation/native';
import {setItem} from '../utilis/storage';
import {DeviceEventEmitter} from 'react-native';

GoogleSignin.configure({
  webClientId: WEB_CLIENTID,
  androidClientId: ANDROID_CLIENTID,
  iosClientId: IOS_CLIENTID,
  profileImageSize: 120,
});

const signInGoogle = async loadNotifyClose => {
  try {
    await GoogleSignin.hasPlayServices();
    const isSignedIn = await GoogleSignin.isSignedIn();
    isSignedIn && (await GoogleSignin.signOut());
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
    }

    return error;
  }
};

export const GoogleButton = ({login, type}) => {
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const action = async () => {
    const {idToken, user} = await signInGoogle();
    console.log(user?.id, user, type);
    if (login) {
      if (type) {
        setLoad(true);
        logininGoogle({idToken: user.id, type})
          .then(async data => {
            console.log('suc', data.data);
            setItem('token', data.data?.authToken);
            if (type === 'poster') {
              setItem('accountType', 'company');
              setItem('userdetails', data?.data?.company, true);
              setItem('email', user.email);
              if (data.data?.company?.isProfileSetupComplete) {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'BottomNav'}],
                });
              } else {
                navigation.navigate('SetProfile', {
                  type,
                  email: user.email,
                });
              }
            } else {
              setItem('accountType', 'personal');
              setItem('userdetails', data?.data?.user, true);
              if (data.data?.user?.isProfileSetupComplete) {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'BottomNav'}],
                });
              } else {
                navigation.navigate('SetProfile', {
                  type,
                  email: user.email,
                });
              }
            }
          })
          .catch(err => {
            console.log('err', err.response.data);
            DeviceEventEmitter.emit('openNotification', {
              error: true,
              msg: err.response.data?.error.messageGe,
            });
          })
          .finally(() => {
            setLoad(false);
          });
      } else {
        DeviceEventEmitter.emit('openNotification', {
          error: true,
          msg: 'Bitte wählen Sie den Kontotyp aus',
        });
      }
    } else {
      setLoad(true);
      signupGoogle({
        idToken: user?.id,
        type,
        email: user.email,
        first_name: user?.givenName,
        last_name: user?.familyName,
        company_name: user?.name,
      })
        .then(data => {
          console.log('suc', data.data);
          setItem('token', data.data?.authToken);
          setItem('email', user.email);

          navigation.navigate('SetProfile', {
            picture: user.photo,
            type,
          });
        })
        .catch(err => {
          console.log('err', err.response.data);
          DeviceEventEmitter.emit('openNotification', {
            error: true,
            msg: err.response.data?.error.messageGe,
          });
        })
        .finally(() => {
          setLoad(false);
        });
    }
  };
  return (
    <TouchableOpacity
      disabled={load}
      onPress={action}
      style={{
        width: getPercentWidth(90),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.grey,
        padding: 15,
        flexDirection: 'row',
        opacity: load ? 0.5 : 1,
      }}>
      {load ? <ActivityIndicator /> : <Google />}
      <SmallText style={{marginLeft: 10}}>Anmeldung mit Google</SmallText>
    </TouchableOpacity>
  );
};
const Button = ({
  title,
  width = 90,
  style,
  load,
  onPress,
  backgroundColor = 'black',
  bottom = 0,
  top = 0,
  small,
  disable,
  grey,
  isSec,
  red,
  Icon,
}) => {
  const styles = StyleSheet.create({
    bg: {
      backgroundColor: red
        ? '#FF5E5E'
        : isSec
        ? 'transparent'
        : grey
        ? '#EDEDED'
        : backgroundColor,
      borderRadius: small ? 5 : 8,
      justifyContent: 'center',
      alignItems: 'center',
      padding: small ? 10 : 15,
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
      {load && <ActivityIndicator color={'white'} style={{marginRight: 10}} />}
      <SmallTextB
        style={{
          color: isSec ? Colors.primary : grey ? Colors.dim : 'white',
        }}>
        {title}
      </SmallTextB>
      {Icon && <Icon style={{marginLeft: 10}} width={18} height={18} />}
    </TouchableOpacity>
  );
};

export default Button;
