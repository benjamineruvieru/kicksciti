import {
  ActivityIndicator,
  BackHandler,
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Mainbackground from '../../components/Mainbackground';
import {BigText, BigTextB, RegularText, SmallText} from '../../components/Text';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/Variables';
import Button from '../../components/Button';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';
import {Easing, FadeOutLeft} from 'react-native-reanimated';
import Input, {OtpInput} from '../../components/Input';
import {showNotification, validateEmail} from '../../utilis/Functions';
import {
  createUser,
  findEmail,
  login,
  resendOtp,
  resetPassword,
  verifyEmail,
} from '../../api/auth';
import {getItem, setItem} from '../../utilis/storage';
import {useMMKVObject} from 'react-native-mmkv';
import {NavigationProp} from '@react-navigation/native';

const bg = require('../../assets/images/onboarding/bg.webp');

function secondsToMMSS(seconds: number) {
  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format the time as MM:SS
  const timeFormat = `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`;

  return timeFormat;
}

interface ComponentsProps {
  setPos?: (pos: number) => void;
  password?: string;
  setPassword?: (password: string) => void;
  repassword?: string;
  setRepassword?: (repassword: string) => void;
  email?: string;
  setEmail?: (email: string) => void;
  token?: string;
  setToken?: (token: string) => void;
  navigation?: NavigationProp<any>;
  resetotp?: string;
  setResetOtp?: (token: string) => void;
  name?: string;
  setName?: (name: string) => void;
  username?: string;
  setUsername?: (username: string) => void;
}

const Welcome: React.FC<ComponentsProps> = ({
  setPos = () => {},
  navigation,
}) => {
  return (
    <>
      <LayoutAnimationComponent leftInOut>
        <BigTextB style={{marginBottom: 5}}>Welcome to Kicks Citi</BigTextB>
      </LayoutAnimationComponent>

      <LayoutAnimationComponent leftInOut delay={200}>
        <RegularText style={{lineHeight: 19}}>
          Your one-stop shop for all things sneakers.{'\n'}Step into a world of
          style and comfort with our wide selection of exclusive footwears.
        </RegularText>
      </LayoutAnimationComponent>

      <View
        style={{
          alignItems: 'center',
        }}>
        <LayoutAnimationComponent>
          <Button
            testID={'get_started'}
            title={'Get Started'}
            bottom={15}
            top={20}
            onPress={() => {
              setPos(1);
            }}
          />
        </LayoutAnimationComponent>

        <LayoutAnimationComponent delay={200}>
          <TouchableOpacity
            onPress={() => {
              navigation?.reset({
                index: 0,
                routes: [{name: 'AniStackNav'}],
              });
            }}>
            <SmallText>View as guest</SmallText>
          </TouchableOpacity>
        </LayoutAnimationComponent>
      </View>
    </>
  );
};

const CollectEmail: React.FC<ComponentsProps> = ({
  setPos = () => {},
  email = '',
  setEmail = () => {},
}) => {
  const [load, setLoad] = useState(false);
  const action = () => {
    if (email && validateEmail(email)) {
      setLoad(true);
      Keyboard.dismiss();
      findEmail({email: email.toLowerCase()})
        .then(data => {
          console.log(data.data);
          console.log(data.status);
          if (data.status === 204) {
            //Email not found, create account
            setPos(2);
          } else if (data.status === 200) {
            // EMail found, collect password
            setPos(5);
          } else {
            showNotification({
              msg: 'An unknown error occurred',
              error: true,
            });
          }
        })
        .catch(err => {
          console.log('err', err?.response?.data);
          showNotification({error: true, msg: err?.response?.data?.error});
        })
        .finally(() => {
          setLoad(false);
        });
    } else {
      showNotification({
        msg: 'Please input a valid email address',
        error: true,
      });
    }
  };
  return (
    <>
      <LayoutAnimationComponent
        exit={FadeOutLeft.duration(500).easing(Easing.ease)}
        delay={500}>
        <BigText style={{marginBottom: 10}}>Enter your email address</BigText>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent
        delay={600}
        exit={FadeOutLeft.delay(150).duration(500).easing(Easing.ease)}>
        <Input
          keyboard="email-address"
          placeholder={'Email'}
          text={email}
          setText={setEmail}
          testID="email_input"
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent exit={null}>
        <Button load={load} title="Next" onPress={action} />
      </LayoutAnimationComponent>
    </>
  );
};

const CreatePassword: React.FC<ComponentsProps> = ({
  setPos = () => {},
  password = '',
  setPassword = () => {},
  repassword = '',
  setRepassword = () => {},
  email = '',
  setToken = () => {},
}) => {
  const [load, setLoad] = useState(false);

  const action = () => {
    if (password) {
      if (password.length < 6) {
        showNotification({
          msg: 'Password must be at least 6 characters long',
          error: true,
        });
        return;
      }
      if (password !== repassword) {
        showNotification({
          msg: 'Passwords provided do not match',
          error: true,
        });
        return;
      }
      Keyboard.dismiss();
      setLoad(true);
      createUser({email, password})
        .then(data => {
          console.log(data.data);
          setToken(data?.data?.token);
          setPos(4);
        })
        .catch(err => {
          console.log('err', err?.response?.data);
          showNotification({error: true, msg: err?.response?.data?.error});
        })
        .finally(() => {
          setLoad(false);
        });
    } else {
      showNotification({
        msg: 'Please input a password for your new account',
        error: true,
      });
    }
  };
  return (
    <>
      <LayoutAnimationComponent delay={800} leftInOut>
        <BigText style={{marginBottom: 10}}>Create a password</BigText>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={900} exitDelay={300} leftInOut>
        <Input
          placeholder={'Password'}
          password
          text={password}
          setText={setPassword}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={1100} exitDelay={500} leftInOut>
        <Input
          placeholder={'Retype Password'}
          password
          text={repassword}
          setText={setRepassword}
        />
      </LayoutAnimationComponent>

      <Button title="Next" load={load} onPress={action} />
    </>
  );
};

const CollectPassword: React.FC<ComponentsProps> = ({
  password = '',
  setPassword = () => {},
  email = '',
  navigation,
  setPos = () => {},
  setToken = () => {},
}) => {
  const [loadForgot, setLoadForgot] = useState(false);

  const [load, setLoad] = useState(false);
  const [cart, setCart] = useMMKVObject('cart');
  const [favourites, setFavourites] = useMMKVObject('favourites');

  const action = () => {
    if (password) {
      Keyboard.dismiss();
      setLoad(true);
      login({identifier: email, password})
        .then(data => {
          console.log('coll pass', data.data);
          console.log('coll pass', data.status);

          if (data.status === 202) {
            // Email not verified
            setToken(data?.data?.token);
            setPos(4);
          } else {
            if (!data.data?.user?.username) {
              setToken(data.data?.token);
              setPos(3);
              return;
            }
            setItem('token', data.data?.token);
            setItem('userdetails', data.data?.user, true);
            setCart(data.data?.user?.cart);
            setFavourites(data.data?.user?.favourites);
            if (getItem('affilateRefer')) {
              navigation?.navigate(
                'LoadProduct',
                getItem('affilateRefer', true),
              );
            } else {
              navigation?.reset({
                index: 0,
                routes: [{name: 'AniStackNav'}],
              });
            }
          }
        })
        .catch(err => {
          console.log('err', err);
          showNotification({error: true, msg: err?.response?.data?.error});
        })
        .finally(() => {
          setLoad(false);
        });
    } else {
      showNotification({
        msg: 'Please input your password',
        error: true,
      });
    }
  };
  return (
    <>
      <LayoutAnimationComponent delay={800} leftInOut>
        <BigText style={{marginBottom: 10}}>Enter your password</BigText>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={900} exitDelay={300} leftInOut>
        <Input
          testID="password_input"
          placeholder={'Password'}
          password
          text={password}
          setText={setPassword}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={1200} exit={null}>
        <Button
          testID="login_button"
          title="Login"
          load={load}
          onPress={action}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent
        delay={1400}
        style={{alignSelf: 'center', bottom: -15}}>
        <TouchableOpacity
          disabled={loadForgot}
          onPress={() => {
            setLoadForgot(true);
            resetPassword({email})
              .then(data => {
                console.log('da', data.data);
                setPos(6);
              })
              .catch(err => {
                console.log('err', err);
                showNotification({
                  error: true,
                  msg: err?.response?.data?.error,
                });
              })
              .finally(() => {
                setLoadForgot(false);
              });
          }}>
          {loadForgot ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <SmallText>Forgot Password?</SmallText>
          )}
        </TouchableOpacity>
      </LayoutAnimationComponent>
    </>
  );
};

