import React, { useEffect, useCallback } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { useClient } from '../api';
import { Byline } from '../common';

import styles from './List.module.css';

const Post = ({ post }) => {
    const { path: matchPath } = useRouteMatch();
    return (
        <div>
            <Link to={`${matchPath}/${post.id}`}>
                <div>{post.title}</div>
            </Link>
            <Byline post={post} />
        </div>
    )
}


function List ({ posts }) {
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

export default function ListContainer ({ type }) {
    const [docs, setDocs] = React.useState([]);
    const client = useClient();

    const getDocs = useCallback(async () => {
        const snapshot = await client.posts(type);
        setDocs([...snapshot.docs].map(d => ({ id: d.id, ...d.data() })));
    }, [client, type])

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
        <List posts={docs} />
    );
}