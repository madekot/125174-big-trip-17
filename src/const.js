const MOCK_QUANTITY = 6;
const OFFERS_QUANTITY = 3;
const BASE_PRICE_MAX = 9999;
const BASE_PRICE_MIN = 100;
const DURATION_MAX_MINUTES_TRIP = 10;
const DURATION_MIN_MINUTES_TRIP = 1000;

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const timestamp = {
  HOUR: 3600000,
  DAY: 86400000,
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  DEFAULT: 'day',
  PRICE: 'price',
  TIME: 'time',
};

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
  { name: 'day'   , disabled: false , checked: true  , sortType: 'day'   },
  { name: 'event' , disabled: true  , checked: false , sortType: 'event' },
  { name: 'time'  , disabled: false , checked: false , sortType: 'time'  },
  { name: 'price' , disabled: false , checked: false , sortType: 'price' },
  { name: 'offer' , disabled: true  , checked: false , sortType: 'offer' },
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
  DURATION_MAX_MINUTES_TRIP,
  FILTER_DEFAULT,
  HOURS_IN_DAY,
  ID_DEFAULT_LIST,
  MILLISECONDS_IN_SECOND,
  MINUTES_IN_HOUR,
  MOCK_QUANTITY,
  Mode,
  OFFERS_DEFAULT,
  OFFERS_QUANTITY,
  OFFER_PRICES,
  OFFER_TITLES,
  SECONDS_IN_MINUTE,
  SORTING_DEFAULT_LIST,
  SortType,
  TYPES,
  timestamp,
  DURATION_MIN_MINUTES_TRIP,
};
