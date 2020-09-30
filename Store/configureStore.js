import {combineReducers, createStore} from 'redux';
import toggleFavorite from './Reducers/favoriteReducer';
import setCurrentUser from './Reducers/userReducer';

export default createStore(combineReducers({toggleFavorite, setCurrentUser}));
