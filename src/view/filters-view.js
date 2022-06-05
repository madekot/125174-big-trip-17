import AbstractView from '../framework/view/abstract-view';
import {transformFirstLetterWordUppercase} from '../utils/common';

const createFilterItem = (filter = {}) => {
  const checked  = filter.checked ? 'checked' : '';
  const label = filter.name ? transformFirstLetterWordUppercase(filter.name) : 'Everything';
  const name = filter.name || 'everything';

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${checked}>
      <label class="trip-filters__filter-label" for="filter-${name}">${label}</label>
    </div>`
  );
};

const createFilterList = (filters, currentFilterType) => filters.map(
  (filter) => createFilterItem(
    {...filter, checked: filter.type === currentFilterType}
  )).join('');

const createFilters = (filterItems, currentFilterType) => {
  const filterList = createFilterList(filterItems, currentFilterType);

  return (
    `<form class="trip-filters" action="#" method="get">

      ${filterList}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor (filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilters(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
