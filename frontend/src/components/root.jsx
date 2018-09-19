import React from 'react';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_utils'; 

import Greeting from './greeting/greeting';
import Modal from './modal/modal';

const Root = () => (
    <div className="app-root">
        <Modal />
        <header className="greeting-header">
            <Link to="/" className="header-link">
                NomWheels
            </Link>
            <Greeting />
        </header>
    </div>
)

export default Root;