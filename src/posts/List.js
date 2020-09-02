import React from 'react';
import PropTypes from 'prop-types';

const p = s => `${s}`.padStart(2, '0');

const dateFormat = date => {
    const d = new Date(date)
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${d.toLocaleTimeString()}`
}

const Post = ({ post }) => {
    const p = post.data();
    return (
        <div>
            <div>{p.title}</div>
            <div>{dateFormat(p.date)}</div>
        </div>
    )
}


export default function List ({ posts }) {
    return !posts ? null : (
        <ul>
            {posts.map(p => (
                <li key={p.id}>
                    <Post post={p} />
                </li>
            ))}
        </ul>
    );
}
