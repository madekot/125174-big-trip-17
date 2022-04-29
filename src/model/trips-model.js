import {generatePointLocal} from '../mock/trip';

export default class TripsModel {
  trips = Array.from({length: 3}, generatePointLocal);

  getTrips = () => this.trips;
}
