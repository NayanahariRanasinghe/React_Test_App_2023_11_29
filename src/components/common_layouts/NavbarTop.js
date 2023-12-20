import React from 'react'
import { withRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Alerts from './Alerts';

function NavbarTop() {
    return (
        <>
            <Alerts />
            <Navbar >
                <h3>navbar</h3>
            </Navbar>
        </>
    )
}

export default withRouter(NavbarTop);