import ApiService from './framework/api-service.js';
import {deleteObjectProperty} from './utils/common';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
export default class TripsApiService extends ApiService {
  get trips() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updateTrip = async (trip) => {
    const response = await this._load({
      url: `points/${trip.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(trip)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  addTrip = async (trip) => {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(trip)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  };

  deleteTrip = async (trip) => (
    await this._load({
      url: `points/${trip.id}`,
      method: Method.DELETE,
    })
  );

  #adaptToServer = (trip) => {
    const adaptedTask = {...trip,
      'base_price': Number(trip.basePrice),
      'date_from': trip.dateFrom,
      'date_to': trip.dateTo,
      'is_favorite': trip.isFavorite,
    };

    deleteObjectProperty(
      adaptedTask,
      'basePrice',
      'dateFrom',
      'dateTo',
      'isFavorite'
    );

    return adaptedTask;
  };
}
