import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import backlog from './slice/backlog'; 
import filter from './slice/filter';
import global from './slice/globalState';
import inventory from './slice/inventory';
import notes from './slice/notes';


const reducer = combineReducers({
  'backlog': backlog,
  'filter':filter, 
  'global':global,
  'notes':notes,
  'inventory':inventory
})
const store = configureStore({
  reducer,
})
export default store;