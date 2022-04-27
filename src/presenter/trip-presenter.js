import RoutePointView from '../view/route-point-view';
import FormEditView from '../view/form-edit-view';
import TripListView from '../view/trip-list-view';
import SortingView from '../view/sorting-view';

import {render} from '../render';

export default class TripsPresenter {
  tripListComponent = new TripListView();

  init = (container) => {
    this.container = container;

    render(new SortingView(), this.container);
    render(this.tripListComponent, this.container);
    render(new FormEditView(), this.tripListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new RoutePointView(), this.tripListComponent.getElement());
    }
  };
}
