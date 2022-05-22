import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

import {
  getRandomBoolean,
  getRandomDayStart,
  getRandomInteger,
  getRandomValueArray,
  makeCounter,
} from '../utils/common';

import {
  BASE_PRICE_MAX,
  BASE_PRICE_MIN,
  CITY_DESCRIPTIONS,
  CITY_NAMES,
  CITY_PICTURES,
  DURATION_MAX_MINUTES_TRIP,
  DURATION_MIN_MINUTES_TRIP,
  ID_DEFAULT_LIST,
  OFFERS_QUANTITY,
  OFFER_PRICES,
  TYPES,
} from '../const';

const generateDestination = (index) => (
  ({
    description: CITY_DESCRIPTIONS[index],
    name: CITY_NAMES[index],
    pictures: Array(3).fill(CITY_PICTURES[index]),
  })
);

const generateOfferItem = ({index}) => {
  const getId = makeCounter();

  const getOfferElement = (typeName , i) => (
    {
      id: getId(),
      price: getRandomValueArray(OFFER_PRICES),
      title: `offer-${typeName}-№${i + 1}`,
    }
  );

  const type = TYPES[index];
  const offerItem = Array(OFFERS_QUANTITY).fill(' ').map(
    (el, i) => getOfferElement(type, i));

  const offers = offerItem;

  return ({
    offers,
    type,
  });
};

const generateOffers = () => (
  Array(TYPES.length)
    .fill('')
    .map((el, index) => (
      generateOfferItem({ index })
    ))
);

const generatePointLocal = () => {
  const basePrice = getRandomInteger(BASE_PRICE_MIN, BASE_PRICE_MAX);
  const destination = generateDestination(getRandomInteger(0, CITY_NAMES.length - 1));
  const isFavorite = getRandomBoolean();
  const type = getRandomValueArray(TYPES);
  const offers = ID_DEFAULT_LIST;
  const id = nanoid();
  const dateFrom = getRandomDayStart().toISOString();
  const dateTo = dayjs().add(
    getRandomInteger(DURATION_MIN_MINUTES_TRIP, DURATION_MAX_MINUTES_TRIP),
    'minute'
  ).toISOString();

  return ({
    basePrice,
    dateFrom,
    dateTo,
    destination,
    id,
    isFavorite,
    offers,
    type,
  });
};

const generateAuthorizationError = () => (
  {
    error: 401,
    message: 'Header Authorization is not correct'
  }
);

const generateNotFoundError = () => (
  {
    error: 404,
    message: 'Not found'
  }
);

export {
  generateAuthorizationError,
  generateDestination,
  generateNotFoundError,
  generateOffers,
  generatePointLocal,
};
