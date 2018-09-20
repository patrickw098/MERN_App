import React from 'react';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_utils'; 

import Greeting from './greeting/greeting';
import Modal from './modal/modal';
import Footer from './greeting/footer';
import Body from './body';

const Root = () => (
    <div className="app-root">
        <Modal />
        <header className="greeting-header">
            <Link to="/" className="header-link">
                NomWheels
            </Link>
            <Greeting />
        </header>
        <Body />
        <Footer />
    </div>
)

export default Root;