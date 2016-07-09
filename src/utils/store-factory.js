import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import Immutable from 'immutable';
import reducer from '../reducers/app-reducer';

export default function storeFactory(diContainer) {
    const initialState = {
        urlShortener: Immutable.fromJS({
            isLoading: false,
            inputUrl: '',
            outputUrl: null,
            error: null
        })
    };
    let middlewares = [
        thunk.withExtraArgument(diContainer),
        routerMiddleware(diContainer.history)
    ];
    middlewares = compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );
    return createStore(reducer, initialState, middlewares);
}
