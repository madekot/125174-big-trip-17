import FormEditView from '../view/form-edit-view';
import RoutePointView from '../view/route-point-view';
import {Mode, UpdateType, UserAction} from '../const';
import {deleteObjectProperty} from '../utils/common';
import {humanizeDate} from '../utils/trips';
import {render, replace, remove} from '../framework/render';
export default class TripPointPresenter {
  #tripListContainer = null;

  #changeData = null;
  #changeMode = null;

  #formEditComponent = null;
  #tripPointComponent = null;

  #trip = null;

  #mode = Mode.DEFAULT;

  constructor(tripListContainer, changeData, changeMode) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (trip, offers, destinations) => {
    this.#trip = trip;

    const prevTripPointComponent = this.#tripPointComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#tripPointComponent = new RoutePointView(trip, offers);
    this.#formEditComponent = new FormEditView(trip, offers, destinations);

    this.#tripPointComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#formEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formEditComponent.setEditClickHandler(this.#handleRollClick);
    this.#formEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevTripPointComponent === null || prevFormEditComponent === null) {
      render(this.#tripPointComponent, this.#tripListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripPointComponent, prevFormEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevTripPointComponent);
    remove(prevFormEditComponent);
  };

  destroy = () => {
    remove(this.#formEditComponent);
    remove(this.#tripPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#formEditComponent.reset(this.#trip);
      this.#replaceFormToPoint();
    }
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#formEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#formEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripPointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#formEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formEditComponent.shake(resetFormState);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#formEditComponent.reset(this.#trip);
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = (trip) => {
    this.#changeData(
      UserAction.UPDATE_TRIP,
      TripPointPresenter.isMinorUpdate(this.#trip, trip) ? UpdateType.MINOR : UpdateType.PATCH,
      trip,
    );
  };

  #handleRollClick = () => {
    this.#formEditComponent.reset(this.#trip);
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_TRIP,
      UpdateType.MINOR,
      {...this.#trip, isFavorite: !this.#trip.isFavorite},
    );
  };

  #replaceFormToPoint = () => {
    replace(this.#tripPointComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #replacePointToForm = () => {
    replace(this.#formEditComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #handleDeleteClick = (trip) => {
    this.#changeData(
      UserAction.DELETE_TRIP,
      UpdateType.MINOR,
      trip,
    );
  };

  static isMinorUpdate = (oldTrip, newTrip) => {
    const cloneOldTrip = {...oldTrip};
    const cloneNewTrip = {...newTrip};

    const propertyDelete = ['destination', 'offers', 'type'];

    deleteObjectProperty (cloneOldTrip, ...propertyDelete);
    deleteObjectProperty (cloneNewTrip, ...propertyDelete);

    cloneOldTrip.dateFrom = humanizeDate(cloneOldTrip.dateFrom);
    cloneOldTrip.dateTo = humanizeDate(cloneOldTrip.dateTo);

    cloneNewTrip.dateFrom = humanizeDate(cloneNewTrip.dateFrom);
    cloneNewTrip.dateTo = humanizeDate(cloneNewTrip.dateTo);

    return JSON.stringify(cloneOldTrip) !== JSON.stringify(cloneNewTrip);
  };
}
