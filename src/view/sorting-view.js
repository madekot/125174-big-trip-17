import AbstractView from '../framework/view/abstract-view';
import {SORTING_DEFAULT_LIST} from '../const';

const createSortingItem = (sorting = {}) => {
  const name = sorting.name || 'day';
  const label = sorting.name ? sorting.name : 'Day';
  const disabled = sorting.disabled ? 'disabled' : '';
  const checked = sorting.checked ? 'checked' : '';
  const sortType = sorting.sortType || 'day';

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input
        id="sort-${name}"
        class="trip-sort__input  visually-hidden"
        type="radio" name="trip-sort"
        value="sort-${name}"
        ${disabled}
        ${checked}
      >
      <label
        class="trip-sort__btn"
        for="sort-${name}"
        data-sort-type="${sortType}"
      >
        ${label}
      </label>
    </div>`
  );
};

const createSorting = (currentSortType) => {
  const setCheckedItem = (arr) => arr.map((item) => (
    item.sortType === currentSortType
      ? {...item, checked: true}
      : {...item, checked: false}
  ));

  const createSortingList = (data) => data.map((item) => createSortingItem(item)).join(' ');
  const sortingList = createSortingList(setCheckedItem(SORTING_DEFAULT_LIST));

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingList}
    </form>`
  );
};

export default class SortingView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSorting(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    const inputElement = evt.target.previousElementSibling;

    if (evt.target.tagName !== 'LABEL' || inputElement.disabled) {
      return;
    }

    evt.preventDefault();
    inputElement.checked = true;
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
