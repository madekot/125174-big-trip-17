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

const transformFirstLetterWordUppercase = (str) => (str[0].toUpperCase() + str.slice(1));

const getTextFinalSay = (str) => str.split(' ').pop();

const getRandomBoolean = () => Math.random() < 0.5;

export {
  getRandomBoolean,
  getRandomInteger,
  getRandomValueArray,
  getTextFinalSay,
  makeCounter,
  transformFirstLetterWordUppercase,
};
