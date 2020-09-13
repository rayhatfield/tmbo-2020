import React from 'react';
import PropTypes from 'prop-types';

import Author from './AuthorLink';
import DateTime from './DateTime';
import style from './Byline.module.css';

export default function Byline ({ post }) {
    const { uid, displayName, timestamp } = post || {};

    return (
        <div className={style.root}>
            {uid && (
                <address>
                    <Author author={{ uid, displayName }}/>
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
        displayName: PropTypes.string,
        uid: PropTypes.string.isRequired,
        timestamp: PropTypes.shape({
            toMillis: PropTypes.func.isRequired,
        })
    })
}
