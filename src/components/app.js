import styles from '../styles/app.scss';
import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Toolbar from './toolbar';
import UrlShortener from './url-shortener';
import Footer from './footer';

const App = React.createClass({
    render() {
        return (
            <div className={styles.wrapper}>
                <Toolbar/>
                <Grid className={styles.body}>
                    <UrlShortener/>
                </Grid>
                <Footer/>
            </div>
        );
    }
});

export default App;
