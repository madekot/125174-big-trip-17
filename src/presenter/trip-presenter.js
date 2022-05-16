import NoTripView from '../view/no-trip-view';
import SortingView from '../view/sorting-view';
import TripListView from '../view/trip-list-view';

import TripPointPresenter from './trip-point-presenter';
import {RenderPosition, render,} from '../framework/render';
import {updateItem} from '../utils/common';

export default class TripPresenter {
  #boardContainer = null;
  #tripsModel = null;

  #tripListComponent = new TripListView();
  #sortingComponent = new SortingView();
  #noTripComponent = new NoTripView();

  #tripPointPresenter = new Map();

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
    const tripPointPresenter = new TripPointPresenter(
      this.#tripListComponent.element, this.#handleTripChange, this.#handleModeChange
    );
    tripPointPresenter.init(point, offers);
    this.#tripPointPresenter.set(point.id, tripPointPresenter);
  };

  #handleModeChange = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleTripChange = (updatedTrip) => {
    this.#dataTrips = updateItem(this.#dataTrips, updatedTrip);
    this.#tripPointPresenter.get(updatedTrip.id).init(updatedTrip);
  };

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
    console.log(sortType);
  };

  #renderSort = () => {
    render(this.#sortingComponent, this.#boardContainer, RenderPosition.BEFOREEND);
    this.#sortingComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderTrips = () => {
    this.#dataTrips.forEach((trip, i) => this.#renderTrip(trip, this.#dataOffers[i]));
  };

  #clearTripList = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();
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