const VerifyEmail: React.FC<ComponentsProps> = ({
  setPos = () => {},
  token = '',
  email = '',
}) => {
  const [otp, setOtp] = useState('');
  const [load, setLoad] = useState(false);
  const [seconds, setSeconds] = useState(120);
  const countdown = () => {
    const timer = setInterval(() => {
      setSeconds(num => {
        if (num - 1 < 1) {
          clearInterval(timer);
          return 0;
        } else {
          return num - 1;
        }
      });
    }, 1000);
  };
  useEffect(() => {
    countdown();
  }, []);
  const action = () => {
    if (otp && otp.length > 5) {
      Keyboard.dismiss();
      setLoad(true);
      verifyEmail({otp, token})
        .then(() => {
          setPos(3);
        })
        .catch(err => {
          console.log('err', err?.response?.data);
          showNotification({error: true, msg: err?.response?.data?.error});
        })
        .finally(() => {
          setLoad(false);
        });
    }
  };
  return (
    <View>
      <LayoutAnimationComponent
        delay={1000}
        leftInOut
        style={{marginBottom: 10}}>
        <BigText>Enter otp</BigText>
      </LayoutAnimationComponent>

      <LayoutAnimationComponent leftInOut delay={1200}>
        <RegularText style={{marginBottom: 25}}>
          Please enter the OTP sent to {email?.toLowerCase()?.trim()}
        </RegularText>
      </LayoutAnimationComponent>
      <OtpInput {...{otp, setOtp}} />
      <LayoutAnimationComponent exit={null} delay={1400}>
        <Button load={load} title="Verify" onPress={action} />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent
        delay={1400}
        style={{alignSelf: 'center', bottom: -15}}>
        <TouchableOpacity
          style={{
            opacity: seconds > 0 ? 0.5 : 1,
          }}
          disabled={seconds > 0}
          onPress={() => {
            setSeconds(120);
            countdown();
            resendOtp({token})
              .then(d => {
                console.log(d.data);
              })
              .catch(err => {
                console.log('err', err?.response?.data);
                // showNotification({error: true, msg: err?.response?.data?.error});
              });
            return;
          }}>
          <SmallText>Resend OTP ({secondsToMMSS(seconds)})</SmallText>
        </TouchableOpacity>
      </LayoutAnimationComponent>
    </View>
  );
};

