import styles from '../styles/footer.scss';
import React from 'react';

const Footer = React.createClass({
    render() {
        return (
            <div className={`animated fadeInUp ${styles.wrapper}`}>
                (&copy;) 2016 Some dev
            </div>
        );
    }
});

export default Footer;
