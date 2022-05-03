import FormEditView from '../view/form-edit-view';
import RoutePointView from '../view/route-point-view';
import SortingView from '../view/sorting-view';
import TripListView from '../view/trip-list-view';
import NoTripView from '../view/no-trip-view';

import {render} from '../render';
export default class TripsPresenter {
  #boardContainer = null;
  #tripsModel = null;

  #tripListComponent = new TripListView();

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
    const formEditComponent = new FormEditView(point, offers);
    const pointComponent = new RoutePointView(point, offers);

    const replaceFormToPoint = () => {
      this.#tripListComponent.element.replaceChild(
        pointComponent.element, formEditComponent.element
      );
    };

    const replacePointToForm = () => {
      this.#tripListComponent.element.replaceChild(
        formEditComponent.element, pointComponent.element
      );
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    formEditComponent.element.querySelector('form')
      .addEventListener('submit', (evt) => {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      });

    formEditComponent.element.querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      });

    pointComponent.element.querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        replacePointToForm();
        document.addEventListener('keydown', onEscKeyDown);
      });

    render(pointComponent, this.#tripListComponent.element);
  };

  #renderBoard = () => {
    render(new SortingView(), this.#boardContainer);
    render(this.#tripListComponent, this.#boardContainer);

    if (this.#dataTrips.length) {
      for (let i = 0; i < this.#dataTrips.length; i++) {
        this.#renderTrip(this.#dataTrips[i], this.#dataOffers[i]);
      }
    } else {
      render(new NoTripView(), this.#boardContainer);
    }
  };
}
