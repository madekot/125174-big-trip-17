import dayjs from 'dayjs';
import {generateOffers} from '../mock/trip-mock';
import {ID_DEFAULT_LIST} from '../const';

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
  getDateFrom,
  getDateTo,
  getOffersEqualCurrentType,
  humanizeTripDateFrom,
};