const VerifyEmailReset: React.FC<ComponentsProps> = ({
  setPos = () => {},
  email = '',
  resetotp,
  setResetOtp = () => {},
}) => {
  const [load, setLoad] = useState(false);

  const action = () => {
    if (resetotp && resetotp.length > 5) {
      Keyboard.dismiss();
      setLoad(true);
      resetPassword({otp: resetotp, email})
        .then(() => {
          setPos(7);
        })
        .catch(err => {
          console.log('err', err?.response?.data);
          showNotification({error: true, msg: err?.response?.data?.error});
        })
        .finally(() => {
          setLoad(false);
        });
    }
  };
  return (
    <View>
      <LayoutAnimationComponent
        delay={1000}
        leftInOut
        style={{marginBottom: 10}}>
        <BigText>Enter reset otp</BigText>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent leftInOut delay={1200}>
        <RegularText style={{marginBottom: 25}}>
          Please enter the OTP sent to {email?.toLowerCase()?.trim()}
        </RegularText>
      </LayoutAnimationComponent>
      <OtpInput {...{otp: resetotp, setOtp: setResetOtp}} />
      <Button load={load} title="Verify" onPress={action} />
    </View>
  );
};

const CreateResetPassword: React.FC<ComponentsProps> = ({
  setPos = () => {},
  email = '',
  resetotp = '',
}) => {
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const action = () => {
    if (password) {
      if (password?.length < 6) {
        showNotification({
          msg: 'Password must be at least 6 characters long',
          error: true,
        });
        return;
      }
      if (password !== repassword) {
        showNotification({
          msg: 'Passwords provided do not match',
          error: true,
        });
        return;
      }
      Keyboard.dismiss();
      setLoad(true);
      resetPassword({email, password, otp: resetotp})
        .then(data => {
          console.log(data.data);
          showNotification({
            msg: 'Passowrd changed successfully! Proceed to login.',
          });
          setPos(1);
        })
        .catch(err => {
          console.log('err', err?.response?.data);
          showNotification({error: true, msg: err?.response?.data?.error});
        })
        .finally(() => {
          setLoad(false);
        });
    } else {
      showNotification({
        msg: 'Please input a password for your new account',
        error: true,
      });
    }
  };
  return (
    <>
      <LayoutAnimationComponent delay={800} leftInOut>
        <BigText style={{marginBottom: 10}}>Enter new password</BigText>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={900} exitDelay={300} leftInOut>
        <Input
          placeholder={'Password'}
          password
          text={password}
          setText={setPassword}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={1100} exitDelay={500} leftInOut>
        <Input
          placeholder={'Retype Password'}
          password
          text={repassword}
          setText={setRepassword}
        />
      </LayoutAnimationComponent>

      <Button title="Next" load={load} onPress={action} />
    </>
  );
};

