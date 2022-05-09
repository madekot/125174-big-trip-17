import AbstractView from '../framework/view/abstract-view';

const createNoTripTemplate = (filterType = 'Everything') => {
  let message = 'Click New Event to create your first point';

  if (filterType === 'Past') {
    message = 'There are no past events now';
  }

  if (filterType === 'Future') {
    message = 'There are no future events now';
  }

  return `<p class="trip-events__msg">${message}</p>`;
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
