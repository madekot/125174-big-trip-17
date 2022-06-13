import dayjs from 'dayjs';

import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
} from '../const';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValueArray = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const makeCounter = (options = {}) => {
  let start = options.start || 0;
  return () => ++start;
};

const transformFirstLetterWordUppercase = (str) => (
  str[0].toUpperCase() + str.slice(1)
);

const getTextFinalSay = (str) => str.split(' ').pop();

const getRandomBoolean = () => Math.random() < 0.5;

const getRandomDayStart = (time = dayjs()) => (
  getRandomBoolean()
    ? time.subtract(getRandomBoolean(), 'day')
    : time.add(getRandomBoolean(), 'day')
);

const getHours = (time) => Math.trunc(
  time
  / MILLISECONDS_IN_SECOND
  / SECONDS_IN_MINUTE
  / MINUTES_IN_HOUR
) % HOURS_IN_DAY;

const getDays = (time) => Math.floor(
  Math.trunc(
    time
    / MILLISECONDS_IN_SECOND
    / SECONDS_IN_MINUTE
    / MINUTES_IN_HOUR
  )
    / HOURS_IN_DAY
);

const isDoubleDigits = (value) => value.toString().length === 2;

const getDifferenceMilliseconds = ({timeStart, timeEnd}) => (
  dayjs(timeEnd).diff(dayjs(timeStart))
);

const convertHumanizeToIsoDate = (date) => dayjs(date, 'DD/MM/YY HH:mm').toISOString();

const deleteObjectProperty = (deleteObj, ...propertyArr) => {
  for(const property of propertyArr) {
    delete deleteObj[property];
  }
};

export {
  convertHumanizeToIsoDate,
  deleteObjectProperty,
  getDays,
  getDifferenceMilliseconds,
  getHours,
  getRandomBoolean,
  getRandomDayStart,
  getRandomInteger,
  getRandomValueArray,
  getTextFinalSay,
  isDoubleDigits,
  makeCounter,
  transformFirstLetterWordUppercase,
};
