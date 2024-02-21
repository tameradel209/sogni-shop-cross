import {combineReducers} from 'redux';
import authReducer from './authSlice';
import imediateReducer from './imediateSlice';
import chatReducer from './chatSlice';
import storesReducer from './storesSlice';
import channelsReducer from './channelsSlice'
import {authApi} from './authApi';
import hintReducer from './hintMessage';
import categoryReducer from './categorySlice';
const rootReducer = combineReducers({
  authReducer,
  imediateReducer,
  hintReducer,
  chatReducer,
  storesReducer,
  channelsReducer,
  categoryReducer,
});

export default rootReducer;
