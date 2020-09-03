import React from 'react';

import { useClient } from '../api';

import styles from './LoginView.module.css';

export default function LoginView (props) {
    const client = useClient();
    const logIn = React.useCallback(async e => {
        e.preventDefault();
        e.stopPropagation();
        const { email: { value: email }, password: { value: password } } = e.target.elements;
        await client.logIn(email, password);

    }, [client]);
    return (
        <form className={styles.root} onSubmit={logIn}>
            <input name="email" type="email" />
            <input name="password" type="password" />
            <button>Log In</button>
        </form>
    );
}
