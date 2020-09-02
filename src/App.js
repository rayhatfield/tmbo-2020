import React from 'react';

import { UserContextProvider } from './auth';
import Router from './Router';
import Header from './Header';
import styles from './App.module.css';

export default function App () {
    return (
        <div id="tmbo-root" className={styles.root}>
            <UserContextProvider>
                <Header />
                <Router />
            </UserContextProvider>
        </div>
    );
}
