import dayjs from 'dayjs';

import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
} from '../const';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {
  getDays,
  getDifferenceMilliseconds,
  getHours,
  getRandomBoolean,
  getRandomInteger,
  getRandomValueArray,
  getTextFinalSay,
  isDoubleDigits,
  makeCounter,
  transformFirstLetterWordUppercase,
  updateItem,
};
