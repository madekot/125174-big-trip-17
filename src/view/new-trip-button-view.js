import AbstractView from '../framework/view/abstract-view';

const createNewTripButton = () => (
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">
    New event
  </button>`
);

export default class NewTripButtonView extends AbstractView {
  get template() {
    return createNewTripButton();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
