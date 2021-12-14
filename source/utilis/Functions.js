import {
  StatusBar,
  Platform,
  PixelRatio,
  DeviceEventEmitter,
} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/Variables';
import countryData from './output.json';
import citiesData from './lgas.json';
import {getItem} from './storage';

const scale = SCREEN_WIDTH / 390;

export const restrictViewer = ({navigation, alt}) => {
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
export const getDeliveryFee = ({lga, state}) => {
  if (state !== 'Lagos') {
    return 3000;
  } else if (
    lga === 'Lagos Island' ||
    lga === 'Ikorodu' ||
    lga === 'Ibeju-Lekki' ||
    lga === 'Epe'
  ) {
    return 3000;
  } else {
    return 2500;
  }
};

export const getState = ({country}) => {
  if (!country) return [];
  const data = countryData.find(
    data => data.name.toLowerCase() === country.toLowerCase(),
  );
  return data.states.map(d => {
    return d;
  });
};

export const getCity = ({country, state}) => {
  if (!country || !state) return [];
  const item = citiesData.find(
    data => data.state?.toLowerCase() === state?.toLowerCase(),
  );
  return item.lgas;
};

export const formatDate = date => {
  const givenDate = new Date(date);
  const currentDate = new Date();

  const diffInMilliseconds = currentDate - givenDate;
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

export function generateRandomString(length) {
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function formatProfit(number) {
  if (number < 0) {
    return '- $' + parseFloat(Math.abs(number)).toFixed(2);
  } else {
    return '$' + number;
  }
}

// Examples:
//console.log(formatProfit(100)); // Output: $100
//console.log(formatProfit(-50)); // Output: -$50
//console.log(formatProfit(0)); // Output: $0
//console.log(formatProfit(-123.45)); // Output: -$123.45

export function formatAmount(number) {
  let formatted_num = Math.abs(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (parseFloat(number) > 0) {
    return `₦ ${formatted_num}`;
  } else {
    return `- ₦ ${formatted_num}`;
  }
}

export function formatNumberWithCommas(number) {
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

export function normalizeFontSize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const getPercentHeight = percent => {
  return (percent / 100) * SCREEN_HEIGHT;
};
export const getPercentWidth = percent => {
  return (percent / 100) * SCREEN_WIDTH;
};

export const validateEmail = email => {
  if (!email) return false;
  return email.match(/\S+@\S+\.\S+/);
};

export const hideFirstLetter = text => {
  if (text.length <= 4) {
    return '****';
  }
  const lastFour = text.slice(-4);
  const asterisks = '*'.repeat(text.length - 4);
  return asterisks + lastFour;
};

export function capitalizeAllFirstLetters(string) {
  if (!string) {
    return '';
  }
  return string
    .split(' ')
    .map(text => capitalizeFirstLetter(text))
    .join(' ');
}

export function capitalizeFirstLetter(string) {
  if (!string) return '';

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const pad = text => {
  if (text.toString().length > 1) {
    return text;
  } else {
    return '0' + text;
  }
};

export function checkPasswordStrength(password) {
  // Scoring system.
  const score = {
    lowerCase: 1,
    upperCase: 5,
    numbers: 4,
    symbols: 5,
    length: 2,
  };

  // Initialize a score counter.
  let scoreCount = 0;

  // Check for lowercase letters.
  if (password.match(/[a-z]/)) {
    scoreCount += score.lowerCase;
  }

  // Check for uppercase letters.
  if (password.match(/[A-Z]/)) {
    scoreCount += score.upperCase;
  }

  // Check for numbers.
  if (password.match(/\d+/)) {
    scoreCount += score.numbers;
  }

  // Check for symbols.
  if (password.match(/[^a-zA-Z\d]/)) {
    scoreCount += score.symbols;
  }

  // Check for length.
  if (password.length >= 8) {
    scoreCount += score.length;
  }

  // Calculate the score as a percentage.
  const scorePercentage = (scoreCount / 15) * 100;

  // Return the score as a number from 0 - 1.
  return scorePercentage / 100;
}

export const showNotification = ({msg, error}) => {
  DeviceEventEmitter.emit('openNotification', {
    error,
    msg,
  });
};

export function addItemIfNotExists(array, newItem) {
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

export function insertDateItems(arrayQ) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  let currDate;
  let arr = [];
  for (let i = 0; i < arrayQ.length; i++) {
    const {createdAt} = arrayQ[i];
    const createdAtDate = new Date(createdAt);
    console.log(
      'currDate',
      currDate,
      'createdAtDate',
      createdAtDate.toDateString(),
      currDate !== createdAtDate,
    );
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
