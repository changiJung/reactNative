import { combineReducers } from 'redux';
import bookModule from './searchBook';
import userModule from './userInfo';
import shelvesModule from './searchBookShelves'

export default combineReducers({
    
    bookModule, userModule, shelvesModule
});