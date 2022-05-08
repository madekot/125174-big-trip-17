import AbstractView from '../framework/view/abstract-view';

const createTripList = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class TripsListView extends AbstractView {
  get template() {
    return createTripList();
  }
}
