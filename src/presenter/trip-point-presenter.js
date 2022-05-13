import FormEditView from '../view/form-edit-view';
import RoutePointView from '../view/route-point-view';
import {
  render,
  replace,
} from '../framework/render';
export default class tripItemPresenter {
  #tripListContainer = null;

  #formEditComponent = null;
  #tripPointComponent = null;

  #trip = null;
  #offers = null;

  constructor(tripListContainer) {
    this.#tripListContainer = tripListContainer;
  }

  init = (trip, offers) => {
    this.#trip = trip;
    this.#offers = offers;

    this.#tripPointComponent = new RoutePointView(this.#trip, this.#offers);
    this.#formEditComponent = new FormEditView(this.#trip, this.#offers);

    this.#tripPointComponent.setEditClickHandler(this.#handleEditClick);

    this.#formEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formEditComponent.setEditClickHandler(this.#handleRollClick);

    render(this.#tripPointComponent, this.#tripListContainer);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };

  #handleRollClick = () => {
    this.#replaceFormToPoint();
  };

  #replaceFormToPoint = () => {
    replace(this.#tripPointComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #replacePointToForm = () => {
    replace(this.#formEditComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };
}
