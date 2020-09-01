import React from 'react';

import { useClient } from './api';

import './App.css';

export default function App () {

    const [docs, setDocs] = React.useState([]);
    const client = useClient();

    const post = async (title = "wookies and hats") => {
        const p = await client.post(title);
        getDocs();
    }

    const comment = async content => {
        const doc = docs[0];
        const c = await client.comment(doc.id, 'this is crazy.');
        console.log(c);
    }

    // const test = async () => {
    //     const doc = await db.collection('test').add({ bananas: 1, wookies: 3, hats: true });
    //     console.log(doc.id);
    // }

    const getDocs = async () => {
        const snapshot = await client.posts();
        setDocs([...snapshot.docs]);
    }

    return (
        <div id="tmbo-root">
            <button onClick={post}>Post</button>
            <button onClick={comment}>Comment</button>
            { docs.map(doc => (
                <div key={doc.id}>{JSON.stringify(doc.data())}</div>
            ))}
        </div>
    );
}
