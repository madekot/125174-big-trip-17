import FilterView from './view/filters-view';
import TripPresenter from './presenter/trip-presenter';
import TripsModel from './model/trips-model';
import {render} from './render';

const filterElement = document.querySelector('.trip-controls__filters');
const contentElement = document.querySelector('.trip-events');

const tripsModel = new TripsModel();
const tripsPresenter = new TripPresenter();

render(new FilterView(), filterElement);
tripsPresenter.init(contentElement, tripsModel);
