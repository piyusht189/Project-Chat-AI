import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import collectionsReducer from './collectionsReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  collections: collectionsReducer
});

export default reducer;
