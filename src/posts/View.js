import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useClient } from '../api';

import List from './List';

export default function View (props) {
    const [docs, setDocs] = React.useState([]);
    const client = useClient();

    const getDocs = useCallback(async () => {
        const snapshot = await client.posts();
        setDocs([...snapshot.docs]);
    }, [client])

    useEffect(() => {
        getDocs();
    }, [client, getDocs]);

    const post = async (e, title = "wookies and hats") => {
        const p = await client.post(title);
        getDocs();
    }

    const comment = async content => {
        const doc = docs[0];
        const c = await client.comment(doc.id, 'this is crazy.');
        console.log(c);
    }


    return (
        <div>
            <List posts={docs} />
            <button onClick={post}>Post</button>
            <button onClick={comment}>Comment</button>
        </div>
    );
}