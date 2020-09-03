import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useUser } from '../auth';

import { useRoutes } from './routes';

export default function Routr () {
    const user = useUser();
    const checkingLogin = user === undefined; // if user is null we're not logged in. if it's undefined we don't know yet.
    const routes = useRoutes();

    return checkingLogin ? null : (
        <Switch>
            { routes.map(({ path, component: Cmp, ...other }) => (
                <Route path={path} key={path}>
                    <Cmp />
                </Route>
            ))}
            <Route path="*">
                <Redirect to={routes[0].path} />
            </Route>
        </Switch>
    );
}
