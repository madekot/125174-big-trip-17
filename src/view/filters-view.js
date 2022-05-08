import AbstractView from '../framework/view/abstract-view';
import {transformFirstLetterWordUppercase} from '../utils';
import {FILTER_DEFAULT} from '../const';

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

const createFilterList = (filters) => filters.map(
  (filter) => createFilterItem(filter)
).join('');

const filterList = createFilterList(FILTER_DEFAULT);

const createFilters = () => (
  `<form class="trip-filters" action="#" method="get">

    ${filterList}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  get template() {
    return createFilters();
  }
}
