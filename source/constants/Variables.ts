import {Dimensions, NativeModules} from 'react-native';

const SCREEN_WIDTH: number = Dimensions.get('window').width;
const SCREEN_HEIGHT: number = Dimensions.get('window').height;

export {SCREEN_WIDTH, SCREEN_HEIGHT};
const {PlatformConstants} = NativeModules;
const deviceType = PlatformConstants.interfaceIdiom;
export const isPhone = deviceType === 'phone';
