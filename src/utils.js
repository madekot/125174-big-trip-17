import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const makeQounter = (options = {}) => {
  let start = options.start || 0;
  return () => ++start;
};

const humanizeTripDateFrom = (dueDate) => dayjs(dueDate).format('DD/MM/YY HH:mm');

const getDateFrom = (time) => (
  time
    ? humanizeTripDateFrom(time)
    : '00/00/00 00:00'
);

const getDateTo = (time) => (
  time
    ? humanizeTripDateFrom(time)
    : '00/00/00 00:00'
);

export {
  getRandomInteger,
  getRandomValue,
  makeQounter,
  humanizeTripDateFrom,
  getDateFrom,
  getDateTo,
};
