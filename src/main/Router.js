import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useUser } from '../auth';

import { anonymous, authenticated } from './routes';

export default function Routr () {
    const user = useUser();
    const checkingLogin = user === undefined; // if user is null we're not logged in. if it's undefined we don't know yet.
    const routes = user ? authenticated : anonymous;
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
