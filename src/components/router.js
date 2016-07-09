import React from 'react';
import {Router as ReactRouter, Route} from 'react-router';
import App from './app';

const Router = React.createClass({
    propTypes: {
        history: React.PropTypes.any.isRequired
    },

    render() {
        return (
            <ReactRouter history={this.props.history}>
                <Route path='/' component={App}>
                </Route>
            </ReactRouter>
        );
    }
});

export default Router;