const CompleteProfile: React.FC<ComponentsProps> = ({
  navigation,
  name = '',
  setName = () => {},
  username = '',
  setUsername = () => {},
  token,
}) => {
  const [load, setLoad] = useState(false);
  const [cart, setCart] = useMMKVObject('cart');
  const [favourites, setFavourites] = useMMKVObject('favourites');

  const action = () => {
    if (!name) {
      showNotification({msg: 'Name field is missing', error: true});
      return;
    }
    if (!username) {
      showNotification({msg: 'Username field is missing', error: true});
      return;
    }
    Keyboard.dismiss();
    setLoad(true);
    createUser({username, name, token})
      .then(data => {
        console.log(data.data);
        setItem('token', data.data?.token);
        setItem('userdetails', data.data?.user, true);
        setCart(data.data?.user?.cart);
        setFavourites(data.data?.user?.favourites);
        if (getItem('affilateRefer')) {
          navigation?.navigate('LoadProduct', getItem('affilateRefer', true));
        } else {
          navigation?.reset({
            index: 0,
            routes: [{name: 'AniStackNav'}],
          });
        }
      })
      .catch(err => {
        console.log('err', err);
        console.log('err', err?.response?.data);
        showNotification({error: true, msg: err?.response?.data?.error});
      })
      .finally(() => {
        setLoad(false);
      });
  };
  return (
    <>
      <LayoutAnimationComponent delay={1000} leftInOut>
        <BigText style={{marginBottom: 10}}>Complete your profile</BigText>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={1300} leftInOut>
        <Input placeholder={'Full Name'} text={name} setText={setName} />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={1500} leftInOut>
        <Input placeholder={'Username'} text={username} setText={setUsername} />
      </LayoutAnimationComponent>

      <Button load={load} title="Finish" onPress={action} />
    </>
  );
};

interface ScreenProps {
  navigation: NavigationProp<any>;
}
const OnboardingScreen: React.FC<ScreenProps> = ({navigation}) => {
  const [pos, setPos] = useState(0);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repassword, setRepassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [resetotp, setResetOtp] = useState('');

  useEffect(() => {
    if (!getItem('dateFirstOpened')) {
      setItem('dateFirstOpened', Date.now(), true);
    }
  }, []);
  useEffect(() => {
    const backAction = () => {
      if (pos > 0) {
        if (pos === 1) {
          setPos(0);
        }
        if (pos === 2) {
          setPos(1);
        }
        if (pos === 4) {
          setPos(2);
        }
        if (pos === 3) {
          setPos(2);
        }
        if (pos === 5) {
          setPos(1);
        }
        if (pos === 7) {
          setPos(1);
        }
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [pos]);

  return (
    <Mainbackground top={-1} avoid keyboard>
      <Image source={bg} resizeMode="cover" style={styles.bgImg} />
      <View style={styles.dimBg} />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 30,
          paddingHorizontal: 20,
        }}>
        {pos === 0 && <Welcome {...{setPos, navigation}} />}
        {pos === 1 && <CollectEmail {...{setPos, email, setEmail, setToken}} />}
        {pos === 2 && (
          <CreatePassword
            {...{
              setPos,
              password,
              setPassword,
              repassword,
              setRepassword,
              email,
              setToken,
            }}
          />
        )}
        {pos === 3 && (
          <CompleteProfile
            {...{
              navigation,
              name,
              setName,
              username,
              setUsername,
              token,
            }}
          />
        )}
        {pos === 4 && <VerifyEmail {...{setPos, token, email}} />}
        {pos === 5 && (
          <CollectPassword
            {...{email, setPos, setPassword, password, navigation, setToken}}
          />
        )}
        {pos === 6 && (
          <VerifyEmailReset {...{setPos, email, resetotp, setResetOtp}} />
        )}
        {pos === 7 && (
          <CreateResetPassword
            {...{
              setPos,
              password,
              setPassword,
              repassword,
              setRepassword,
              email,
              setToken,
              resetotp,
            }}
          />
        )}
      </View>
    </Mainbackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  bgImg: {
    bottom: 0,
    height: SCREEN_HEIGHT + (StatusBar.currentHeight ?? 0),
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: SCREEN_WIDTH,
  },
  dimBg: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
