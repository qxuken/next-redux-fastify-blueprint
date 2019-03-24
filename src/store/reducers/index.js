import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import { reducers as ducksReducers } from 'store/ducks';

export default combineReducers({
  ...ducksReducers,
  form: reducer,
});
