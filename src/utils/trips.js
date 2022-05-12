import dayjs from 'dayjs';
import { generateOffers } from '../mock/trip-mock';
import { ID_DEFAULT_LIST, timestamp, } from '../const';
import {
  getDays,
  getDifferenceMilliseconds,
  getHours,
  isTwoNumber,
} from '../utils/common';

const humanizeDate = (time, options = {}) => {
  const type = options.type;
  const days = getDays(time);
  const hours = getHours(time);

  switch(type) {
    case 'nameMonthNumberedDay':
      return (
        time
          ? dayjs(time).format('MMM DD')
          : 'MAR 18'
      );

    case 'hoursMinute':
      return (
        time
          ? dayjs(time).format('HH:mm')
          : '16:20'
      );

    case 'minuteAndSymbol':
      return (
        time
          ? `${dayjs(time).format('mm')}M`
          : '30M'
      );

    case 'dayAndSymbol':
      return isTwoNumber(days)
        ? `${days}D` // '22D'
        : `0${days}D`; // '01D'

    case 'hoursAndSymbol':
      return isTwoNumber(hours)
        ? `${hours}H` // '22H'
        : `0${hours}H`; // '01H'

    case 'hoursMinuteAndSymbol':
      return (
        time
          ? (`
            ${humanizeDate(time, {type: 'hoursAndSymbol'})}
            ${humanizeDate(time, {type: 'minuteAndSymbol'})}
          `)
          : '02H 44M'
      );

    case 'dayHoursMinuteAndSymbol':
      return (
        time
          ? (`
            ${humanizeDate(time, {type: 'dayAndSymbol'})}
            ${humanizeDate(time, {type: 'hoursAndSymbol'})}
            ${humanizeDate(time, {type: 'minuteAndSymbol'})}
          `)
          : '01D 02H 30M'
      );

    default:
      return (
        time
          ? dayjs(time).format('DD/MM/YY HH:mm')
          : '00/00/00 00:00'
      );
  }
};

const getTypeHumanizeDate = ({timeStart, timeEnd}) => {
  if (getDifferenceMilliseconds({timeStart, timeEnd}) < timestamp.HOUR) {
    return 'minuteAndSymbol';
  }

  if (getDifferenceMilliseconds({timeStart, timeEnd}) < timestamp.DAY) {
    return 'hoursMinuteAndSymbol';
  }

  return 'dayHoursMinuteAndSymbol';
};

const getDateDifference = (options = {}) => {
  const timeStart = options.timeStart;
  const timeEnd = options.timeEnd;

  const type = getTypeHumanizeDate({timeStart, timeEnd});
  return humanizeDate(getDifferenceMilliseconds({timeStart, timeEnd}), {type});
};

const getOffersEqualCurrentType = ({type, offers}) => {
  if (!offers.length) {
    offers = generateOffers();
  }

  for (const offerItem of offers) {
    if (offerItem.type === type) {
      return {...offerItem};
    }
  }
};

const convertIdToOffers = ({offersList, idList}) => {
  if (!idList) {
    idList = ID_DEFAULT_LIST;
  }

  const arrC = [];

  offersList.forEach((item) => {
    idList.forEach((el) => {
      if (item.id === el) {
        arrC.push({...item});
      }
    });
  });

  return arrC;
};

export {
  convertIdToOffers,
  getDateDifference,
  getOffersEqualCurrentType,
  humanizeDate,
};
