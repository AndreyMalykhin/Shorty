import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import urlShortenerReducer from './url-shortener-reducer';

export default combineReducers({
    urlShortener: urlShortenerReducer,
    routing: routerReducer
});
