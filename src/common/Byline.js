import React from 'react';
import PropTypes from 'prop-types';

import Author from './AuthorLink';
import DateTime from './DateTime';
import style from './Byline.module.css';

export default function Byline ({ post }) {
    const { author, date } = post || {};
    return (
        <div className={style.root}>
            {author && (
                <address>
                    <Author author={post?.author} />
                </address>
            )}
            {date && (
                <DateTime date={post?.date} />
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
        date: PropTypes.number
    })
}
