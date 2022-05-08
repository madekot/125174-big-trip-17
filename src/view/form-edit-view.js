import AbstractView from '../framework/view/abstract-view';
import {
  getDateFrom,
  getDateTo,
  getTextFinalSay,
  transformFirstLetterWordUppercase,
} from '../utils';

import {
  ID_DEFAULT_LIST,
  TYPES,
} from '../const';

import {generateOffers} from '../mock/trip-mock';

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
  const checked = offer.checked ? 'checked' : '';
  const id = offer.id;
  const name = getTextFinalSay(offer.title);
  const price = offer.price;
  const title = offer.title;

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

const createOfferSelectors = (offers) => offers.map(
  (item) => createOfferSelectorItem(item)
).join('');

const getOffersEqualCurrentType = ({type, offers}) => {
  if (!offers.length) {
    offers = generateOffers();
  }

  for (const offerItem of offers) {
    if (offerItem.type === type) {
      return [...offerItem.offers];
    }
  }
};

const convertIdToOffers = ({offersList, idList}) => {
  if (!idList) {
    idList = ID_DEFAULT_LIST;
  }

  const arrC = [];

  offersList.forEach((item) => {
    idList.forEach((el) => {
      if (item.id === el) {
        arrC.push({...item});
      }
    });
  });

  return arrC;
};

const createEditForm = (point = {}, offers = {}) => {
  const basePrice = point.basePrice || 0;
  const dateFrom = getDateFrom(point.dateFrom);
  const dateTo = getDateTo(point.dateTo);
  const destinationDescription = point.destination?.description || 'Chamonix-Mont-Blanc (usually shortened to Chamonix)';
  const destinationName = point.destination?.name || 'destination';
  const offersLabel = point.type || 'flight';
  const type = point.type || 'flight';
  const typeIcon = point.type || 'flight';

  const offerEqualCurrentType = getOffersEqualCurrentType({type, offers});

  const offersConverted = convertIdToOffers(
    {offersList: offerEqualCurrentType, idList: point.offers}
  );

  const eventTypeItems = createEventTypes({typeChecked: type, types: TYPES});
  const offerSelectors = createOfferSelectors(offersConverted);
  const pictures = point.destination?.pictures ? createPicturesContainer(point.destination.pictures) : '';

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

            ${pictures}

          </section>
        </section>
      </form>
    </li>`
  );
};
export default class FormEditView extends AbstractView {
  #point = null;
  #offers = null;

  constructor(point, offers) {
    super();
    this.#point = point;
    this.#offers = offers;
  }

  get template() {
    return createEditForm(this.#point, this.#offers);
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

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit();
  };
}
