import React from 'react';
import PropTypes from 'prop-types';

import Author from './AuthorLink';
import DateTime from './DateTime';
import style from './Byline.module.css';

export default function Byline ({ post }) {
    const { author, timestamp } = post || {};
    return (
        <div className={style.root}>
            {author && (
                <address>
                    <Author author={post?.author} />
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
