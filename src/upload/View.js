import React, { useCallback, useState } from 'react';
import clsx from 'clsx';

import { useClient } from '../api';

import Preview from './Preview';
import styles from './View.module.css';

export default function View (props) {
    const client = useClient();
    const [file, setFile] = useState();
    const [fileInfo, setFileInfo] = useState({});

    const onFileChange = (e) => {
        const file = e.target.files?.[0];
        setFile(file);

        const { name, type, size } = file || {};
        setFileInfo({ name, type, size });
    }

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        client.upload(file);
    }, [client, file]);

    const onFileInfoChange = (({ target: { name, value } }) => setFileInfo({ ...fileInfo, [name]: value }))
    const prompt = !file ? 'Put ’er there' : 'Change';

    return (
        <form className={styles.root} onSubmit={onSubmit}>
            <div className={clsx(styles['file-input-container'], { [styles.empty]: !file })}>
                <Preview file={file} />
                <div className={styles.prompt}><span>{prompt}</span></div>
                <input type="file" name="upload" onChange={onFileChange} />
            </div>
            <div className={styles.controls}>
                <div className={styles.fileInfo}>
                    <input onChange={onFileInfoChange} name="name" value={fileInfo.name || ''} />
                </div>
                <button>Upload</button>
            </div>
        </form>
    );
}
