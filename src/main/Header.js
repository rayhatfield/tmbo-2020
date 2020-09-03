import React from 'react';

import { useClient } from '../api';
import { useUser } from '../auth';

import styles from './Header.module.css';

export default function Header (props) {
    const client = useClient();
    const user = useUser();
    return (
        <div className={styles.root}>
            <h1>[tmbo]</h1>
            { user ? (user.displayName || user.email) : 'no user' }
            { user && <button onClick={() => client.logOut()}>Log Out</button> }
        </div>
    );
}
