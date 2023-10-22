// action - state management
import * as actionTypes from './actions';

export const initialState = {
  collections: [], // for active default menu
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const collectionsReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.SET_COLLECTIONS:
      return {
        ...state,
        collections: action.collections
      };
    default:
      return state;
  }
};

export default collectionsReducer;
