import {createElement} from '../render';

const createNoTripTemplate = (filterType = 'Everthing') => {
  let message = 'Click New Event to create your first point';

  if (filterType === 'Past') {
    message = 'There are no past events now';
  }

  if (filterType === 'Future') {
    message = 'There are no future events now';
  }

  return `<p class="trip-events__msg">${message}</p>`;
};

export default class NoTripView {
  #filterType = null;

  constructor(filterType) {
    this.#filterType = filterType;
  }

  #element = null;

  get template() {
    return createNoTripTemplate(this.#filterType);
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
