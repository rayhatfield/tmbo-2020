import React from 'react';

const p = s => `${s}`.padStart(2, '0');

const dateFormat = date => {
    const d = new Date(date)
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${d.toLocaleTimeString()}`
}

export default ({ date }) => (
    !date ? null : (
        <span>{dateFormat(date)}</span>
    )
);
