const MOCK_QUANTITY = 6;
const OFFERS_QUANTITY = 2;
const BASE_PRICE_MAX = 9999;
const BASE_PRICE_MIN = 100;

const FILTER_NAMES = [
  'everything',
  'future',
  'past',
];

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const OFFER_TITLES_MOCK = [
  'Upgrade to a business class',
  'Choose the radio station',
  'Divan'
];

const CITY_DESCRIPTIONS_MOCK = [
  'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Aliquam id orci ut lectus varius viverra.'
];

const CITY_NAMES_MOCK = [
  'Chamonix',
  'Abidjan',
  'Dakar'
];

const OFFER_PRICES_MOCK = [
  60,
  120,
  180
];

const OFFERS_DEFAULT = [
  { price: 50, title: 'Add luggage'       },
  { price: 80, title: 'Switch to comfort' },
  { price: 15, title: 'Add meal'          },
  { price: 5 , title: 'Choose seats'      },
  { price: 40, title: 'Travel by train'   },
];

const SORTING_DEFAULT_LIST = [
  { name: 'day'  , disabled: false, checked: false },
  { name: 'event', disabled: true , checked: false },
  { name: 'time' , disabled: false, checked: false },
  { name: 'price', disabled: true , checked: true  },
  { name: 'offer', disabled: true , checked: false },
];

const CITY_PICTURES_MOCK = [
  { src: 'http://picsum.photos/300/200?r=0.0762563005163317', description: 'Chamonix parliament building', },
];

export {
  BASE_PRICE_MAX,
  BASE_PRICE_MIN,
  CITY_DESCRIPTIONS_MOCK,
  CITY_NAMES_MOCK,
  CITY_PICTURES_MOCK,
  FILTER_NAMES,
  MOCK_QUANTITY,
  OFFERS_DEFAULT,
  OFFERS_QUANTITY,
  OFFER_PRICES_MOCK,
  OFFER_TITLES_MOCK,
  SORTING_DEFAULT_LIST,
  TYPES,
};
