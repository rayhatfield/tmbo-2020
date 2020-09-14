import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import List from './List';
import Viewer from './Viewer';
import Detail from './Detail';

const routes = [
    {
        path: '',
        exact: true,
        component: List
    },
    {
        path: '/:id',
        component: Viewer,
        exact: true
    },
    {
        path: '/:id/comments',
        component: Detail
    },
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
