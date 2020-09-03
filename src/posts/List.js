import React from 'react';
import PropTypes from 'prop-types';

import { Byline } from '../common';

import styles from './List.module.css';

const Post = ({ post }) => {
    const p = post.data();
    return (
        <div>
            <div>{p.title}</div>
            <Byline post={p} />
        </div>
    )
}


export default function List ({ posts }) {
    return !posts ? null : (
        <ul className={styles.root}>
            {posts.map(p => (
                <li key={p.id}>
                    <Post post={p} />
                </li>
            ))}
        </ul>
    );
}
