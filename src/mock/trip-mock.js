import {
  getRandomBoolean,
  getRandomInteger,
  getRandomValueArray,
  makeCounter,
} from '../utils.js';

import {
  BASE_PRICE_MAX,
  BASE_PRICE_MIN,
  CITY_DESCRIPTIONS,
  CITY_NAMES,
  CITY_PICTURES,
  ID_DEFAULT_LIST,
  OFFERS_QUANTITY,
  OFFER_PRICES,
  OFFER_TITLES,
  TYPES,
} from '../const';

const generateDestination = () => (
  {
    description: getRandomBoolean()
      ? getRandomValueArray(CITY_DESCRIPTIONS)
      : '',
    name: getRandomValueArray(CITY_NAMES),
    pictures: getRandomBoolean()
      ? Array(3).fill(getRandomValueArray(CITY_PICTURES))
      : '',
  }
);

const generateOfferItem = ({index}) => {
  const getId = makeCounter();

  const getOfferElement = () => (
    {
      id: getId(),
      price: getRandomValueArray(OFFER_PRICES),
      title: getRandomValueArray(OFFER_TITLES),
    }
  );

  const offerItem = Array.from({length: OFFERS_QUANTITY}, getOfferElement);
  const offers = offerItem;
  const type = TYPES[index];

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

const generatePoint = () => {
  const destination = generateDestination();
  const getIdCounter = makeCounter();
  const offers = Array.from({length: OFFERS_QUANTITY}, () => getIdCounter());
  const type = getRandomValueArray(TYPES);
  const isFavorite = getRandomBoolean();
  const getIdPoint = makeCounter();
  const id = getIdPoint();

  return ({
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination,
    id,
    isFavorite,
    offers,
    type
  });
};

const generatePointLocal = () => {
  const basePrice = getRandomInteger(BASE_PRICE_MIN, BASE_PRICE_MAX);
  const destination = generateDestination();
  const isFavorite = getRandomBoolean();
  const type = getRandomValueArray(TYPES);
  const offers = ID_DEFAULT_LIST;

  return ({
    basePrice,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination,
    isFavorite,
    offers,
    type
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
  generatePoint,
  generatePointLocal,
};
