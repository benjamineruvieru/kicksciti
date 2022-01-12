import {Dimensions, NativeModules, PixelRatio, Platform} from 'react-native';

const SCREEN_WIDTH: number = Dimensions.get('window').width;
const SCREEN_HEIGHT: number = Dimensions.get('window').height;
const pixelRatio = PixelRatio.get();
export {SCREEN_WIDTH, SCREEN_HEIGHT};
const {PlatformConstants} = NativeModules;
const deviceType = PlatformConstants.interfaceIdiom;
const isTablet =
  SCREEN_WIDTH / pixelRatio >= 600 || SCREEN_HEIGHT / pixelRatio >= 600;

let isPhoneProxy;
if (Platform.OS === 'android') {
  isPhoneProxy = !isTablet;
} else {
  isPhoneProxy = deviceType === 'phone';
}

export const isPhone = isPhoneProxy;

console.log('deviceType , ', 'the OS', Platform.OS, deviceType, isTablet);
