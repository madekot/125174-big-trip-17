import FormEditView from '../view/form-edit-view';
import {nanoid} from 'nanoid';

import {
  remove,
  render,
  RenderPosition,
} from '../framework/render';

import {
  UpdateType,
  UserAction,
} from '../const';

export default class TripPointPresenter {
  #tripListContainer = null;
  #changeData = null;
  #formEditComponent = null;
  #destroyCallback = null;

  #trip = null;
  #offers = null;

  constructor(tripListContainer, changeData) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
  }

  init = (callback, offers, destinations) => {
    this.#destroyCallback = callback;

    if (this.#formEditComponent !== null) {
      return;
    }

    this.#formEditComponent = new FormEditView(null, offers, destinations);

    this.#formEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#formEditComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#formEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#formEditComponent);
    this.#formEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (trip) => {
    this.#changeData(
      UserAction.ADD_TRIP,
      UpdateType.MINOR,
      {id: nanoid(), ...trip},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
