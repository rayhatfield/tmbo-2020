import React, { useEffect, useCallback } from 'react';

import { useClient } from '../api';
import { Byline } from '../common';

import styles from './Comments.module.css';
import CommentForm from './CommentForm';

const Comment = ({ post }) => {
    const p = post.data();
    return (
        <div className={styles.comment}>
            <Byline post={p} />
            <div className={styles.content}>{p.comment}</div>
        </div>
    )
}


function CommentList ({ posts }) {
    return !posts ? null : (
        <ul className={styles.root}>
            {posts.map(p => (
                <li key={p.id}>
                    <Comment post={p} />
                </li>
            ))}
        </ul>
    );
}

export default function CommentListContainer ({ postId }) {
    const [docs, setDocs] = React.useState([]);
    const client = useClient();

    const getDocs = useCallback(async () => {
        const snapshot = await client.comments(postId);
        setDocs([...snapshot.docs].reverse());
    }, [client, postId])

    useEffect(() => {
        getDocs();
    }, [client, getDocs]);

    return (
        <div>
            <CommentList posts={docs} />
            <CommentForm postId={postId} />
        </div>
    );
}
