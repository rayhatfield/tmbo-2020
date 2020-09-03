import React from 'react';

import Header from './Header';
import Router from './Router';
import Footer from './Footer';
import styles from './View.module.css';

export default function Layout (props) {
    return (
        <div className={styles.root}>
            <Header />
            <Router />
            <Footer />
        </div>
    );
}
