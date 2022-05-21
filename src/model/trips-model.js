import {
  generateDestination,
  generateOffers,
  generatePointLocal,
} from '../mock/trip-mock';
import {MOCK_QUANTITY} from '../const';

export default class TripsModel {
  #destinations = Array(MOCK_QUANTITY).fill('').map(
    (el, index) => generateDestination(index)
  );

  #trips = Array.from({length: MOCK_QUANTITY}, generatePointLocal);
  #offers = generateOffers();

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
