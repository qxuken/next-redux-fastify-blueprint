import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import { reducers as ducksReducers } from 'redux-folder/ducks';

export default combineReducers({
  ...ducksReducers,
  form: reducer,
});
