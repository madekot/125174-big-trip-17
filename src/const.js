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

const UserAction = {
  UPDATE_TRIP: 'UPDATE_TRIP',
  ADD_TRIP: 'ADD_TRIP',
  DELETE_TRIP: 'DELETE_TRIP',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

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

const CITY_DESCRIPTIONS = [
  'Chamonix, descriptions',
  'Abidjan, descriptions',
  'Dakar, descriptions',
  'Chamonix-2, descriptions',
  'Abidjan-2, descriptions',
  'Dakar-2, descriptions',
];

const CITY_NAMES = [
  'Chamonix',
  'Abidjan',
  'Dakar',
  'Chamonix-2',
  'Abidjan-2',
  'Dakar-2',
];

const CITY_PICTURES = [
  {
    description: 'Chamonix description alt',
    src: 'http://picsum.photos/300/200?r=0.0762563005163317',
  },
  {
    description: 'Abidjan description alt',
    src: 'http://picsum.photos/300/200?r=0.0762563005163317',
  },
  {
    description: 'Dakar description alt',
    src: 'http://picsum.photos/300/200?r=0.0762563005163317',
  },
  {
    description: 'Chamonix-2 description alt',
    src: 'http://picsum.photos/300/200?r=0.0762563005163317',
  },
  {
    description: 'Abidjan-2 description alt',
    src: 'http://picsum.photos/300/200?r=0.0762563005163317',
  },
  {
    description: 'Dakar-2 description alt',
    src: 'http://picsum.photos/300/200?r=0.0762563005163317',
  },
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
  { name: 'day'   , disabled: false , sortType: 'day'   },
  { name: 'event' , disabled: true  , sortType: 'event' },
  { name: 'time'  , disabled: false , sortType: 'time'  },
  { name: 'price' , disabled: false , sortType: 'price' },
  { name: 'offer' , disabled: true  , sortType: 'offer' },
];

export {
  BASE_PRICE_MAX,
  BASE_PRICE_MIN,
  CITY_DESCRIPTIONS,
  CITY_NAMES,
  CITY_PICTURES,
  DURATION_MAX_MINUTES_TRIP,
  DURATION_MIN_MINUTES_TRIP,
  FilterType,
  HOURS_IN_DAY,
  ID_DEFAULT_LIST,
  MILLISECONDS_IN_SECOND,
  MINUTES_IN_HOUR,
  MOCK_QUANTITY,
  Mode,
  OFFERS_DEFAULT,
  OFFERS_QUANTITY,
  OFFER_PRICES,
  SECONDS_IN_MINUTE,
  SORTING_DEFAULT_LIST,
  SortType,
  TYPES,
  UpdateType,
  UserAction,
  timestamp,
};
