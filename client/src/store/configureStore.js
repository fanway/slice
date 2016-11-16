import { createStore } from 'redux'
import rootReducer from '../reducers/rootReducer.js'

export default function configureStore(initialState){
  const store = createStore(rootReducer, initialState);
  return store;
}
