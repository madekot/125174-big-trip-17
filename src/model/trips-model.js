import {generatePointLocal} from '../mock/trip-mock';
import {MOCK_QUANTITY} from '../const';

export default class TripsModel {
  trips = Array.from({length: MOCK_QUANTITY}, generatePointLocal);

  getTrips = () => this.trips;
}
