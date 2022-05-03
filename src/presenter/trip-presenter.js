import FormEditView from '../view/form-edit-view';
import RoutePointView from '../view/route-point-view';
import SortingView from '../view/sorting-view';
import TripListView from '../view/trip-list-view';

import {render} from '../render';

export default class TripsPresenter {
  #container = null;
  #tripsModel = null;
  #dataTrips = null;
  #dataOffers = null;

  #tripListComponent = new TripListView();

  init = (container, tripsModel) => {
    this.#container = container;
    this.#tripsModel = tripsModel;
    this.#dataTrips = [...this.#tripsModel.trips];
    this.#dataOffers = [...this.#tripsModel.offers];

    render(new SortingView(), this.#container);
    render(this.#tripListComponent, this.#container);
    render(
      new FormEditView(
        this.#dataTrips[0], this.#dataOffers[0]
      ),
      this.#tripListComponent.element
    );

    for (let i = 1; i < this.#dataTrips.length; i++) {
      render(
        new RoutePointView(
          this.#dataTrips[i], this.#dataOffers[i]
        ),
        this.#tripListComponent.element
      );
    }
  };
}
