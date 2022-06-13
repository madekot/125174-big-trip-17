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
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const Timestamp = {
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

const SORTING_DEFAULT_LIST = [
  { name: 'day'   , disabled: false , sortType: 'day'   },
  { name: 'event' , disabled: true  , sortType: 'event' },
  { name: 'time'  , disabled: false , sortType: 'time'  },
  { name: 'price' , disabled: false , sortType: 'price' },
  { name: 'offer' , disabled: true  , sortType: 'offer' },
];

export {
  FilterType,
  HOURS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  MINUTES_IN_HOUR,
  Mode,
  SECONDS_IN_MINUTE,
  SORTING_DEFAULT_LIST,
  SortType,
  Timestamp,
  UpdateType,
  UserAction,
};
