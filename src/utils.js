import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const makeCounter = (options = {}) => {
  let start = options.start || 0;
  return () => ++start;
};

const humanizeTripDateFrom = (dueDate) => dayjs(dueDate).format('DD/MM/YY HH:mm');

const getDateFrom = (time, options = {}) => {
  const type = options.type;
  let result;

  if (type === 'monthDay') {
    result = time ? dayjs(time).format('MMM DD') : 'MAR 18';
  } else if (type === 'hoursMinutes') {
    result = time ? dayjs(time).format('HH:mm') : '16:20';
  } else {
    result = time ? dayjs(time).format('DD/MM/YY HH:mm') : '00/00/00 00:00';
  }

  return result;
};

const getDateTo = (time) => (
  time
    ? humanizeTripDateFrom(time)
    : '00/00/00 00:00'
);

const getDateDifference = (options = {}) => {
  const first = options.first || '2019-07-11T11:22:13.375Z';
  const second = options.second || '2019-07-11T11:22:13.375Z';

  return dayjs((dayjs(first) - dayjs(second))).format('HH:mm');
};

const transformFirstLetterWordUppercase = (str) => (str[0].toUpperCase() + str.slice(1));

const getTextFinalSay = (str) => str.split(' ').pop();

const getRandomBoolean = () => Math.random() < 0.5;

export {
  getDateDifference,
  getDateFrom,
  getDateTo,
  getRandomBoolean,
  getRandomInteger,
  getRandomValue,
  getTextFinalSay,
  humanizeTripDateFrom,
  makeCounter,
  transformFirstLetterWordUppercase,
};
