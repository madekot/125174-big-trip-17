import {
  getRandomBoolean,
  getRandomInteger,
  getRandomValue,
  makeCounter,
} from '../utils.js';

import {
  CITY_DESCRIPTIONS_MOCK,
  CITY_NAMES_MOCK,
  CITY_PICTURES_MOCK,
  OFFERS_QUANTITY,
  OFFER_PRICES_MOCK,
  OFFER_TITLES_MOCK,
  BASE_PRICE_MAX,
  BASE_PRICE_MIN,
  TYPES,
} from '../const';

const getType = () => getRandomValue(TYPES);

const generateDestination = () => (
  {
    description: getRandomValue(CITY_DESCRIPTIONS_MOCK),
    name: getRandomValue(CITY_NAMES_MOCK),
    pictures: getRandomValue(CITY_PICTURES_MOCK),
  }
);

const generateOffer = () => {
  const getIdCounter = makeCounter();

  const getOffer = () => (
    {
      id: getIdCounter(),
      price: getRandomValue(OFFER_PRICES_MOCK),
      title: getRandomValue(OFFER_TITLES_MOCK),
    }
  );

  const getOffers = (countOffers) => Array.from({length: countOffers}, getOffer);

  return ({
    type: getType(),
    offers: getOffers(OFFERS_QUANTITY),
  });
};

// const generatePoint = () => {
//   const destination = generateDestination();
//   const offers = generateOffer();
//   const type = getType();

//   const getIdPoint = makeCounter();
//   const id = getIdPoint().toString();

//   return ({
//     basePrice: 1100,
//     dateFrom: '2019-07-10T22:55:56.845Z',
//     dateTo: '2019-07-11T11:22:13.375Z',
//     destination,
//     id,
//     isFavorite: false,
//     offers,
//     type
//   });
// };

const generatePointLocal = () => {
  const basePrice = getRandomInteger(BASE_PRICE_MIN, BASE_PRICE_MAX);
  const destination = generateDestination();
  const offers = generateOffer();
  const type = getType();
  const isFavorite = getRandomBoolean();

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

// const errorAuthorization = () => (
//   {
//     error: 401,
//     message: 'Header Authorization is not correct'
//   }
// );

// const errorNotFound = () => (
//   {
//     error: 404,
//     message: 'Not found'
//   }
// );

export {
  generatePointLocal,
};
