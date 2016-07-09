import {SHORTEN_URL_REQUEST, SHORTEN_URL_RESPONSE, SET_INPUT_URL} from
    '../utils/action-type'

export function setInputUrl(url) {
    return {type: SET_INPUT_URL, payload: {url}};
}

export function shortenUrl() {
    return (dispatch, getState, diContainer) => {
        const url = getState().urlShortener.get('inputUrl');

        if (!url) {
            return Promise.resolve();
        }

        dispatch({type: SHORTEN_URL_REQUEST});
        return diContainer.urlService.shorten(url)
        .then((response) => {
            dispatch({type: SHORTEN_URL_RESPONSE, payload: response});
        }, (error) => {
            console.log(error);
            dispatch({
                type: SHORTEN_URL_RESPONSE,
                payload: 'Oops, something went wrong',
                error: true
            });
        });
    };
}
