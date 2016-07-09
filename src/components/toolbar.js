import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader';
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand';
import {Link} from 'react-router';

const Toolbar = React.createClass({
    render() {
        return (
            <Navbar inverse className='animated fadeInDown'>
                <NavbarHeader>
                    <NavbarBrand>
                        <Link to='/'>Shorty</Link>
                    </NavbarBrand>
                </NavbarHeader>
            </Navbar>
        );
    }
});

export default Toolbar;
