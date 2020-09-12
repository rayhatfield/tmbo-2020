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

    // const post = async (e, title = "wookies and hats") => {
    //     const p = await client.post(title);
    //     getDocs();
    // }

    // const comment = async content => {
    //     const doc = docs[0];
    //     const c = await client.comment(doc.id, 'this is crazy.');
    // }

    return (
        <div>
            <CommentList posts={docs} />
            <CommentForm postId={postId} />
        </div>
    );
}
