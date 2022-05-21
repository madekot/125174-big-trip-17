import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { humanizeDate, getOffersEqualCurrentType } from '../utils/trips';
import { getTextFinalSay, transformFirstLetterWordUppercase, } from '../utils/common';
import { TYPES } from '../const';

const createPicturesList = (data) => data.map(
  (pictures) => (
    `<img class="event__photo" src="${pictures.src}" alt="${pictures.description}">`
  )
).join(' ');

const createPicturesContainer  = (picturesList) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${createPicturesList(picturesList)}
    </div>
  </div>`
);

const createEventTypeItem = (type = {}) => {
  const checked  = type.checked ? 'checked' : '';
  const label = transformFirstLetterWordUppercase(type.name);
  const name = type.name || 'taxi';

  return (
    `<div class="event__type-item">
      <input id="event-type-${name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}" ${checked}>
      <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">${label}</label>
    </div>`
  );
};

const createEventTypes = ({typeChecked, types}) => {
  const cloneTypes = [...types];
  const newTypes = Array(types.length).fill('').map((item, index) => (
    {
      checked: typeChecked === cloneTypes[index],
      name: cloneTypes[index],
    }
  ));

  return newTypes.map((eventType) => createEventTypeItem(eventType)).join('');
};

const createOfferSelectorItem = (offer = {}) => {
  const isChecked = offer.isChecked ? 'checked' : '';
  const id = offer.id;
  const name = getTextFinalSay(offer.title);
  const price = offer.price;
  const title = offer.title;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1${id}" type="checkbox" name="${name}" ${isChecked}>
      <label class="event__offer-label" for="event-offer-${name}-1${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOfferSelectors = (offers) => offers.map(
  (item) => createOfferSelectorItem(item)
).join('');

const createOfferSection = (offers) => {
  if (!offers?.length) {
    return '';
  }

  const offerSelectorsTemplate = createOfferSelectors(offers);
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">offers</h3>
      <div class="event__available-offers">

        ${offerSelectorsTemplate}

      </div>
    </section>`
  );
};

const createEditForm = (point = {}) => {
  const basePrice = point.basePrice || 0;
  const offers = point.offers?.length ? point.offers : [];

  const dateFrom = humanizeDate(point.dateFrom);
  const dateTo = humanizeDate(point.dateTo);

  const destinationDescription = point.destination?.description || 'Chamonix-Mont-Blanc (usually shortened to Chamonix)';
  const destinationName = point.destination?.name || 'destination';
  const offersLabel = point.type || 'flight';
  const type = point.type || 'flight';
  const typeIcon = point.type || 'flight';

  const eventTypeItemsTemplate = createEventTypes({typeChecked: type, types: TYPES});
  const picturesTemplate = point.destination?.pictures ? createPicturesContainer(point.destination.pictures) : '';
  const offerTemplate = createOfferSection(offers);

  return(
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${typeIcon}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${eventTypeItemsTemplate}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">

              ${offersLabel}

            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">

          ${offerTemplate}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">destination</h3>
            <p class="event__destination-description">${destinationDescription}</p>

            ${picturesTemplate}

          </section>
        </section>
      </form>
    </li>`
  );
};
export default class FormEditView extends AbstractStatefulView {
  constructor(point, offers) {
    super();
    this._state = FormEditView.parsePointToState(point, offers);
  }

  get template() {
    return createEditForm(this._state);
  }

  setEditClickHandler = (callback) => {
    this._callback.click = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit(FormEditView.parseStateToPoint(this._state));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick();
  };

  static convertIdListToOffers = ({offersList, idList}) => {
    let result = [];

    offersList.forEach((offer) => {
      if (idList.includes(offer.id)) {
        result = [...result, {...offer, isChecked: true}];
      } else {
        result = [...result, {...offer, isChecked: false}];
      }
    });

    return result;
  };

  static convertOffersToIdList = (offersList) => (
    offersList.filter((item) => item.isChecked).map(({id}) => id)
  );

  static parsePointToState = (point, offers) => {
    const offerEqualCurrentType = getOffersEqualCurrentType({type: point.type, offers}).offers;
    const convertedIdListToOffers = FormEditView.convertIdListToOffers({offersList: offerEqualCurrentType, idList: point.offers});

    return (
      {
        ...point,
        offers: convertedIdListToOffers,
        allOffersType: offers,
      }
    );
  };

  static parseStateToPoint = (state) => (
    {
      ...state,
      offers: FormEditView.convertOffersToIdList(state.offers)
    }
  );
}
