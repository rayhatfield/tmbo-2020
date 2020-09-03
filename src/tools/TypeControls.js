import React, { useCallback } from 'react';

import styles from './TypeControls.module.css';

export default function TypeControls (props) {
    const toggleGrid = useCallback(() => document.body.classList.toggle(styles['show-grid']), []);
    return (
        <div className={styles.root}>
            <button onClick={toggleGrid}>Toggle Grid</button>
        </div>
    );
}
