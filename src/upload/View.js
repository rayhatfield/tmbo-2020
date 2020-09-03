import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useClient } from '../api';

export default function View (props) {
    const client = useClient();
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const file = e.target.elements.upload.files[0];
        client.upload(file);
    }, [client]);

    return (
        <form onSubmit={onSubmit}>
            <input type="file" name="upload" />
            <button>Upload</button>
        </form>
    );
}