import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserContextProvider } from './auth';
import Main from './main';
import TypeControls from './tools/TypeControls';

export default function App () {
    return (
        <UserContextProvider>
            <Router>
                <Main />
            </Router>
            <TypeControls />
        </UserContextProvider>
    );
}
