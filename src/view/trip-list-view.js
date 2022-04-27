import {createElement} from '../render';

const createTripList = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class TripsListView {
  getTemplate() {
    return createTripList();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
