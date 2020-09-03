import React from 'react';
import { useParams } from 'react-router-dom';

export default function Detail (props) {
    const { id } = useParams();
    return (
        <div>post id: {id}</div>
    );
}
