import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createNoTripTemplate = (filterType) => {
  const noTaskTextValue = NoTasksTextType[filterType];

  return `<p class="trip-events__msg">${noTaskTextValue}</p>`;
};

export default class NoTripView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoTripTemplate(this.#filterType);
  }
}
