import {createElement} from '../render';
import {textTransformCapitalize} from '../utils';

const createFilterItem = (filter) => {
  const name = filter || 'everything';
  const label = filter ? textTransformCapitalize(filter) : 'Everything';

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}">
      <label class="trip-filters__filter-label" for="filter-${name}">${label}</label>
    </div>`
  );
};

const filterNames = ['everything', 'future', 'past'];
const createFilterList = (filters) => filters.map((filter) => createFilterItem(filter)).join('');
const filterList = createFilterList(filterNames);

const createFilters = () => (
  `<form class="trip-filters" action="#" method="get">

    ${filterList}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView {
  getTemplate() {
    return createFilters();
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
