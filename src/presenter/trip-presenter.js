import LoadingView from '../view/loading-view.js';
import NoTripView from '../view/no-trip-view';
import SortingView from '../view/sorting-view';
import TripListView from '../view/trip-list-view';
import TripNewPresenter from './trip-new-presenter';
import TripPointPresenter from './trip-point-presenter';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import {SortType, UpdateType, UserAction, FilterType} from '../const';
import {filter} from '../utils/filter';
import {render, remove} from '../framework/render';
import {sortTripDay, sortTripPrice, sortTripTime} from '../utils/trips';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #boardContainer = null;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  #tripsModel = null;
  #filterModel = null;

  #sortingComponent = null;
  #tripListComponent = new TripListView();
  #noTripComponent = null;
  #loadingComponent = new LoadingView();

  #tripPointPresenter = new Map();
  #tripNewPresenter = null;

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(boardContainer, tripsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#tripNewPresenter = new TripNewPresenter(
      this.#tripListComponent.element, this.#handleViewAction);

    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;

    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get trips() {
    this.#filterType = this.#filterModel.filter;
    const trips = this.#tripsModel.trips;
    const filteredTrips = filter[this.#filterType](trips);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredTrips.sort(sortTripDay);

      case SortType.PRICE:
        return filteredTrips.sort(sortTripPrice);

      case SortType.TIME:
        return filteredTrips.sort(sortTripTime);
    }

    return filteredTrips;
  }

  get offers() {
    return this.#tripsModel.offers;
  }

  get destinations() {
    return this.#tripsModel.destinations;
  }

  init = () => {
    this.#renderBoard();
  };

  createTrip = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#tripNewPresenter.init(callback, this.#tripsModel.offers, this.#tripsModel.destinations);
  };

  #renderTrip = (point) => {
    const tripPointPresenter = new TripPointPresenter(
      this.#tripListComponent.element, this.#handleViewAction, this.#handleModeChange
    );

    tripPointPresenter.init(point, this.offers, this.destinations);
    this.#tripPointPresenter.set(point.id, tripPointPresenter);
  };

  #handleModeChange = () => {
    this.#tripNewPresenter.destroy();
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripPointPresenter.get(update.id).setSaving();
        try {
          await this.#tripsModel.updateTrip(updateType, update);
        } catch(err) {
          this.#tripPointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TRIP:
        this.#tripNewPresenter.setSaving();

        try {
          await this.#tripsModel.addTrip(updateType, update);
          await this.#tripNewPresenter.destroy();
        } catch(err) {
          this.#tripNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TRIP:
        this.#tripPointPresenter.get(update.id).setDeleting();
        try {
          await this.#tripsModel.deleteTrip(updateType, update);
        } catch(err) {
          this.#tripPointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPointPresenter.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortingComponent = new SortingView(this.#currentSortType);
    this.#sortingComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortingComponent, this.#boardContainer);
  };

  #renderTrips = () => {
    this.trips.forEach((trip) => this.#renderTrip(trip));
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#boardContainer);
  };

  #renderNoTrip = () => {
    this.#noTripComponent = new NoTripView(this.#filterType);
    render(this.#noTripComponent, this.#boardContainer);
  };

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.trips.length) {
      this.#renderNoTrip();
      return;
    }

    this.#renderSort();

    render(this.#tripListComponent, this.#boardContainer);
    this.#renderTrips();
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();

    remove(this.#sortingComponent);
    remove(this.#loadingComponent);

    if (this.#noTripComponent) {
      remove(this.#noTripComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };
}
