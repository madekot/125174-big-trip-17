import {FilterType} from '../const';
import dayjs from 'dayjs';

const isStartDateGreaterCurrentDate = (trip) => (
  !(dayjs().isAfter(dayjs(trip.dateFrom)))
);

const isStartDateSameCurrentDate = (trip) => (
  dayjs().isSame(dayjs(trip.dateFrom))
);

const isBeforeStartDate = (trip) => (
  !dayjs().isBefore(dayjs(trip.dateFrom))
);

const isBeforeFinishDate = (trip) => (
  !dayjs().isAfter(dayjs(trip.dateTo))
);

const isFinishDateGreaterCurrentDate = (trip) => (
  dayjs().isAfter(dayjs(trip.dateTo))
);

const isProcessTrip = (trip) => (
  isBeforeStartDate(trip) && isBeforeFinishDate(trip)
);

const getFutureTrips = (trips) => (
  trips.filter((trip) => (
    isStartDateGreaterCurrentDate(trip)
    && !isStartDateSameCurrentDate(trip)
    || isProcessTrip(trip))
  )
);

const getPastTrips = (trips) => (
  trips.filter((trip) => (
    isFinishDateGreaterCurrentDate(trip))
    || isProcessTrip(trip)
  )
);

const filter = {
  [FilterType.EVERYTHING]: (trips) => trips,
  [FilterType.FUTURE]: getFutureTrips,
  [FilterType.PAST]: getPastTrips,
};

export {filter};
