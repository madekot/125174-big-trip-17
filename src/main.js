import FilterView from './view/filters-view';
import TripPresenter from './presenter/trip-presenter';
import {render} from './render';

const filterElement = document.querySelector('.trip-controls__filters');
const contentElement = document.querySelector('.trip-events');

const tripsPresenter = new TripPresenter();

render(new FilterView(), filterElement);
tripsPresenter.init(contentElement);
