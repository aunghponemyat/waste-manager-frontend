import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import {
  sidebarReducer,
  themeReducer,
  reportReducer,
  authReducer,
  organizationReducer,
  userReducer,
  logisticsReducer,
  miscReducer,
  trainingReducer,
  binReducer,
  binOrderReducer,
  paymentReducer,
  quizReducer,
  userAnsQuizReducer,
  trainingSlideReducer,
} from '../../redux/reducers/index';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  reports: reportReducer,
  auth: authReducer,
  organizations: organizationReducer,
  users: userReducer,
  logistics: logisticsReducer,
  misc: miscReducer,
  trainings: trainingReducer,
  bins: binReducer,
  binOrders: binOrderReducer,
  payments: paymentReducer,
  quizzes: quizReducer,
  user_ans_quizzes: userAnsQuizReducer,
  training_slides: trainingSlideReducer,
});

const createAppStore = initialState => createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default createAppStore;
