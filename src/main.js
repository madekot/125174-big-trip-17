import {render} from './framework/render';
import NewTripButtonView from './view/new-trip-button-view';

import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';

import TripsModel from './model/trips-model';
import FilterModel from './model/filter-model';

import TripsApiService from './trips-api-service';


const AUTHORIZATION = 'Basic hS2sfS12ccl1sa2j';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';
const newTripButtonComponent = new NewTripButtonView();

const filterElement = document.querySelector('.trip-controls__filters');
const contentElement = document.querySelector('.trip-events');
const newTripButtonContainer = document.querySelector('.trip-main');

const tripsModel = new TripsModel(new TripsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripsPresenter = new TripPresenter(contentElement, tripsModel, filterModel);
const filterPresenter = new FilterPresenter(filterElement, filterModel, tripsModel);

const handleNewTaskFormClose = () => {
  newTripButtonComponent.element.disabled = false;
};

const handleNewTaskButtonClick = () => {
  tripsPresenter.createTrip(handleNewTaskFormClose);
  newTripButtonComponent.element.disabled = true;
};

render(newTripButtonComponent, newTripButtonContainer);
newTripButtonComponent.setClickHandler(handleNewTaskButtonClick);

filterPresenter.init();
tripsPresenter.init();
tripsModel.init();
