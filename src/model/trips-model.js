import {generatePointLocal} from '../mock/trip-mock';

export default class TripsModel {
  trips = Array.from({length: 4}, generatePointLocal);

  getTrips = () => this.trips;
}
