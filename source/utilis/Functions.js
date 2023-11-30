import {
  StatusBar,
  Platform,
  PixelRatio,
  DeviceEventEmitter,
} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/Variables';
import {LayoutAnimation} from 'react-native';

const scale = SCREEN_WIDTH / 390;

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
export const layoutAnimate = () => {
  LayoutAnimation.configureNext({
    duration: 300,
    update: {type: 'easeInEaseOut', property: 'scaleY'},
    delete: {type: 'easeOut', property: 'scaleY'},
    create: {type: 'easeIn', property: 'scaleY'},
  });
};
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

export function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

export const StatusBarController = (route, isDarkMode) => {
  //console.log(route.name);
  switch (route.name) {
    default: {
      StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(isDarkMode ? '#272727' : 'white');
    }
  }
};

export const showNotification = ({msg, error}) => {
  DeviceEventEmitter.emit('openNotification', {
    error,
    msg,
  });
};
