import {
  generateDestination,
  generateOffers,
  generatePointLocal,
} from '../mock/trip-mock';

import Observable from '../framework/observable.js';
import {MOCK_QUANTITY} from '../const';
import {deleteObjectProperty} from '../utils/common';

export default class TripsModel extends Observable {
  #tripsApiService = null;
  #destinations = Array(MOCK_QUANTITY).fill('').map(
    (el, index) => generateDestination(index)
  );

  #trips = Array.from({length: MOCK_QUANTITY}, generatePointLocal);
  #offers = generateOffers();

  constructor(tripsApiService) {
    super();
    this.#tripsApiService = tripsApiService;

    this.#tripsApiService.trips.then((trips) => {
      console.log(trips.map(this.#adaptToClient));
    });
  }

  get trips() {
    return this.#trips;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  updateTrip = (updateType, update) => {
    const index = this.#trips.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      update,
      ...this.#trips.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addTrip = (updateType, update) => {
    this.#trips = [
      update,
      ...this.#trips,
    ];

    this._notify(updateType, update);
  };

  deleteTrip = (updateType, update) => {
    const index = this.#trips.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      ...this.#trips.slice(index + 1),
    ];

    this._notify(updateType);
  };

  #adaptToClient = (trip) => {
    const adaptedTask = {...trip,
      basePrice: trip['base_price'],
      dateFrom: trip['date_from'],
      dateTo: trip['date_to'],
      isFavorite: trip['is_favorite'],
    };

    deleteObjectProperty(
      adaptedTask,
      'base_price',
      'date_from',
      'date_to',
      'is_favorite'
    );

    return adaptedTask;
  };
}
