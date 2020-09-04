import React, { useEffect, useState } from 'react';

import styles from './Preview.module.css';

export default function Preview ({ file }) {
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', e => setPreview(e.target.result));
            reader.readAsDataURL(file);
        }
        else {
            setPreview();
        }
    }, [file])

    return (
        <div className={styles.root}>
            {preview && <img alt="preview" className={styles.preview} src={preview} />}
        </div>
    );
}
