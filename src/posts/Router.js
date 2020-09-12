import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import List from './List';
import Detail from './Detail';

const routes = [
    {
        path: '',
        exact: true,
        component: List
    },
    {
        path: '/:id',
        component: Detail
    }
]

export default function Router (props) {
    const { path: matchPath } = useRouteMatch();
    return (
        <Switch>
            {routes.map(({ path, component: Cmp, ...r }) => (
                <Route key={path} path={`${matchPath}${path}`} {...r}>
                    <Cmp {...props} />
                </Route>
            ))}
        </Switch>
    );
}
