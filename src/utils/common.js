import dayjs from 'dayjs';

import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
} from '../const';

const transformFirstLetterWordUppercase = (str) => (
  str[0].toUpperCase() + str.slice(1)
);

const getTextFinalSay = (str) => str.split(' ').pop();

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

const isEscapeKeyCode = (evt) => (
  evt.key === 'Escape' || evt.key === 'Esc'
);

export {
  convertHumanizeToIsoDate,
  deleteObjectProperty,
  getDays,
  getDifferenceMilliseconds,
  getHours,
  getTextFinalSay,
  isDoubleDigits,
  isEscapeKeyCode,
  transformFirstLetterWordUppercase,
};
