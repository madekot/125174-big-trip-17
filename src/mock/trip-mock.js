import {
  getRandomInteger,
  getRandomValue,
  makeCounter,
} from '../utils.js';

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const MIN_PRICE = 100;
const MAX_PRICE = 9999;
const COUNT_OFFERS = 2;

const getType = () => getRandomValue(TYPES);

const generateDestination = () => {
  const descriptions = [
    'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Aliquam id orci ut lectus varius viverra.'
  ];
  const names = ['Chamonix', 'Abidjan', 'Dakar'];
  const pictures = [
    {
      src: 'http://picsum.photos/300/200?r=0.0762563005163317',
      description: 'Chamonix parliament building',
    },
  ];

  return ({
    description: getRandomValue(descriptions),
    name: getRandomValue(names),
    pictures: getRandomValue(pictures),
  });
};

const generateOffer = () => {
  const prices = [60, 120, 180];
  const titles = ['Upgrade to a business class', 'Choose the radio station', 'Divan'];

  const getIdQounter = makeCounter();

  const getOffer = () => (
    {
      id: getIdQounter(),
      price: getRandomValue(prices),
      title: getRandomValue(titles),
    }
  );

  const getOffers = (countOffers) => Array.from({length: countOffers}, getOffer);

  return ({
    type: getType(),
    offers: getOffers(COUNT_OFFERS),
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
  const destination = generateDestination();
  const offers = generateOffer();
  const type = getType();

  return ({
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination,
    isFavorite: false,
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
