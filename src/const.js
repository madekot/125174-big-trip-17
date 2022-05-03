const MOCK_QUANTITY = 3;
const OFFERS_QUANTITY = 7;
const BASE_PRICE_MAX = 9999;
const BASE_PRICE_MIN = 100;

const FILTER_DEFAULT = [
  {name: 'everything', checked: true ,},
  {name: 'future'    , checked: false,},
  {name: 'past'      , checked: false,},
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

const OFFER_TITLES = [
  'Upgrade to a business class',
  'Choose the radio station',
  'Divan'
];

const CITY_DESCRIPTIONS = [
  'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Aliquam id orci ut lectus varius viverra.'
];

const CITY_NAMES = [
  'Chamonix',
  'Abidjan',
  'Dakar'
];

const OFFER_PRICES = [
  60,
  120,
  180
];

const ID_DEFAULT_LIST = [
  1,
  3
];

const OFFERS_DEFAULT = [
  { price: 50, title: 'Add luggage'       },
  { price: 80, title: 'Switch to comfort' },
  { price: 15, title: 'Add meal'          },
  { price: 5 , title: 'Choose seats'      },
  { price: 40, title: 'Travel by train'   },
];

const SORTING_DEFAULT_LIST = [
  { name: 'day'   , disabled: false , checked: false },
  { name: 'event' , disabled: true  , checked: false },
  { name: 'time'  , disabled: false , checked: false },
  { name: 'price' , disabled: false , checked: true  },
  { name: 'offer' , disabled: true  , checked: false },
];

const CITY_PICTURES = [
  {
    description: 'Chamonix parliament building',
    src: 'http://picsum.photos/300/200?r=0.0762563005163317',
  },
];

export {
  BASE_PRICE_MAX,
  BASE_PRICE_MIN,
  CITY_DESCRIPTIONS,
  CITY_NAMES,
  CITY_PICTURES,
  FILTER_DEFAULT,
  ID_DEFAULT_LIST,
  MOCK_QUANTITY,
  OFFERS_DEFAULT,
  OFFERS_QUANTITY,
  OFFER_PRICES,
  OFFER_TITLES,
  SORTING_DEFAULT_LIST,
  TYPES,
};
