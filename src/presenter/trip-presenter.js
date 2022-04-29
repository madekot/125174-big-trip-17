import FormEditView from '../view/form-edit-view';
import RoutePointView from '../view/route-point-view';
import SortingView from '../view/sorting-view';
import TripListView from '../view/trip-list-view';

import {render} from '../render';

export default class TripsPresenter {
  tripListComponent = new TripListView();

  init = (container, tripsModel) => {
    this.container = container;
    this.tripsModel = tripsModel;
    this.dataTrips = [...this.tripsModel.getTrips()];

    render(new SortingView(), this.container);
    render(this.tripListComponent, this.container);
    render(new FormEditView(this.dataTrips[0]), this.tripListComponent.getElement());

    for (let i = 1; i < this.dataTrips.length; i++) {
      render(new RoutePointView(this.dataTrips[i]), this.tripListComponent.getElement());
    }
  };
}
