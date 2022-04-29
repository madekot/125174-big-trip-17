import {createElement} from '../render';
import {textTransformCapitalize} from '../utils';

const sortingsData = [
  {name: 'day'},
  {name: 'event', disabled: true},
  {name: 'time'},
  {name: 'price', disabled: true, checked: true},
  {name: 'offer', disabled: true},
];

const createSortingItem = (sorting = {}) => {
  const name = sorting.name || 'day';
  const label = sorting.name ? textTransformCapitalize(sorting.name) : 'Day';
  const disabled = sorting.disabled ? 'disabled' : '';
  const checked = sorting.checked ? 'checked' : '';

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${disabled} ${checked}>
      <label class="trip-sort__btn" for="sort-${name}">${label}</label>
    </div>`
  );
};

const createSortings = (data) => data.map((item) => createSortingItem(item)).join(' ');
const sortings = createSortings(sortingsData);

const createSorting = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

    ${sortings}

  </form>`
);

export default class SortingView {
  getTemplate() {
    return createSorting();
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
