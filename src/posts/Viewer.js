import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Byline } from '../common';

import { useDoc } from './hooks';
import styles from './Viewer.module.css';

export default function Viewer () {
    const { id } = useParams();
    const doc = useDoc(id);
    if (!doc) {
        return <div>loading?</div>;
    }

    const { downloadURL, previewUrl, title } = doc;
    return (
        <article className={styles.root}>
            <header>
                <h1>{title}</h1>
                <Byline post={doc} />
                <nav>
                    <Link to={`${id}/comments`}>Comments</Link>
                </nav>
            </header>
            <picture>
                { previewUrl && (
                    <source srcset={`${previewUrl} 2048w`}></source>
                )}
                <img alt={title} src={downloadURL} />
            </picture>
        </article>
    )
}