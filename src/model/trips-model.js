import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
import {deleteObjectProperty} from '../utils/common';

export default class TripsModel extends Observable {
  #tripsApiService = null;

  #destinations = [];
  #trips = [];
  #offers = [];

  constructor(tripsApiService) {
    super();
    this.#tripsApiService = tripsApiService;
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

  init = async () => {
    try {
      const trips = await this.#tripsApiService.trips;
      const destinations = await this.#tripsApiService.destinations;
      const offers = await this.#tripsApiService.offers;

      this.#trips = trips.map(this.#adaptToClient);
      this.#destinations = destinations;
      this.#offers = offers;

    } catch(err) {
      this.#destinations = [];
      this.#trips = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  };

  updateTrip = async (updateType, update) => {
    const index = this.#trips.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#tripsApiService.updateTrip(update);
      const updatedTrip = this.#adaptToClient(response);

      this.#trips = [
        ...this.#trips.slice(0, index),
        updatedTrip,
        ...this.#trips.slice(index + 1),
      ];

      this._notify(updateType, updatedTrip);
    } catch(err) {
      throw new Error('Can\'t update Trip');
    }
  };

  addTrip = async (updateType, update) => {
    try {
      const response = await this.#tripsApiService.addTrip(update);
      const newTrip = this.#adaptToClient(response);
      this.#trips = [newTrip, ...this.#trips];
      this._notify(updateType, newTrip);
    } catch(err) {
      throw new Error('Can\'t add trip');
    }
  };

  deleteTrip = async (updateType, update) => {
    const index = this.#trips.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    try {
      await this.#tripsApiService.deleteTrip(update);
      this.#trips = [
        ...this.#trips.slice(0, index),
        ...this.#trips.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete trip');
    }
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
