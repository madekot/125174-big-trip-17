import dayjs from 'dayjs';
import {Timestamp} from '../const';
import {getDays, getDifferenceMilliseconds, getHours, isDoubleDigits} from '../utils/common';

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
      return isDoubleDigits(days)
        ? `${days}D`
        : `0${days}D`;

    case 'hoursAndSymbol':
      return isDoubleDigits(hours)
        ? `${hours}H`
        : `0${hours}H`;

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
  if (getDifferenceMilliseconds({timeStart, timeEnd}) < Timestamp.HOUR) {
    return 'minuteAndSymbol';
  }

  if (getDifferenceMilliseconds({timeStart, timeEnd}) < Timestamp.DAY) {
    return 'hoursMinuteAndSymbol';
  }

  return 'dayHoursMinuteAndSymbol';
};

const getDateDifference = (options = {}) => {
  const timeStart = options.timeStart;
  const timeEnd = options.timeEnd;

  if (timeStart === timeEnd) {
    return '00M';
  }

  const type = getTypeHumanizeDate({timeStart, timeEnd});
  return humanizeDate(getDifferenceMilliseconds({timeStart, timeEnd}), {type});
};

const getOffersEqualCurrentType = ({type, offers}) => {
  for (const offerItem of offers) {
    if (offerItem.type === type) {
      return {...offerItem};
    }
  }
};

const convertIdToOffers = ({offersList, idList}) => {
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

const sortTripDay = (tripA, tripB) => (
  getDifferenceMilliseconds(
    {timeStart: tripA.dateFrom, timeEnd: tripB.dateFrom}
  )
);

const sortTripPrice = (tripA, tripB) => (
  tripB.basePrice - tripA.basePrice
);

const sortTripTime = (tripA, tripB) => {
  const aTripDuration = getDifferenceMilliseconds(
    {timeStart: tripA.dateFrom, timeEnd: tripA.dateTo}
  );
  const bTripDuration = getDifferenceMilliseconds(
    {timeStart: tripB.dateFrom, timeEnd: tripB.dateTo}
  );
  return bTripDuration - aTripDuration;
};


export {
  convertIdToOffers,
  getDateDifference,
  getOffersEqualCurrentType,
  humanizeDate,
  sortTripDay,
  sortTripPrice,
  sortTripTime,
};
