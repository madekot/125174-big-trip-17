import {createElement} from '../render';
import {
  getDateFrom,
  getDateTo,
  getTextFinalSay,
  makeCounter,
  textTransformCapitalize,
} from '../utils';

const createEventTypeItem = (type = {}) => {
  const checked  = type.checked ? 'checked' : '';
  const label = textTransformCapitalize(type.name);
  const name = type.name || 'taxi';

  return (
    `<div class="event__type-item">
      <input id="event-type-${name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}" ${checked}>
      <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">${label}</label>
    </div>`
  );
};

const createEventTypes = (data) => {
  const dataDefault = [
    {name: 'taxi'},
    {name: 'train'},
    {name: 'ship'},
    {name: 'drive'},
    {name: 'flight', checked: true},
    {name: 'check-in'},
    {name: 'sightseeing'},
    {name: 'restaurant'},
  ];

  data = data || dataDefault;

  return data.map((idx) => createEventTypeItem(idx)).join('');
};

const createOfferSelectorItem = (offer = {}) => {
  const checked = offer.checked ? 'checked' : '';
  const id = offer.id || '0';
  const name = getTextFinalSay(offer.title);
  const price = offer.price || 50;
  const title = offer.title || 'Add luggage';

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1${id}" type="checkbox" name="${name}" ${checked}>
      <label class="event__offer-label" for="event-offer-${name}-1${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOfferSelectors = (data) => {
  const getId = makeCounter();

  const dataDefault = [
    {price: 50, title: 'Add luggage', checked: true},
    {price: 80, title: 'Switch to comfort', checked: true},
    {price: 15, title: 'Add meal'},
    {price: 5, title: 'Choose seats'},
    {price: 40, title: 'Travel by train'},
  ];

  data = data || dataDefault;

  return data.map((idx) => createOfferSelectorItem({...idx, id: getId()})).join('');
};

const createEditForm = (point = {}) => {
  const basePrice = point.basePrice || 0;
  const dateFrom = getDateFrom(point.dateFrom);
  const dateTo = getDateTo(point.dateTo);
  const destinationDescription = point.destination?.description || 'Chamonix-Mont-Blanc (usually shortened to Chamonix)';
  const destinationName = point.destination?.name || 'destination';
  const eventTypeItems = createEventTypes();
  const offerSelectors = createOfferSelectors(point.offers?.offers);
  const offersLabel = point.offers?.type || 'flight';
  const typeIcon = point.offers?.type || 'flight';

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

                ${eventTypeItems}

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
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">offers</h3>

            <div class="event__available-offers">

              ${offerSelectors}

            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">destination</h3>
            <p class="event__destination-description">${destinationDescription}</p>
          </section>
        </section>
      </form>
    </li>`
  );
};
export default class FormEditView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createEditForm(this.point);
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
