import React from 'react';
import { NavLink } from 'react-router-dom';

import { useRoutes } from './routes';
import LogOut from './LogOut';
import styles from './Header.module.css';

export default function Header (props) {
    const routes = useRoutes();
    return (
        <header className={styles.root}>
            <nav className={styles.nav}>
                <NavLink exact to="/"><h1>[tmbo]</h1></NavLink>
                { routes.filter(({ label }) => !!label).map(({ path, label }) => (
                    <NavLink activeClassName={styles.active} key={path} to={path}>{label}</NavLink>
                ))}
            </nav>
            <LogOut />
            {/* { user ? (user.displayName || user.email) : 'no user' } */}
        </header>
    );
}

