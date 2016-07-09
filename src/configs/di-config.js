/* global process */

import {hashHistory} from 'react-router';
import storeFactory from '../utils/store-factory';
import UrlService from '../models/url-service';

export function setupDI(di) {
    di.constant('history', hashHistory);
    di.constant('apiUrl', process.env.SHORTY_API_URL);
    di.factory('store', storeFactory);
    di.service('urlService', UrlService, 'apiUrl');
}
