import {
  generateDestination,
  generateOffers,
  generatePointLocal,
} from '../mock/trip-mock';
import {MOCK_QUANTITY} from '../const';

export default class TripsModel {
  #trips = Array.from({length: MOCK_QUANTITY}, generatePointLocal);
  #offers = generateOffers();
  #destinations = Array.from({length: MOCK_QUANTITY}, generateDestination);

  get trips() {
    return this.#trips;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
