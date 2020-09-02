import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LoginView, useUser } from './auth';
import { View as Posts } from './posts';

const anonymousRoutes = [
    {
        path: "/",
        component: LoginView
    }
]

const authenticatedRoutes = [
    {
        path: "/",
        component: Posts
    }
]

export default function Routr (props) {
    const user = useUser();
    const checkingLogin = user === undefined; // if user is null we're not logged in. if it's undefined we don't know yet.
    const routes = user ? authenticatedRoutes : anonymousRoutes;
    return checkingLogin ? null : (
        <Router>
            <Switch>
                { routes.map(({ path, component: Cmp, ...other }) => (
                    <Route key={path} {...other}>
                        <Cmp />
                    </Route>
                ))}
            </Switch>
        </Router>
    );
}
