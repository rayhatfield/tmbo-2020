import React from 'react';
import { useParams } from 'react-router-dom';

import Comments from './Comments';
import styles from './Detail.module.css';

export default function Detail (props) {
    const { id } = useParams();
    return (
        <div className={styles.root}>
            <div>post id: {id}</div>
            <Comments postId={id} />
        </div>
    );
}
