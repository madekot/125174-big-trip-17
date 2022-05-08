import AbstractView from '../framework/view/abstract-view';
import {
  transformFirstLetterWordUppercase,
  getDateFrom,
  getDateDifference
} from '../utils';

import {
  ID_DEFAULT_LIST,
} from '../const';

import {generateOffers} from '../mock/trip-mock';

const createSelectedOfferItem = (offer = {}) => {
  const title = offer.title;
  const price = offer.price;

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`
  );
};

const createSelectedOffers = (data) => data.map(
  (item) => createSelectedOfferItem(item)
).join('');

const getOffersEqualCurrentType = ({type, offers}) => {
  if (!offers.length) {
    offers = generateOffers();
  }

  for (const offerItem of offers) {
    if (offerItem.type === type) {
      return {...offerItem};
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

const createPointTemplate = (point = {}, offers = {}) => {
  const getHoursMinutes = (time) => getDateFrom(time, {type: 'hoursMinutes'});
  const getMonthDay = (time) => getDateFrom(time, {type: 'monthDay'});
  const getTimeDuration = () => getDateDifference({first: point.dateFrom, second: point.dateTo});

  const basePrice = point.basePrice || 600;
  const dateTitleFromHuman = getMonthDay();
  const dateTitleMachine = point.date || '2019-03-18';
  const isFavorite = point.isFavorite ? 'event__favorite-btn--active' : '';
  const timeDuration = point.dateFrom ? getTimeDuration() : '40M';
  const timeEndHuman = getHoursMinutes(point.dateTo) || 'MAR 18';
  const timeEndMachine = point.timeEndMachine || '2019-03-18T13:35';
  const timeStartHuman = getHoursMinutes(point.dateFrom) || '16:20';
  const timeStartMachine = point.timeStartMachine || '2019-03-18T12:25';
  const title = point.destination?.name || 'Chamonix';
  const type = point.type || 'check-in';
  const typeLabel = point.type ? transformFirstLetterWordUppercase(point.type) : 'Check-in';

  const offerEqualCurrentType = getOffersEqualCurrentType({type, offers});

  const offersConverted = convertIdToOffers(
    {offersList: offerEqualCurrentType.offers, idList: point.offers}
  );

  const selectedOffers = createSelectedOffers(offersConverted);

  return(
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateTitleMachine}">${dateTitleFromHuman}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeLabel} ${title}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${timeStartMachine}">${timeStartHuman}</time>
            &mdash;
            <time class="event__end-time" datetime="${timeEndMachine}">${timeEndHuman}</time>
          </p>
          <p class="event__duration">${timeDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${selectedOffers}
        </ul>
        <button class="event__favorite-btn ${isFavorite}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class RoutePointView extends AbstractView {
  #trip = null;
  #offers = null;

  constructor(trip, offers) {
    super();
    this.#trip = trip;
    this.#offers = offers;
  }

  get template() {
    return createPointTemplate(this.#trip, this.#offers);
  }

  setEditClickHandler = (callback) => {
    this._callback.click = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
