import {generatePointLocal, generateOffers} from '../mock/trip-mock';
import {MOCK_QUANTITY} from '../const';

export default class TripsModel {
  #trips = Array.from({length: MOCK_QUANTITY}, generatePointLocal);
  #offers = generateOffers();

  get trips() {
    return this.#trips;
  }

  get offers() {
    return this.#offers;
  }
}
