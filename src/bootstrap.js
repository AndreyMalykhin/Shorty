import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import Bottle from 'bottlejs';
import {setupDI} from './configs/di-config';
import Router from './components/router';

const di = new Bottle();
setupDI(di);
const diContainer = di.container;
const store = diContainer.store;
const history = syncHistoryWithStore(diContainer.history, store);

render(
    <Provider store={store}><Router history={history}/></Provider>,
    document.getElementById("app")
);
