import AbstractView from '../framework/view/abstract-view';
import {SORTING_DEFAULT_LIST} from '../const';
import {transformFirstLetterWordUppercase} from '../utils';

const createSortingItem = (sorting = {}) => {
  const name = sorting.name || 'day';
  const label = sorting.name ? transformFirstLetterWordUppercase(sorting.name) : 'Day';
  const disabled = sorting.disabled ? 'disabled' : '';
  const checked = sorting.checked ? 'checked' : '';

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${disabled} ${checked}>
      <label class="trip-sort__btn" for="sort-${name}">${label}</label>
    </div>`
  );
};

const createSortingList = (data) => data.map((item) => createSortingItem(item)).join(' ');
const sortingList = createSortingList(SORTING_DEFAULT_LIST);

const createSorting = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

    ${sortingList}

  </form>`
);

export default class SortingView extends AbstractView {
  get template() {
    return createSorting();
  }
}
