import NoTripView from '../view/no-trip-view';
import SortingView from '../view/sorting-view';
import TripListView from '../view/trip-list-view';

import TripPointPresenter from './trip-point-presenter';

import {
  RenderPosition,
  render,
} from '../framework/render';
export default class TripsPresenter {
  #boardContainer = null;
  #tripsModel = null;

  #tripListComponent = new TripListView();
  #sortingComponent = new SortingView();
  #noTripComponent = new NoTripView();

  #dataTrips = [];
  #dataOffers = [];

  constructor(boardContainer, tripsModel) {
    this.#boardContainer = boardContainer;
    this.#tripsModel = tripsModel;
  }

  init = () => {
    this.#dataTrips = [...this.#tripsModel.trips];
    this.#dataOffers = [...this.#tripsModel.offers];

    this.#renderBoard();
  };

  #renderTrip = (point, offers) => {
    const tripPointPresenter = new TripPointPresenter(this.#tripListComponent.element);
    tripPointPresenter.init(point, offers);
  };

  #renderSort = () => {
    render(this.#sortingComponent, this.#boardContainer, RenderPosition.BEFOREEND);
  };

  #renderTrips = () => {
    this.#dataTrips.forEach((trip, i) => this.#renderTrip(trip, this.#dataOffers[i]));
  };

  #renderTripList = () => {
    render(this.#tripListComponent, this.#boardContainer, RenderPosition.BEFOREEND);
    this.#renderTrips();
  };

  #renderNoTrip = () => {
    render(this.#noTripComponent, this.#boardContainer, RenderPosition.BEFOREEND);
  };

  #renderBoard = () => {
    this.#renderSort();

    if (!this.#dataTrips.length) {
      this.#renderNoTrip();
      return;
    }

    this.#renderTripList();
  };
}
