import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useClient } from '../api';

import styles from './CommentForm.module.css';

export default function CommentForm ({ postId }) {
    const client = useClient();

    const onSubmit = useCallback(e => {
        e.preventDefault();
        const comment = e.target.comment.value;
        client.comment(postId, comment);
    }, [client, postId])

    return (
        <form onSubmit={onSubmit} className={styles.root}>
            <textarea name="comment"></textarea>
            <button>Go</button>
        </form>
    );
}

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired
}
