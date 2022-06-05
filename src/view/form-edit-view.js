import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { humanizeDate, getOffersEqualCurrentType } from '../utils/trips';
import {nanoid} from 'nanoid';

import {
  convertHumanizeToIsoDate,
  getTextFinalSay,
  transformFirstLetterWordUppercase,
} from '../utils/common';

import { TYPES, CITY_NAMES } from '../const';
import flatpickr from 'flatpickr';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import 'flatpickr/dist/flatpickr.min.css';

dayjs.extend(customParseFormat);

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
  const typeName = type.name || 'type';

  return (
    `<div class="event__type-item">
      <input id="event-type-${name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}" ${checked}>
      <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1" data-type="${typeName}">${label}</label>
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
      <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${name}" ${isChecked}>
      <label class="event__offer-label" for="${id}">
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

const createDestinationList = (cities, selectedName) => {
  const citiesTemplate = cities.map((city) => {
    const isSelected = selectedName === city ? 'selected': '';

    return `<option value="${city}" ${isSelected}>${city}</option>`;
  }).join(' ');

  return (`
    ${citiesTemplate}
  `);
};

const createEditForm = (point = {}) => {
  const basePrice = point.basePrice || 0;
  const offers = point.offers?.length ? point.offers : [];

  const dateFrom = point.dateFrom;
  const dateTo = point.dateTo;

  const destinationDescription = point.destination?.description || '';
  const destinationName = point.destination?.name || '';
  const offersLabel = point.type || 'flight';
  const type = point.type || 'flight';
  const typeIcon = point.type || 'flight';

  const eventTypeItemsTemplate = createEventTypes({typeChecked: type, types: TYPES});
  const picturesTemplate = point.destination?.pictures ? createPicturesContainer(point.destination.pictures) : '';
  const offerTemplate = createOfferSection(offers);
  const destinationListTemplate = createDestinationList(CITY_NAMES, destinationName);

  const destinationTemplate = destinationDescription
    ? (`<h3 class="event__section-title  event__section-title--destination">destination</h3>
      <p class="event__destination-description">${destinationDescription}</p>`)
    : '';

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
            <select
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destinationName}" list="destination-list-1"
            >

              ${destinationListTemplate}

            </select>


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
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
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
            ${destinationTemplate}

            ${picturesTemplate}

          </section>
        </section>
      </form>
    </li>`
  );
};

const defaultPoint = {
  basePrice: 0,
  dateFrom: dayjs().toISOString(),
  dateTo: dayjs().add(15, 'minute').toISOString(),
  id: nanoid(),
  isFavorite: false,
  offers: [],
  type: 'taxi',
};
export default class FormEditView extends AbstractStatefulView {
  #datepickerDateStart = null;
  #datepickerDateEnd = null;
  #offers = null;
  #destinations = null;

  constructor(point, offers, destinations) {
    super();
    point = point ?? defaultPoint;

    this.#offers = offers;
    this.#destinations = destinations;

    this._state = FormEditView.parsePointToState(point, this.#offers, this.#destinations);
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createEditForm(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setEditClickHandler(this._callback.click);
    this.setFormSubmitHandler(this._callback.submit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerDateStart) {
      this.#datepickerDateStart.destroy();
      this.#datepickerDateStart = null;
    }

    if (this.#datepickerDateEnd) {
      this.#datepickerDateEnd.destroy();
      this.#datepickerDateEnd = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      FormEditView.parsePointToState(point, this.#offers, this.#destinations),
    );
  };

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

  #setDatepicker = () => {
    const defaultSettings  = {
      enableTime: true,
      // minDate: 'today',
      dateFormat: 'd/m/y H:i',
    };

    const startTime  = {
      defaultDate: convertHumanizeToIsoDate(this._state.dateFrom),
      onChange: this.#dataStartChangeHandler,
    };

    this.#datepickerDateStart = flatpickr(
      this.element.querySelector('[name=event-start-time]'),
      {...defaultSettings, ...startTime},
    );

    const endTime  = {
      defaultDate: convertHumanizeToIsoDate(this._state.dateTo),
      onChange: this.#dataEndChangeHandler,
    };

    this.#datepickerDateEnd = flatpickr(
      this.element.querySelector('[name=event-end-time]'),
      {...defaultSettings, ...endTime},
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list')
      .addEventListener('click', this.#changeTypeClickHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('input', this.#cityInputHandler);

    this.element.querySelector('#event-price-1')
      .addEventListener('input', this.#priceInputHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('click', this.#offerChangeHandler);
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
    this._callback.deleteClick(FormEditView.parseStateToPoint(this._state));
  };

  #changeTypeClickHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    const type = evt.target.dataset.type;

    const offers = getOffersEqualCurrentType({
      type,
      offers: this._state.allOffers
    }).offers;

    this.updateElement({
      type,
      offers,
    });
  };

  #cityInputHandler = (evt) => {
    evt.preventDefault();
    const cityName = evt.target.value;

    if (!CITY_NAMES.includes(cityName)) {
      return;
    }

    const destinationIndex = this._state.allDestinations.map(
      (destination) => destination.name
    ).indexOf(cityName);

    const newDestination = this._state.allDestinations[destinationIndex];

    this.updateElement({
      destination: newDestination,
    });
  };

  #dataStartChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: humanizeDate(userDate),
    });
  };

  #dataEndChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: humanizeDate(userDate),
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      basePrice: evt.target.value,
    });
  };

  #offerChangeHandler = (evt) => {
    const label = evt.target.closest('label');

    if (!label) {
      return;
    }

    const input = label.previousElementSibling;
    const offers = this._state.offers;

    const updateOfferIndex = offers.findIndex(
      (offer) => offer.id === +input.id
    );

    const updateOffer = offers[updateOfferIndex];
    const isChecked = updateOffer.isChecked = !updateOffer.isChecked;

    const updateOffers = [
      ...offers.slice(0, updateOfferIndex),
      {...updateOffer, isChecked},
      ...offers.slice(updateOfferIndex + 1),
    ];

    this._setState({
      offers: updateOffers,
    });
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

  static parsePointToState = (point, offers, destinations) => {
    const offerEqualCurrentType = getOffersEqualCurrentType({
      type: point.type,
      offers
    }).offers;

    const convertedIdListToOffers = FormEditView.convertIdListToOffers({
      offersList: offerEqualCurrentType, idList: point.offers
    });

    return ({
      ...point,
      allDestinations: destinations,
      allOffers: offers,
      dateFrom: humanizeDate(point.dateFrom),
      dateTo: humanizeDate(point.dateTo),
      offers: convertedIdListToOffers,
    });
  };

  static parseStateToPoint = (state) => {
    const point = {
      ...state,
      dateFrom: convertHumanizeToIsoDate(state.dateFrom),
      dateTo: convertHumanizeToIsoDate(state.dateTo),
      offers: FormEditView.convertOffersToIdList(state.offers),
    };

    delete point.allOffers;
    delete point.allDestinations;

    return point;
  };
}
