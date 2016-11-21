import { combineReducers } from 'redux';

const createDispute = (state, action) => {
  switch (action.type) {
    case 'ADD_DISPUTE':
      return {
        id: action.id,
        disc: action.disc,
        sides: action.sides,
        timer: action.timer,
        referee: action.referee,
        complete: action.complete
      }
    default: return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DISPUTE':
      return {

      }
    default: return state;

  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DISPUTE':
      return [...state, action.id];
    default:
      return state;
  }
};

const dispute = combineReducers({
  byId,
  allIds
});

export default dispute;
