import React from 'react';
import { useParams } from 'react-router-dom';

import { Byline } from '../common';

import { useDoc } from './hooks';
import Comments from './Comments';
import styles from './Detail.module.css';

const DocInfo = ({ doc }) => {
    if (!doc) {
        return null;
    }
    const { title, downloadURL } = doc;
    return (
        <header>
            { downloadURL && (
                <a href={downloadURL} rel="noreferrer" target="_blank">
                    <img className={styles.preview} alt={title} src={downloadURL} />
                </a>
            )}
            <h2>{title}</h2>
            <Byline post={doc} />
        </header>
    );
}

export default function Detail (props) {
    const { id } = useParams();
    const doc = useDoc(id);

    return (
        <article className={styles.root}>
            <DocInfo doc={doc} />
            <Comments postId={id} />
        </article>
    );
}
