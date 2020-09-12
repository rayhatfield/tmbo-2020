import React from 'react';
import PropTypes from 'prop-types';

import Author from './AuthorLink';
import DateTime from './DateTime';
import style from './Byline.module.css';

export default function Byline ({ post }) {
    const { author, user, timestamp } = post || {};
    console.log(user);
    return (
        <div className={style.root}>
            {author && (
                <address>
                    <Author author={author} />
                </address>
            )}
            {user && (
                <address>
                    <Author user={user} />
                </address>
            )}
            {timestamp && (
                <DateTime date={post.timestamp.toMillis()} />
            )}
        </div>
    );
}

Byline.propTypes = {
    post: PropTypes.shape({
        author: PropTypes.shape({
            displayName: PropTypes.string,
            id: PropTypes.string.isRequired
        }),
        timestamp: PropTypes.shape({
            toMillis: PropTypes.func.isRequired,
        })
    })
}
