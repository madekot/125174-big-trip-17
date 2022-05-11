import dayjs from 'dayjs';
import { generateOffers } from '../mock/trip-mock';
import { ID_DEFAULT_LIST, timestamp, } from '../const';

const humanizeDate = (time, options = {}) => {
  const type = options.type;

  if (type === 'nameMonthNumberedDay ') {
    return time ? dayjs(time).format('MMM DD') : 'MAR 18';
  }

  if (type === 'hoursMinute') {
    return time ? dayjs(time).format('HH:mm') : '16:20';
  }

  if (type === 'minuteAndSymbol') {
    return time ? `${dayjs(time).format('mm')}M` : '30M';
  }

  if (type === 'dayAndSymbol') {
    return time ? `${dayjs(time).format('DD')}D` : '1D';
  }

  if (type === 'hoursAndSymbol') {
    console.log(dayjs(time).format('HH'));
    // return time ? `${dayjs(time).subtract(3, 'hour').format('HH')}H` : '02H';
    return time ? `${dayjs(time).format('HH')}H` : '02H';
  }

  if (type === 'hoursMinuteAndSymbol') {
    return (
      time
        ? `${humanizeDate(time, {type: 'hoursAndSymbol'})} ${humanizeDate(time, {type: 'minuteAndSymbol'})} `
        : '02H 44M'
    );
  }

  if (type === 'dayHoursMinuteAndSymbol') {
    return (
      time
        ? `${humanizeDate(time, {type: 'dayAndSymbol'})} ${humanizeDate(time, {type: 'minuteAndSymbol'})} ${humanizeDate(time, {type: 'hoursAndSymbol'})}`
        : '1D 02H 44M'
    );
  }

  return time ? dayjs(time).format('DD/MM/YY HH:mm') : '00/00/00 00:00';
};

const getTypeHumanizeDate = ({timeStart, timeEnd}) => {
  const differenceUnixTimeMilliseconds =  dayjs(timeEnd) - dayjs(timeStart);

  if (differenceUnixTimeMilliseconds < timestamp.HOUR) {
    return 'minuteAndSymbol';
  }

  if (differenceUnixTimeMilliseconds < timestamp.DAY) {
    return 'hoursMinuteAndSymbol';
  }

  return 'dayHoursMinuteAndSymbol';
};

const getDateDifference = (options = {}) => {
  const timeStart = options.timeStart;
  const timeEnd = options.timeEnd;

  const difference = dayjs(timeEnd) - dayjs(timeStart);
  const type = getTypeHumanizeDate({timeStart, timeEnd});
  return humanizeDate(difference, {type});
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
