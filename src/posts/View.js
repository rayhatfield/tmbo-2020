import React, { useCallback, useEffect } from 'react';

import { useClient } from '../api';
import TypeTest from '../tools/TypeTest';

import List from './List';

export default function View () {
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
    }


    return (
        <div>
            <List posts={docs} />
            <TypeTest />
            <button onClick={post}>Post</button>
            <button onClick={comment}>Comment</button>
        </div>
    );
}
