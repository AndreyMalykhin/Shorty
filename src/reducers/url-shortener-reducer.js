import {SET_INPUT_URL, SHORTEN_URL_REQUEST, SHORTEN_URL_RESPONSE} from
    '../utils/action-type';

export default function reducer(state = null, action) {
    switch (action.type) {
    case SET_INPUT_URL:
        return state.set('inputUrl', action.payload.url);
    case SHORTEN_URL_REQUEST:
        return state.set('isLoading', true);
    case SHORTEN_URL_RESPONSE:
        if (action.error) {
            return state.merge(
                {isLoading: false, error: action.payload, outputUrl: null});
        }

        return state.merge({
            error: null,
            isLoading: false,
            outputUrl: action.payload.shorten_url
        });
    }

    return state;
}
