import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const authorName = author => author?.displayName || 'Unknown';

const Author = ({ author }) => !author ? null : <Link to={`/users/${author.uid}`} rel="author">{authorName(author)}</Link>

Author.propTypes = {
    author: PropTypes.shape({
        displayName: PropTypes.string,
        uid: PropTypes.string.isRequired,
    })
}

export default Author;
