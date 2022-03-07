import {PixelRatio, DeviceEventEmitter} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/Variables';
import countryData from './output.json';
import citiesData from './lgas.json';
import {getItem, setItem} from './storage';
import InAppReview from 'react-native-in-app-review';

const scale = SCREEN_WIDTH / 390;

export const restrictViewer = ({
  navigation,
  alt,
}: {
  navigation: any;
  alt: () => void;
}) => {
  if (!getItem('token')) {
    navigation.reset({
      index: 0,
      routes: [{name: 'OnboardingScreen'}],
    });
  } else {
    if (alt) {
      alt();
    }
  }
};
export const getDeliveryFee = ({lga, state}: {lga: string; state: string}) => {
  if (state !== 'Lagos') {
    return 3000;
  } else if (
    lga === 'Lagos Island' ||
    lga === 'Ikorodu' ||
    lga === 'Ibeju-Lekki' ||
    lga === 'Epe'
  ) {
    return 3500;
  } else {
    return 3000;
  }
};

export const getState = ({country}: {country: string}) => {
  if (!country) return [];
  const data = countryData.find(
    data => data.name.toLowerCase() === country.toLowerCase(),
  );
  return data?.states.map(d => {
    return d;
  });
};

export const getCity = ({country, state}: {country: string; state: string}) => {
  if (!country || !state) return [];
  const item = citiesData.find(
    data => data.state?.toLowerCase() === state?.toLowerCase(),
  );
  return item?.lgas;
};

export const formatDate = (date: string) => {
  const givenDate = new Date(date);
  const currentDate = new Date();

  const diffInMilliseconds = currentDate.getTime() - givenDate.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInYears = Math.floor(diffInDays / 365);

  let output;
  if (diffInYears > 0) {
    output = `${givenDate.getUTCFullYear()}/${(givenDate.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}/${givenDate.getUTCDate().toString().padStart(2, '0')}`;
  } else if (diffInWeeks > 0) {
    output = `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  } else if (diffInDays > 0) {
    output = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInHours > 0) {
    output = `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes > 0) {
    output = `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds > 0) {
    output = `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`;
  } else {
    output = 'Just now';
  }

  return output;
};

export function generateRandomString(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function formatProfit(number: number) {
  if (number < 0) {
    return '- $' + Math.abs(number).toFixed(2);
  } else {
    return '$' + number;
  }
}

export function formatAmount(number: number) {
  const formatted_num = Math.abs(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (parseFloat(number.toString()) > 0) {
    return `₦ ${formatted_num}`;
  } else {
    return `- ₦ ${formatted_num}`;
  }
}

export function formatNumberWithCommas(number: number) {
  // Split the number into whole and decimal parts
  const parts = number.toString().split('.');

  // Format the whole number part with commas
  const wholeNumberWithCommas = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // If there is a decimal part, append it back to the whole number with commas
  const result =
    parts.length > 1
      ? wholeNumberWithCommas + '.' + parts[1]
      : wholeNumberWithCommas;

  return result;
}

export function normalizeFontSize(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const getPercentHeight = (percent: number) => {
  return (percent / 100) * SCREEN_HEIGHT;
};
export const getPercentWidth = (percent: number) => {
  return (percent / 100) * SCREEN_WIDTH;
};

export const validateEmail = (email: string) => {
  if (!email) return false;
  return email.match(/\S+@\S+\.\S+/);
};

export const hideFirstLetter = (text: string) => {
  if (text.length <= 4) {
    return '****';
  }
  const lastFour = text.slice(-4);
  const asterisks = '*'.repeat(text.length - 4);
  return asterisks + lastFour;
};

export function capitalizeAllFirstLetters(string: string) {
  if (!string) {
    return '';
  }
  return string
    .split(' ')
    .map(text => capitalizeFirstLetter(text))
    .join(' ');
}

export function capitalizeFirstLetter(string: string) {
  if (!string) return '';

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const pad = (text: string) => {
  if (text.toString().length > 1) {
    return text;
  } else {
    return '0' + text;
  }
};

export const showNotification = ({
  msg,
  error,
}: {
  msg: string;
  error?: boolean;
}) => {
  DeviceEventEmitter.emit('openNotification', {
    error,
    msg,
  });
};

export function addItemIfNotExists(array: any[], newItem: any) {
  // Check if an item with the same properties already exists in the array
  const exists = array.some(
    item =>
      item.address === newItem.address &&
      item.phone === newItem.phone &&
      item.lga === newItem.lga &&
      item.state === newItem.state,
  );

  // If the item does not exist, add it to the array
  if (!exists) {
    array.push(newItem);
  }

  // Return the updated array
  return array;
}

export function insertDateItems(arrayQ: any[]) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  let currDate;
  const arr = [];
  for (let i = 0; i < arrayQ.length; i++) {
    const {createdAt} = arrayQ[i];
    const createdAtDate = new Date(createdAt);
    if (currDate !== createdAtDate.toDateString()) {
      if (createdAtDate.toDateString() === today.toDateString()) {
        arr.push({date: 'Today'});
      } else if (createdAtDate.toDateString() === yesterday.toDateString()) {
        arr.push({date: 'Yesterday'});
      } else {
        const formattedDate = createdAtDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        arr.push({date: formattedDate});
      }
      currDate = createdAtDate.toDateString();
    }
    arr.push(arrayQ[i]);
  }

  return arr;
}

export const showRate = () => {
  const dateFirstOpened = getItem('dateFirstOpened', true);
  if (!dateFirstOpened) {
    setItem('dateFirstOpened', Date.now(), true);
  }
  var date1 = new Date();
  var date2 = new Date();
  var timeDifference = date2.getTime() - date1.getTime();
  var daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  console.log('Days between the two dates:', daysDifference);
  if (getItem('hasShownRequestInAppReview') !== 'true' && daysDifference > 1) {
    InAppReview.RequestInAppReview().then(hasFlowFinishedSuccessfully => {
      console.log('hasFlowFinishedSuccessfully', hasFlowFinishedSuccessfully);
      setItem('hasShownRequestInAppReview', 'true');
    });
  }
};
