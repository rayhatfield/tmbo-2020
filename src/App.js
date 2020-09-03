import React from 'react';

import { UserContextProvider } from './auth';
import Main from './main';
import TypeControls from './tools/TypeControls';

export default function App () {
    return (
        <UserContextProvider>
            <Main />
            <TypeControls />
        </UserContextProvider>
    );
}
